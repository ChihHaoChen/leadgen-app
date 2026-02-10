import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You!',
  description: 'Your free trial class request has been submitted.',
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <svg
            className="h-10 w-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          You&apos;re In!
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Your free trial class request has been submitted. We&apos;ll be in
          touch soon to get you on the mats!
        </p>
        <p className="mt-2 text-slate-500">
          Check your email and phone for confirmation details.
        </p>
      </div>
    </main>
  );
}
