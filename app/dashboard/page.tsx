'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Listing {
  id: string
  title: string
  description: string
  price: number
  category: string
  status: 'active' | 'sold' | 'expired'
  created_at: string
  views?: number
  bids?: number
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [listings, setListings] = useState<Listing[]>([])
  const [loadingListings, setLoadingListings] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      fetchUserListings()
    }
  }, [user, loading, router])

  const fetchUserListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setListings(data || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się załadować ogłoszeń.",
        variant: "destructive",
      })
    } finally {
      setLoadingListings(false)
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) return

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)

      if (error) throw error

      setListings(prev => prev.filter(listing => listing.id !== id))
      toast({
        title: "Sukces",
        description: "Ogłoszenie zostało usunięte.",
      })
    } catch (error) {
      console.error('Error deleting listing:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć ogłoszenia.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktywne</Badge>
      case 'sold':
        return <Badge className="bg-blue-100 text-blue-800">Sprzedane</Badge>
      case 'expired':
        return <Badge variant="destructive">Wygasłe</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading || loadingListings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-teal mx-auto"></div>
            <p className="mt-4 text-gray-600">Ładowanie...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel użytkownika</h1>
          <p className="mt-2 text-gray-600">Zarządzaj swoimi ogłoszeniami i kontem</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktywne ogłoszenia</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {listings.filter(l => l.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sprzedane</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {listings.filter(l => l.status === 'sold').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Łączne wyświetlenia</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {listings.reduce((total, listing) => total + (listing.views || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Moje ogłoszenia</h2>
          <Button asChild className="bg-cta-red hover:bg-cta-red/90">
            <Link href="/new-listing">
              <Plus className="mr-2 h-4 w-4" />
              Dodaj nowe
            </Link>
          </Button>
        </div>

        {listings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="mb-4">
                <Plus className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Brak ogłoszeń
              </h3>
              <p className="text-gray-600 mb-6">
                Dodaj swoje pierwsze ogłoszenie, aby rozpocząć sprzedaż
              </p>
              <Button asChild className="bg-cta-red hover:bg-cta-red/90">
                <Link href="/new-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj ogłoszenie
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {listing.category} • {new Date(listing.created_at).toLocaleDateString('pl-PL')}
                      </CardDescription>
                    </div>
                    {getStatusBadge(listing.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-accent-teal">
                      {listing.price.toLocaleString('pl-PL')} CHF
                    </span>
                    <div className="text-sm text-gray-500">
                      {listing.views || 0} wyświetleń
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/listing/${listing.id}`}>
                        <Eye className="mr-1 h-3 w-3" />
                        Podgląd
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/edit-listing/${listing.id}`}>
                        <Edit className="mr-1 h-3 w-3" />
                        Edytuj
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteListing(listing.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Usuń
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}