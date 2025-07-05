// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Listing = Database['public']['Tables']['listings']['Row'];

export const deleteListingById = async (id: number) => {
    return supabase.from('listings').delete().eq('id', id);
};

