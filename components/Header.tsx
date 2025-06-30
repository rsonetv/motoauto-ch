'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { Menu, X, User, LogOut, Plus } from 'lucide-react'

const navigation = [
  { name: 'Motocykle', href: '/listings/motocykle' },
  { name: 'Samochody', href: '/listings/samochody' },
  { name: 'Aukcje', href: '/auctions' },
  { name: 'Dealerzy', href: '/dealers' },
  { name: 'Jak to działa', href: '/how-it-works' },
  { name: 'Kontakt', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                MotoAuto
                <span className="text-cta-red">.ch</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-accent-teal font-medium transition-colors text-base"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Panel
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Wyloguj
                </Button>
                <Button asChild className="bg-cta-red text-white hover:bg-cta-red/90">
                  <Link href="/new-listing">
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj ogłoszenie
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    Zaloguj się
                  </Link>
                </Button>
                <Button asChild className="bg-cta-red text-white hover:bg-cta-red/90">
                  <Link href="/register">
                    Dodaj ogłoszenie
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-accent-teal font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-100 space-y-2">
              {user ? (
                <>
                  <Button asChild variant="outline" className="w-full touch-target">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Panel
                    </Link>
                  </Button>
                  <Button asChild className="w-full touch-target bg-cta-red text-white hover:bg-cta-red/90">
                    <Link href="/new-listing" onClick={() => setMobileMenuOpen(false)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Dodaj ogłoszenie
                    </Link>
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full touch-target"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Wyloguj
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full touch-target">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Zaloguj się
                    </Link>
                  </Button>
                  <Button asChild className="w-full touch-target bg-cta-red text-white hover:bg-cta-red/90">
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Dodaj ogłoszenie
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}