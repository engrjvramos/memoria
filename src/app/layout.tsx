import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter, Pacifico, Roboto_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const pacifico = Pacifico({
  variable: '--font-pacifico',
  subsets: ['latin'],
  weight: ['400'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Memoria - Minimalist Note-Taking App for Productivity',
  description:
    'Memoria is a fast, minimal, and intuitive note-taking app built with Next.js and Tailwind CSS. Capture ideas, organize tasks, and boost your productivity with a beautiful, distraction-free interface.',
  keywords: [
    'Memoria',
    'note-taking app',
    'notes organizer',
    'productivity tools',
    'task management',
    'Next.js app',
    'Tailwind CSS',
    'minimal notes',
    'writing app',
    'digital notebook',
  ],
  authors: [{ name: 'Jobie Ramos', url: 'https://jobie.dev' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Memoria - Minimalist Note-Taking App for Productivity',
    description:
      'Memoria helps you capture ideas, organize notes, and stay productive with a clean, distraction-free interface.',
    url: 'https://memoria-x.vercel.app',
    siteName: 'Memoria',
    images: [
      {
        url: 'https://memoria-x.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Memoria - Minimalist Note-Taking App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${pacifico.variable} ${robotoMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
