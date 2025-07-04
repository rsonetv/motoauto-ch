// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Eksport typów dla łatwiejszego użycia

export type Listing = Database['public']['Tables']['listings']['Row'];
export type ListingInsert = Database['public']['Tables']['listings']['Insert']
export type ListingUpdate = Database['public']['Tables']['listings']['Update']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// Utility functions dla Supabase queries
export const createListing = async (listing: ListingInsert) => {
  return await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single()
}

export const updateListing = async (id: string, updates: ListingUpdate) => {
  return await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
}

export const deleteListing = async (id: string) => {
  return await supabase
    .from('listings')
    .delete()
    .eq('id', id)
}

export const getListingsByUser = async (userId: string) => {
  return await supabase
    .from('listings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const getActiveListings = async (limit: number = 20, offset: number = 0) => {
  return await supabase
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
}
