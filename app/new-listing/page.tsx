'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Upload, X } from 'lucide-react'

const CATEGORIES = [
  { value: 'sportowe', label: 'Motocykle sportowe' },
  { value: 'cruiser', label: 'Cruisery' },
  { value: 'naked', label: 'Naked bike' },
  { value: 'touring', label: 'Turystyczne' },
  { value: 'enduro', label: 'Enduro' },
  { value: 'skuter', label: 'Skutery' },
  { value: 'osobowe', label: 'Samochody osobowe' },
  { value: 'dostawcze', label: 'Dostawcze' },
  { value: 'luksusowe', label: 'Luksusowe' },
  { value: 'inne', label: 'Inne' }
]

export default function NewListingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    year: '',
    mileage: '',
    engine_size: '',
    fuel_type: '',
    transmission: '',
    condition: '',
    location: ''
  })

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + uploadedImages.length > 10) {
      toast({
        title: "Błąd",
        description: "Możesz dodać maksymalnie 10 zdjęć.",
        variant: "destructive",
      })
      return
    }

    setUploadedImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (listingId: string) => {
    const imageUrls = []
    
    for (let i = 0; i < uploadedImages.length; i++) {
      const file = uploadedImages[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${listingId}/${i + 1}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file)

      if (error) {
        console.error('Error uploading image:', error)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('listing-images')
        .getPublicUrl(fileName)

      imageUrls.push(publicUrl)
    }

    return imageUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Błąd",
        description: "Musisz być zalogowany, aby dodać ogłoszenie.",
        variant: "destructive",
      })
      return
    }

    if (uploadedImages.length === 0) {
      toast({
        title: "Błąd",
        description: "Dodaj co najmniej jedno zdjęcie.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      // Create listing
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          year: formData.year ? parseInt(formData.year) : null,
          mileage: formData.mileage ? parseInt(formData.mileage) : null,
          engine_size: formData.engine_size ? parseInt(formData.engine_size) : null,
          fuel_type: formData.fuel_type || null,
          transmission: formData.transmission || null,
          condition: formData.condition || null,
          location: formData.location || null,
          status: 'active'
        })
        .select()
        .single()

      if (listingError) throw listingError

      // Upload images
      const imageUrls = await uploadImages(listing.id)

      // Update listing with image URLs
      if (imageUrls.length > 0) {
        const { error: updateError } = await supabase
          .from('listings')
          .update({ images: imageUrls })
          .eq('id', listing.id)

        if (updateError) throw updateError
      }

      toast({
        title: "Sukces!",
        description: "Ogłoszenie zostało dodane pomyślnie.",
      })

      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating listing:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się dodać ogłoszenia.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
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
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dodaj nowe ogłoszenie</h1>
          <p className="mt-2 text-gray-600">Wypełnij formularz, aby dodać swój pojazd</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Podstawowe informacje</CardTitle>
              <CardDescription>Podaj podstawowe dane o swoim pojeździe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Tytuł ogłoszenia *</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="np. BMW S1000RR 2023"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Kategoria *</Label>
                <Select onValueChange={handleSelectChange('category')} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Opis *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Opisz szczegółowo swój pojazd..."
                  rows={5}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price">Cena (CHF) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="15000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Lokalizacja</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Zurych, Szwajcaria"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Szczegóły techniczne</CardTitle>
              <CardDescription>Dodatkowe informacje o pojeździe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="year">Rok produkcji</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="2020"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Przebieg (km)</Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="15000"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="engine_size">Pojemność silnika (ccm)</Label>
                  <Input
                    id="engine_size"
                    name="engine_size"
                    type="number"
                    value={formData.engine_size}
                    onChange={handleInputChange}
                    placeholder="1000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fuel_type">Rodzaj paliwa</Label>
                  <Select onValueChange={handleSelectChange('fuel_type')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Wybierz paliwo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="benzyna">Benzyna</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="elektryczny">Elektryczny</SelectItem>
                      <SelectItem value="hybryda">Hybryda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="transmission">Skrzynia biegów</Label>
                  <Select onValueChange={handleSelectChange('transmission')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Wybierz skrzynię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manualna">Manualna</SelectItem>
                      <SelectItem value="automatyczna">Automatyczna</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition">Stan</Label>
                  <Select onValueChange={handleSelectChange('condition')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Wybierz stan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowy">Nowy</SelectItem>
                      <SelectItem value="bardzo_dobry">Bardzo dobry</SelectItem>
                      <SelectItem value="dobry">Dobry</SelectItem>
                      <SelectItem value="zadawalający">Zadawalający</SelectItem>
                      <SelectItem value="do_remontu">Do remontu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Zdjęcia</CardTitle>
              <CardDescription>Dodaj zdjęcia swojego pojazdu (maksymalnie 10)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Kliknij, aby dodać</span> lub przeciągnij i upuść
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG do 10MB</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-cta-red hover:bg-cta-red/90"
            >
              {submitting ? 'Dodawanie...' : 'Dodaj ogłoszenie'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}