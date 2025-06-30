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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        let errorMessage = 'Wystąpił błąd podczas logowania'
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Nieprawidłowy email lub hasło'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Potwierdź swój email przed logowaniem'
        }
        
        toast({
          title: 'Błąd logowania',
          description: errorMessage,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Zalogowano pomyślnie!',
          description: 'Witamy z powrotem na MotoAuto.ch',
        })
        
        // Redirect to dashboard or previous page
        const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard'
        router.push(redirectTo)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: 'Błąd',
        description: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setFormData({
      email: 'demo@motoauto.ch',
      password: 'demo123456'
    })
    
    // Auto-submit after setting demo credentials
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link 
              href="/"
              className="inline-flex items-center text-accent-teal hover:text-accent-teal/80 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót na stronę główną
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Zaloguj się do MotoAuto.ch
            </h1>
            <p className="text-gray-600">
              Wejdź do swojego konta, aby zarządzać ogłoszeniami
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Adres email
                    </Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="twoj@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Hasło
                    </Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        placeholder="Twoje hasło"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-accent-teal focus:ring-accent-teal border-gray-300 rounded"
                      />
                      <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                        Zapamiętaj mnie
                      </Label>
                    </div>

                    <Link 
                      href="/forgot-password"
                      className="text-sm text-accent-teal hover:text-accent-teal/80"
                    >
                      Zapomniałeś hasła?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent-teal hover:bg-accent-teal/90 text-white font-medium py-2.5"
                  >
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">lub</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDemoLogin}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Użyj konta demo
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Nie masz jeszcze konta?{' '}
                <Link 
                  href="/register"
                  className="font-medium text-accent-teal hover:text-accent-teal/80"
                >
                  Zarejestruj się
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h3 className="text-lg font-medium text-gray-900 text-center mb-6">
              Korzyści z posiadania konta
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Zarządzaj ogłoszeniami</h4>
                  <p className="text-sm text-gray-600">Dodawaj, edytuj i monitoruj swoje oferty</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Uczestnictwo w aukcjach</h4>
                  <p className="text-sm text-gray-600">Licytuj i kupuj pojazdy w atrakcyjnych cenach</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Zapisane wyszukiwania</h4>
                  <p className="text-sm text-gray-600">Otrzymuj powiadomienia o nowych ofertach</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mt-2"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Bezpieczne transakcje</h4>
                  <p className="text-sm text-gray-600">System escrow i weryfikacja tożsamości</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}