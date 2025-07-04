'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

// ✅ FIX 1-2: Dodano interface dla props i TypeScript types
interface FooterProps {
  className?: string;
}

interface NewsletterState {
  email: string;
  isLoading: boolean;
  message: string;
  isError: boolean;
}

// ✅ FIX 15: Configuration object zamiast hardcoded values
const FOOTER_CONFIG = {
  companyName: 'MotoAuto.ch',
  phone: '+41 XX XXX XX XX',
  email: 'kontakt@motoauto.ch',
  address: {
    company: 'MotoAuto.ch Sp. z o.o.',
    street: '[Adres firmy]',
    city: '[Kod pocztowy] [Miasto]',
    country: 'Szwajcaria'
  },
  social: {
    facebook: 'https://facebook.com/motoauto.ch',
    instagram: 'https://instagram.com/motoauto.ch',
    youtube: 'https://youtube.com/@motoauto.ch',
    twitter: 'https://twitter.com/motoauto_ch'
  },
  legal: {
    che: 'CHE-XXX.XXX.XXX',
    vat: 'CHE-XXX.XXX.XXX MWST'
  }
} as const;

export function Footer({ className = '' }: FooterProps) {
  // ✅ FIX 10: Proper React hooks usage
  const [newsletter, setNewsletter] = useState<NewsletterState>({
    email: '',
    isLoading: false,
    message: '',
    isError: false
  });

  const currentYear = new Date().getFullYear();

  // ✅ FIX 3,8,9: SSR-safe scroll with error handling
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.warn('Scroll to top failed:', error);
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // ✅ FIX 6,7,14,17: Newsletter submission with proper validation and error handling
  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletter.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.email)) {
      setNewsletter(prev => ({
        ...prev,
        message: 'Podaj prawidłowy adres e-mail',
        isError: true
      }));
      return;
    }

    setNewsletter(prev => ({ ...prev, isLoading: true, message: '', isError: false }));

    try {
      // ✅ FIX 17: Backend integration (mock for now)
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter.email })
      });

      if (response.ok) {
        setNewsletter({
          email: '',
          isLoading: false,
          message: 'Dziękujemy za zapisanie się do newslettera!',
          isError: false
        });
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setNewsletter(prev => ({
        ...prev,
        isLoading: false,
        message: 'Wystąpił błąd. Spróbuj ponownie później.',
        isError: true
      }));
    }
  }, [newsletter.email]);

  // ✅ FIX 8: Proper Schema.org JSON structure
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AutomotiveDealer",
    "name": FOOTER_CONFIG.companyName,
    "description": "Najbardziej zaufana platforma sprzedaży motocykli i samochodów w Szwajcarii",
    "url": "https://motoauto.ch",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CH",
      "addressLocality": FOOTER_CONFIG.address.city
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": FOOTER_CONFIG.phone,
      "contactType": "customer service",
      "email": FOOTER_CONFIG.email
    },
    "sameAs": Object.values(FOOTER_CONFIG.social)
  };

  return (
    <>
      {/* ✅ FIX 8: Safe JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <footer className={`bg-gray-900 text-white ${className}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo and description */}
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold mb-4">{FOOTER_CONFIG.companyName}</div>
              <p className="text-gray-300 mb-4">
                Najbardziej zaufana platforma sprzedaży motocykli i samochodów w Szwajcarii. 
                Bezpieczne transakcje, szeroki wybór pojazdów i profesjonalna obsługa.
              </p>
              
              {/* Contact info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{FOOTER_CONFIG.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{FOOTER_CONFIG.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{FOOTER_CONFIG.address.company}</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Szybkie linki</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={{ pathname: "/search" }} className="text-gray-300 hover:text-white transition-colors">
                    Wyszukiwanie
                  </Link>
                </li>
                <li>
                 <Link href={{ pathname:"/auctions"}} className="text-gray-300 hover:text-white transition-colors">
                    Aukcje
                  </Link>
                </li>
                <li>
                 <Link href={{ pathname:"/new-listing"}} className="text-gray-300 hover:text-white transition-colors">
                    Dodaj ogłoszenie
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname:"/help"}} className="text-gray-300 hover:text-white transition-colors">
                    Pomoc
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={newsletter.email}
                  onChange={(e) => setNewsletter(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Twój adres e-mail"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={newsletter.isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {newsletter.isLoading ? 'Wysyłanie...' : 'Zapisz się'}
                </button>
                {newsletter.message && (
                  <p className={`text-sm ${newsletter.isError ? 'text-red-400' : 'text-green-400'}`}>
                    {newsletter.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          <hr className="border-gray-700 my-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © {currentYear} {FOOTER_CONFIG.companyName}. Wszystkie prawa zastrzeżone.
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              <a href={FOOTER_CONFIG.social.facebook} className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={FOOTER_CONFIG.social.instagram} className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={FOOTER_CONFIG.social.youtube} className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={FOOTER_CONFIG.social.twitter} className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal info */}
          <div className="mt-8 pt-4 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
              <div className="flex space-x-6 mb-2 md:mb-0">
                <Link href={{ pathname:"/terms" }} className="hover:text-white transition-colors">
                  Regulamin
                </Link>
                <Link href={{ pathname:"/privacy" }} className="hover:text-white transition-colors">
                  Polityka prywatności
                </Link>
                <Link href={{ pathname:"/cookies" }} className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
              <div className="space-x-4">
                <span>NIP: {FOOTER_CONFIG.legal.che}</span>
                <span>VAT: {FOOTER_CONFIG.legal.vat}</span>
              </div>
            </div>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Przewiń do góry"
          >
            ↑
          </button>
        </div>
      </footer>
    </>
  );
}
