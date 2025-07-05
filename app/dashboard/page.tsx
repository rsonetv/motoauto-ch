'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { supabase, type Listing } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const fetchUserListings = useCallback(async (userId: string) => {
    if (!userId) return;
    setLoadingListings(true);
    try {
      const { data, error } = await supabase.from('listings').select('*').eq('user_id', userId);
      if (error) throw error;
      setListings(data || []);
    } catch (err) {
      toast({ title: "Błąd", description: "Nie udało się załadować ogłoszeń." });
    } finally {
      setLoadingListings(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchUserListings(user.id);
      } else {
        router.push('/login');
      }
    }
  }, [user, authLoading, router, fetchUserListings]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Panel Użytkownika</h1>
          <Button asChild><Link href={{ pathname: '/new-listing' }}><Plus className="mr-2 h-4 w-4" />Dodaj nowe</Link></Button>
        </div>
        {loadingListings ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin" /></div>
        ) : listings.length === 0 ? (
          <Card><CardContent className="p-8 text-center">Brak ogłoszeń.</CardContent></Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {listings.map(listing => (
              <Card key={listing.id}>
                <CardHeader>
                  <CardTitle>{listing.title}</CardTitle>
                  <CardDescription>{new Date(listing.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button asChild variant="outline" size="sm"><Link href={{ pathname: `/listings/${listing.id}` }}><Eye className="mr-1 h-4 w-4" />Podgląd</Link></Button>
                  <Button asChild variant="outline" size="sm"><Link href={{ pathname: `/edit-listing/${listing.id}` }}><Edit className="mr-1 h-4 w-4" />Edytuj</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

