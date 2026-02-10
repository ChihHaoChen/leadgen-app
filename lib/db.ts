import { Pool } from 'pg';
import type { Dojo, Lead, FormSubmission } from '@/lib/types';

const isDatabaseConfigured = !!process.env.DATABASE_URL;

const pool = isDatabaseConfigured
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export async function getDojoBySubdomain(subdomain: string): Promise<Dojo | null> {
  if (!pool) {
    console.log(`[console-mode] getDojoBySubdomain called with: ${subdomain}`);
    return {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Demo Dojo',
      subdomain,
      address: '123 Demo Street',
      phone: '+852 1234 5678',
      email_from: 'demo@dojo.com',
      twilio_account_sid: null,
      twilio_auth_token: null,
      twilio_phone_number: null,
      created_at: new Date(),
    };
  }

  try {
    const result = await pool.query<Dojo>(
      'SELECT * FROM dojos WHERE subdomain = $1',
      [subdomain]
    );
    return result.rows[0] ?? null;
  } catch (error) {
    console.error('Error fetching dojo:', error);
    return null;
  }
}

export async function insertLead(
  dojoId: string,
  submission: FormSubmission
): Promise<Lead | null> {
  if (!pool) {
    const mockLead: Lead = {
      id: crypto.randomUUID(),
      dojo_id: dojoId,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      experience_level: submission.experience_level,
      status: 'new',
      notes: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    console.log('[console-mode] Lead inserted:', JSON.stringify(mockLead, null, 2));
    return mockLead;
  }

  try {
    const result = await pool.query<Lead>(
      `INSERT INTO leads (dojo_id, name, email, phone, experience_level, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'new', NOW(), NOW())
       RETURNING *`,
      [dojoId, submission.name, submission.email, submission.phone, submission.experience_level]
    );
    return result.rows[0] ?? null;
  } catch (error) {
    console.error('Error inserting lead:', error);
    return null;
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!pool) {
    return false;
  }
  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
