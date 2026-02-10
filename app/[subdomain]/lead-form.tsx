'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LeadFormProps {
  subdomain: string;
}

export default function LeadForm({ subdomain }: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          experience_level: formData.get('experience_level'),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/thank-you');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder-slate-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Doe"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="+852 9123 4567"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="experience_level" className="block text-sm font-medium text-slate-300">
          Experience Level
        </label>
        <select
          id="experience_level"
          name="experience_level"
          required
          className={inputClass}
        >
          <option value="">Select your level</option>
          <option value="beginner">Beginner — No experience</option>
          <option value="intermediate">Intermediate — Some training</option>
          <option value="advanced">Advanced — Experienced practitioner</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Get My Free Class'}
      </button>
    </form>
  );
}
