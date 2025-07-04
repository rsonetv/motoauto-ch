'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Plus, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'

export function Header() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between h-16 px-4">
        {/* logo */}
        <Link href="/" className="text-xl font-bold">
          MotoAuto.ch
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex gap-6">
          <Link href={{ pathname: '/search' }}>Wyszukaj</Link>
          <Link href={{ pathname: '/auctions' }}>Aukcje</Link>
          {user && <Link href={{ pathname: '/dashboard' }}>Panel</Link>}
        </nav>

        {/* actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button asChild variant="outline">
                <Link href={{ pathname: '/new-listing' }}>
                  <Plus className="w-4 h-4 mr-1" />
                  Dodaj
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href={{ pathname: '/login' }}>Zaloguj</Link>
            </Button>
          )}
        </div>

        {/* burger menu */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile nav */}
      {open && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          <Link href={{ pathname: '/' }} onClick={() => setOpen(false)}>
            Strona główna
          </Link>
          <Link href={{ pathname: '/search' }} onClick={() => setOpen(false)}>
            Wyszukaj
          </Link>
          <Link href={{ pathname: '/auctions' }} onClick={() => setOpen(false)}>
            Aukcje
          </Link>
          {user ? (
            <>
              <Link href={{ pathname: '/dashboard' }} onClick={() => setOpen(false)}>
                Panel
              </Link>
              <button onClick={handleLogout} className="w-full text-left">
                Wyloguj
              </button>
            </>
          ) : (
            <Link href={{ pathname: '/login' }} onClick={() => setOpen(false)}>
              Zaloguj
            </Link>
          )}
        </nav>
      )}
    </header>
)
}
