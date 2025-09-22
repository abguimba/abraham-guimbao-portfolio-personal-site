import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abraham Guimbao',
  description: "Abraham Guimbao's Personal Site",
  keywords: [
    'SRE',
    'Site Reliability Engineer',
    'Infrastructure',
    'DevOps',
    'Cloud',
    'Platform Engineer',
  ],
  authors: [{ name: 'Abraham Guimbao' }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>',
  },
  openGraph: {
    title: 'Abraham Guimbao',
    description: "Abraham Guimbao's Personal Site",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abraham Guimbao',
    description: "Abraham Guimbao's Personal Site",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <script
          /* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  
                  const html = document.documentElement;
                  if (shouldBeDark) {
                    html.classList.add('dark');
                    html.style.colorScheme = 'dark';
                  } else {
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
