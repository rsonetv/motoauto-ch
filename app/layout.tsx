import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/auth'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MotoAuto.ch - Motocykle i Samochody w Szwajcarii',
  description: 'Platforma sprzedaży motocykli i samochodów w Szwajcarii. Znajdź swój wymarzony pojazd lub sprzedaj swój.',
  keywords: 'motocykle, samochody, Szwajcaria, sprzedaż, aukcje, BMW, Honda, Yamaha',
  authors: [{ name: 'MotoAuto.ch' }],
  openGraph: {
    title: 'MotoAuto.ch - Motocykle i Samochody w Szwajcarii',
    description: 'Platforma sprzedaży motocykli i samochodów w Szwajcarii',
    url: 'https://motoauto.ch',
    siteName: 'MotoAuto.ch',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MotoAuto.ch',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotoAuto.ch - Motocykle i Samochody w Szwajcarii',
    description: 'Platforma sprzedaży motocykli i samochodów w Szwajcarii',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#21808D" />
        <meta name="msapplication-TileColor" content="#21808D" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .loading-skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
        
        {/* Analytics scripts */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
            
            {/* Cookie Consent */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    if (!localStorage.getItem('cookieConsent')) {
                      const banner = document.createElement('div');
                      banner.innerHTML = \`
                        <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #e5e7eb; padding: 1rem; z-index: 9999; box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);">
                          <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: between; gap: 1rem;">
                            <p style="flex: 1; margin: 0; font-size: 14px; color: #374151;">
                              Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenia. 
                              <a href="/privacy" style="color: #21808D; text-decoration: underline;">Dowiedz się więcej</a>
                            </p>
                            <button onclick="acceptCookies()" style="background: #21808D; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 14px;">
                              Akceptuj
                            </button>
                          </div>
                        </div>
                      \`;
                      document.body.appendChild(banner);
                      
                      window.acceptCookies = function() {
                        localStorage.setItem('cookieConsent', 'true');
                        banner.remove();
                      };
                    }
                  })();
                `,
              }}
            />
          </>
        )}
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}