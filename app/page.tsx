'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getListings, getAuctions, type Listing, type Auction } from '@/lib/supabase'
import { Search, TrendingUp, Clock, Eye, MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const FEATURED_CATEGORIES = [
  {
    name: 'Motocykle sportowe',
    value: 'sportowe',
    image: '/images/categories/sport-bikes.jpg',
    count: '150+ ogłoszeń'
  },
  {
    name: 'Samochody osobowe',
    value: 'osobowe',
    image: '/images/categories/cars.jpg',
    count: '300+ ogłoszeń'
  },
  {
    name: 'Cruisery',
    value: 'cruiser',
    image: '/images/categories/cruisers.jpg',
    count: '80+ ogłoszeń'
  },
  {
    name: 'Luksusowe',
    value: 'luksusowe',
    image: '/images/categories/luxury.jpg',
    count: '45+ ogłoszeń'
  }
]

const BENEFITS = [
  {
    icon: '🔒',
    title: 'Bezpieczne transakcje',
    description: 'System escrow i weryfikacja użytkowników'
  },
  {
    icon: '🏆',
    title: 'Najlepsze ceny',
    description: 'Aukcje i negocjacje bezpośrednio z właścicielami'
  },
  {
    icon: '📱',
    title: 'Łatwe w użyciu',
    description: 'Intuicyjna platforma dostępna na wszystkich urządzeniach'
  },
  {
    icon: '🇨🇭',
    title: 'Lokalnie w Szwajcarii',
    description: 'Pojazdy z pełną dokumentacją i historią serwisową'
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([])
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [listings, auctions] = await Promise.all([
          getListings({ limit: 8 }),
          getAuctions({ status: 'active', limit: 4 })
        ])
        
        setFeaturedListings(listings || [])
        setActiveAuctions(auctions || [])
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatTimeLeft = (endTime: string) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end.getTime() - now.getTime()
    
    if (diff <= 0) return 'Zakończone'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-teal to-blue-600 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            >
              Znajdź swój <span className="text-yellow-400">wymarzony</span> pojazd
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90"
            >
              Największa platforma sprzedaży motocykli i samochodów w Szwajcarii. 
              Aukcje, negocjacje i bezpieczne transakcje.
            </motion.p>
            
            <motion.form 
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Wyszukaj BMW, Honda, Yamaha..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-gray-900 bg-white/95 border-0 focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <Button type="submit" size="lg" className="bg-cta-red hover:bg-cta-red/90 h-12 px-8">
                  Szukaj
                </Button>
              </div>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                🏍️ 500+ Motocykli
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                🚗 800+ Samochodów
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                ⚡ 50+ Aukcji live
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popularne kategorie</h2>
            <p className="text-lg text-gray-600">Znajdź dokładnie to, czego szukasz</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/listings?category=${category.value}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Auctions */}
      {activeAuctions.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Aktywne aukcje</h2>
                <p className="text-lg text-gray-600">Licytuj i wygraj najlepsze pojazdy</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/auctions">Zobacz wszystkie</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeAuctions.map((auction, index) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/auctions/${auction.id}`}>
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-l-cta-red">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        {auction.listing?.images?.[0] && (
                          <img 
                            src={auction.listing.images[0]} 
                            alt={auction.listing?.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-cta-red text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeLeft(auction.end_time)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                          {auction.listing?.title}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Aktualna cena:</span>
                            <span className="font-bold text-accent-teal">
                              {formatPrice(auction.current_bid || auction.start_price)}
                            </span>
                          </div>
                          {auction.reserve_price && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Cena rezerwowa:</span>
                              <span className="text-sm text-gray-800">
                                {formatPrice(auction.reserve_price)}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Najnowsze ogłoszenia</h2>
              <p className="text-lg text-gray-600">Sprawdź najświeższe oferty</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/listings">Zobacz wszystkie</Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 loading-skeleton" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-6 bg-gray-200 loading-skeleton rounded" />
                    <div className="h-4 bg-gray-200 loading-skeleton rounded w-2/3" />
                    <div className="h-5 bg-gray-200 loading-skeleton rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/listings/${listing.id}`}>
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        {listing.images?.[0] && (
                          <img 
                            src={listing.images[0]} 
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-white/90 text-gray-900">
                            {listing.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {listing.title}
                        </h3>
                        <div className="space-y-1 mb-3">
                          {listing.year && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              {listing.year}
                              {listing.mileage && ` • ${listing.mileage.toLocaleString()} km`}
                            </div>
                          )}
                          {listing.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              {listing.location}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-accent-teal">
                            {formatPrice(listing.price)}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="w-4 h-4 mr-1" />
                            {listing.views}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dlaczego MotoAuto.ch?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferujemy najbezpieczniejszą i najwygodniejszą platformę sprzedaży pojazdów w Szwajcarii
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-teal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gotowy na sprzedaż swojego pojazdu?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Dołącz do tysięcy zadowolonych użytkowników i sprzedaj swój pojazd szybko i bezpiecznie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-cta-red hover:bg-cta-red/90">
              <Link href="/new-listing">Dodaj ogłoszenie</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent-teal">
              <Link href="/how-it-works">Jak to działa</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}