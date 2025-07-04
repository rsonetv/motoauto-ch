'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase, type Listing } from '@/lib/supabase'
import { Search, Clock, Eye, MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { Toaster, toast } from '@/components/ui/toaster'

const FEATURED_CATEGORIES = [
  { name: 'Motocykle sportowe', value: 'sportowe' },
  { name: 'Samochody osobowe', value: 'osobowe' },
  { name: 'Cruisery', value: 'cruiser' },
  { name: 'Luksusowe', value: 'luksusowe' }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([])
  const [activeAuctions, setActiveAuctions] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Pobierz 8 najnowszych ogłoszeń
      const { data: listings } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8)

      // Pobierz 4 aktywne aukcje
      const { data: auctions } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(4)

      setFeaturedListings(listings ?? [])
      setActiveAuctions(auctions ?? [])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      window.location.href = `/search?q=${encodeURIComponent(q)}`
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0
    }).format(price)

  const formatTimeLeft = (endTime: string) => {
    const diff = new Date(endTime).getTime() - Date.now()
    if (diff <= 0) return 'Zakończone'
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return days > 0
      ? `${days}d ${hours}h`
      : hours > 0
      ? `${hours}h ${minutes}m`
      : `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toaster />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-teal to-blue-600 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
          >
            Znajdź swój <span className="text-yellow-400">wymarzony</span> pojazd
          </motion.h1>
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Wyszukaj BMW, Honda, Yamaha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white text-gray-900 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <Button type="submit" size="lg" className="bg-cta-red hover:bg-cta-red/90 h-12 px-8">
              Szukaj
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popularne kategorie</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
          {FEATURED_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={{ pathname: '/listings', query: { category: cat.value } }}>
                <Card className="group cursor-pointer hover:shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{cat.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Active Auctions */}
      {activeAuctions.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Aktywne aukcje</h2>
            <Button asChild variant="outline">
              <Link href={{ pathname: '/auctions' }}>Zobacz wszystkie</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {activeAuctions.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={{ pathname: '/auctions', query: { id: item.id.toString() } }}>
                  <Card className="group cursor-pointer hover:shadow-xl border-l-4 border-l-cta-red overflow-hidden">
                    <div className="aspect-video bg-gray-200 relative">
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <Badge className="absolute top-2 right-2 bg-cta-red text-white flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {formatTimeLeft(item.end_time)}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-accent-teal">{formatPrice(item.price)}</span>
                        <span className="flex items-center text-gray-500">
                          <Eye className="w-4 h-4 mr-1" /> {item.views ?? 0}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Najnowsze ogłoszenia</h2>
          <Button asChild variant="outline">
            <Link href={{ pathname: '/listings' }}>Zobacz wszystkie</Link>
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {featuredListings.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={{ pathname: '/listings', query: { id: item.id.toString() } }}>
                  <Card className="group cursor-pointer hover:shadow-xl overflow-hidden">
                    <div className="aspect-video bg-gray-200 relative">
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <Badge className="absolute top-2 right-2 bg-white text-gray-900 px-2">
                        {item.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-accent-teal">{formatPrice(item.price)}</span>
                        <span className="flex items-center text-gray-500">
                          <Eye className="w-4 h-4 mr-1" /> {item.views ?? 0}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
)
}
