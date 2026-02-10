import { NextRequest, NextResponse } from 'next/server';
import { getDojoBySubdomain, insertLead } from '@/lib/db';
import type { FormSubmission } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmission = await request.json();

    if (!body.subdomain || !body.name || !body.email || !body.phone || !body.experience_level) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const validLevels = ['beginner', 'intermediate', 'advanced'];
    if (!validLevels.includes(body.experience_level)) {
      return NextResponse.json(
        { error: 'Invalid experience level' },
        { status: 400 }
      );
    }

    const dojo = await getDojoBySubdomain(body.subdomain);
    if (!dojo) {
      return NextResponse.json(
        { error: 'Dojo not found' },
        { status: 404 }
      );
    }

    const lead = await insertLead(dojo.id, body);
    if (!lead) {
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // Fire n8n webhook (optional, non-blocking)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: lead.id,
          dojo_name: dojo.name,
          dojo_subdomain: dojo.subdomain,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          experience_level: lead.experience_level,
        }),
      }).catch((err) => {
        console.error('n8n webhook failed:', err);
      });
    }

    return NextResponse.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('Error in submit-lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
