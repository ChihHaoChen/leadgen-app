import { getDojoBySubdomain } from '@/lib/db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LeadForm from './lead-form';

interface PageProps {
  params: { subdomain: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dojo = await getDojoBySubdomain(params.subdomain);
  if (!dojo) return {};
  return {
    title: `${dojo.name} — Try a Free Class`,
    description: `Sign up for a free trial class at ${dojo.name}. All experience levels welcome.`,
  };
}

export default async function DojoLandingPage({ params }: PageProps) {
  const dojo = await getDojoBySubdomain(params.subdomain);

  if (!dojo) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className="block text-white">{dojo.name}</span>
            <span className="mt-2 block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Try a Free Class
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            Ready to start your martial arts journey? Sign up for a free trial
            class. No experience needed — all levels welcome.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-block rounded-lg bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 hover:shadow-red-500/30"
          >
            Claim Your Free Class
          </a>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="bg-slate-900 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Why Train With Us?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: 'Expert Instructors',
                desc: 'Learn from experienced coaches who are passionate about your growth.',
              },
              {
                title: 'All Levels Welcome',
                desc: 'Whether you are a complete beginner or a seasoned competitor.',
              },
              {
                title: 'Supportive Community',
                desc: 'Join a team that pushes you to be your best on and off the mats.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section id="signup" className="px-4 py-16">
        <div className="mx-auto max-w-lg">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Sign Up Now
          </h2>
          <p className="mt-4 text-center text-slate-400">
            Fill out the form below and we will get you on the mats.
          </p>
          <LeadForm subdomain={dojo.subdomain} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-8 text-center text-sm text-slate-500">
        {dojo.address && <p>{dojo.address}</p>}
        {dojo.phone && <p className="mt-1">{dojo.phone}</p>}
        <p className="mt-4">
          &copy; {new Date().getFullYear()} {dojo.name}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
