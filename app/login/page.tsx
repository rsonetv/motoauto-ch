'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await signIn(formData.email, formData.password)
      if (error) {
        let msg = 'Wystąpił błąd podczas logowania'
        if (error.message.includes('Invalid login credentials')) {
          msg = 'Nieprawidłowy email lub hasło'
        } else if (error.message.includes('Email not confirmed')) {
          msg = 'Potwierdź swój email przed logowaniem'
        }
        toast({ title: 'Błąd logowania', description: msg, variant: 'destructive' })
      } else {
        toast({ title: 'Zalogowano pomyślnie!', description: 'Witamy z powrotem na MotoAuto.ch' })
        const redirectTo =
          new URLSearchParams(window.location.search).get('redirect') || '/dashboard'
        // POPRAWKA: przekazujemy obiekt, nie string!
        router.push({ pathname: redirectTo })
      }
    } catch {
      toast({ title: 'Błąd', description: 'Nieoczekiwany błąd. Spróbuj ponownie.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = () => {
    setFormData({ email: 'demo@motoauto.ch', password: 'demo123456' })
    setTimeout(() => handleSubmit({ preventDefault: () => {} } as React.FormEvent), 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Link href={{ pathname: '/' }} className="inline-flex items-center text-accent-teal hover:text-accent-teal/80 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />Powrót
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Zaloguj się do MotoAuto.ch</h1>
            <p className="text-gray-600">Wejdź do swojego konta, aby zarządzać ogłoszeniami</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="twoj@email.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Hasło</Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        placeholder="Twoje hasło"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" type="checkbox" className="h-4 w-4 text-accent-teal focus:ring-accent-teal border-gray-300 rounded" />
                      <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Zapamiętaj mnie</Label>
                    </div>
                    <Link href={{ pathname: '/forgot-password' }} className="text-sm text-accent-teal hover:text-accent-teal/80">Zapomniałeś hasła?</Link>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-accent-teal text-white py-2.5">
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">lub</span></div>
                  </div>

                  <Button type="button" variant="outline" onClick={handleDemo} disabled={loading} className="w-full border-gray-300">
                    Użyj konta demo
                  </Button>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-gray-600 mt-6">
              Nie masz konta?{' '}
              <Link href={{ pathname: '/register' }} className="font-medium text-accent-teal hover:text-accent-teal/80">
                Zarejestruj się
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
