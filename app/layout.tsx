import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Try a Free Class',
  description: 'Sign up for a free trial class at your local martial arts dojo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
