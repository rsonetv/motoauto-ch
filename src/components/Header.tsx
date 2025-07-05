// components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    setIsOpen(false);
  };

  const navLinks = [
    { href: '/search', label: 'Wyszukaj' },
    { href: '/auctions', label: 'Aukcje' },
    { href: '/dashboard', label: 'Panel', auth: true },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <Link href={{ pathname: '/' }} className="text-xl font-bold text-gray-900">
          MotoAuto.ch
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.filter(link => !link.auth || user).map(link => (
            <Link key={link.href} href={{ pathname: link.href }} className="text-sm font-medium text-gray-600 hover:text-gray-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Button asChild>
                  <Link href={{ pathname: '/new-listing' }}>
                    <Plus className="w-4 h-4 mr-2" /> Dodaj ogłoszenie
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href={{ pathname: '/login' }}>Zaloguj</Link>
              </Button>
            )}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden px-4 pt-2 pb-4 border-t">
          <ul className="space-y-1">
            {navLinks.filter(link => !link.auth || user).map(link => (
              <li key={link.href}>
                <Link href={{ pathname: link.href }} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
                 <li>
                    <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                        Wyloguj
                    </button>
                 </li>
            ) : (
                 <li>
                     <Link href={{ pathname: '/login' }} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                        Zaloguj
                     </Link>
                 </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
