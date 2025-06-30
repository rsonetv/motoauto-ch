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
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Building, Users } from 'lucide-react'
import { motion } from 'framer-motion'

type AccountType = 'private' | 'dealer'

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<AccountType>('private')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast({
        title: 'Błąd walidacji',
        description: 'Wypełnij wszystkie wymagane pola',
        variant: 'destructive'
      })
      return false
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Błąd walidacji',
        description: 'Hasło musi mieć co najmniej 6 znaków',
        variant: 'destructive'
      })
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Błąd walidacji',
        description: 'Hasła nie są identyczne',
        variant: 'destructive'
      })
      return false
    }

    if (accountType === 'dealer' && !formData.companyName) {
      toast({
        title: 'Błąd walidacji',
        description: 'Nazwa firmy jest wymagana dla konta dealera',
        variant: 'destructive'
      })
      return false
    }

    if (!formData.agreeToTerms) {
      toast({
        title: 'Błąd walidacji',
        description: 'Musisz zaakceptować regulamin i politykę prywatności',
        variant: 'destructive'
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)

    try {
      const metadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        full_name: `${formData.firstName} ${formData.lastName}`,
        account_type: accountType,
        company_name: accountType === 'dealer' ? formData.companyName : null,
        phone: formData.phone || null
      }

      const { error } = await signUp(formData.email, formData.password, metadata)
      
      if (error) {
        let errorMessage = 'Wystąpił błąd podczas rejestracji'
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'Użytkownik z tym adresem email już istnieje'
        } else if (error.message.includes('Password should be at least 6 characters')) {
          errorMessage = 'Hasło musi mieć co najmniej 6 znaków'
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Podaj prawidłowy adres email'
        }
        
        toast({
          title: 'Błąd rejestracji',
          description: errorMessage,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Rejestracja pomyślna!',
          description: 'Sprawdź swoją skrzynkę email i potwierdź konto',
        })
        
        // Redirect to confirmation page
        router.push('/auth/confirm-email')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: 'Błąd',
        description: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const accountTypes = [
    {
      id: 'private',
      title: 'Konto prywatne',
      description: 'Dla osób prywatnych sprzedających swoje pojazdy',
      icon: Users,
      benefits: [
        'Szybka i łatwa publikacja',
        'Dotarcie do tysięcy kupujących',
        'Bezpieczne transakcje'
      ]
    },
    {
      id: 'dealer',
      title: 'Konto dealera',
      description: 'Dla dealerów i firm motoryzacyjnych',
      icon: Building,
      benefits: [
        'Specjalne pakiety dla dealerów',
        'Weryfikacja konta i odznaka dealera',
        'Narzędzia do zarządzania ofertami'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center text-accent-teal hover:text-accent-teal/80 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót na stronę główną
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dołącz do MotoAuto.ch
            </h1>
            <p className="text-gray-600">
              Utwórz konto i zacznij sprzedawać swoje pojazdy już dziś
            </p>
          </motion.div>

          {/* Account Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Label className="text-lg font-medium text-gray-900 mb-4 block">
              Wybierz typ konta
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accountTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      accountType === type.id
                        ? 'ring-2 ring-accent-teal border-accent-teal bg-accent-teal/5'
                        : 'hover:shadow-md border-gray-200'
                    }`}
                    onClick={() => setAccountType(type.id as AccountType)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          accountType === type.id ? 'bg-accent-teal text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                          <ul className="space-y-1">
                            {type.benefits.map((benefit, index) => (
                              <li key={index} className="text-xs text-gray-500 flex items-center">
                                <div className="w-1.5 h-1.5 bg-accent-teal rounded-full mr-2"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        Imię *
                      </Label>
                      <div className="mt-1 relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Jan"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Nazwisko *
                      </Label>
                      <div className="mt-1">
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Kowalski"
                        />
                      </div>
                    </div>
                  </div>

                  {accountType === 'dealer' && (
                    <div>
                      <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                        Nazwa firmy *
                      </Label>
                      <div className="mt-1 relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="companyName"
                          name="companyName"
                          type="text"
                          required={accountType === 'dealer'}
                          value={formData.companyName}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Auto-Dealer Sp. z o.o."
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Adres email *
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
                        placeholder="jan@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefon (opcjonalnie)
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+41 XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Hasło *
                      </Label>
                      <div className="mt-1 relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 pr-10"
                          placeholder="Min. 6 znaków"
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

                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Potwierdź hasło *
                      </Label>
                      <div className="mt-1 relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 pr-10"
                          placeholder="Powtórz hasło"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-accent-teal focus:ring-accent-teal border-gray-300 rounded mt-0.5"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      Akceptuję{' '}
                      <Link href="/terms" className="text-accent-teal hover:text-accent-teal/80 underline">
                        regulamin
                      </Link>
                      {' '}i{' '}
                      <Link href="/privacy" className="text-accent-teal hover:text-accent-teal/80 underline">
                        politykę prywatności
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent-teal hover:bg-accent-teal/90 text-white font-medium py-2.5"
                  >
                    {loading ? 'Rejestrowanie...' : 'Utwórz konto'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Masz już konto?{' '}
                <Link 
                  href="/login"
                  className="font-medium text-accent-teal hover:text-accent-teal/80"
                >
                  Zaloguj się
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}