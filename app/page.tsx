'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import type { Listing } from '@/lib/supabase'
import { Search, Clock, Eye, MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const FEATURED_CATEGORIES = [
  { name: 'Motocykle sportowe', value: 'sportowe', image: '/images/categories/sport-bikes.jpg', count: '150+ ogłoszeń' },
  { name: 'Samochody osobowe', value: 'osobowe', image: '/images/categories/cars.jpg', count: '300+ ogłoszeń' },
  { name: 'Cruisery', value: 'cruiser', image: '/images/categories/cruisers.jpg', count: '80+ ogłoszeń' },
  { name: 'Luksusowe', value: 'luksusowe', image: '/images/categories/luxury.jpg', count: '45+ ogłoszeń' }
]

const BENEFITS = [
  { icon: '🔒', title: 'Bezpieczne transakcje', description: 'System escrow i weryfikacja użytkowników' },
  { icon: '🏆', title: 'Najlepsze ceny', description: 'Aukcje i negocjacje bezpośrednio z właścicielami' },
  { icon: '📱', title: 'Łatwe w użyciu', description: 'Intuicyjna platforma dostępna na wszystkich urządzeniach' },
  { icon: '🇨🇭', title: 'Lokalnie w Szwajcarii', description: 'Pojazdy z pełną dokumentacją i historią serwisową' }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedListings()
  }, [])

  const fetchFeaturedListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      setFeaturedListings(data || [])
    } catch (error) {
      console.error('Error fetching featured listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    // Redirect to search page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MotoAuto.ch
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Znajdź swój wymarzony pojazd w Szwajcarii. Motocykle, samochody i więcej.
            </motion.p>

            <motion.div 
              className="max-w-2xl mx-auto flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Input
                type="text"
                placeholder="Szukaj motocykli, samochodów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-gray-900"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} size="lg">
                <Search className="w-5 h-5 mr-2" />
                Szukaj
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popularne kategorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                  <p className="text-gray-600">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Najnowsze oferty</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Ładowanie ofert...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold line-clamp-2">{listing.title}</h3>
                      <Badge variant="secondary">{listing.category}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-3">
                      {listing.price.toLocaleString('de-CH')} CHF
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {listing.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(listing.created_at).toLocaleDateString('pl-PL')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
           <Link href={{ pathname: '/search' }}> // Poprawka
  <Button size="lg">Zobacz wszystkie oferty</Button>
</Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Dlaczego MotoAuto.ch?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
