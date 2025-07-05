'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signUp(email, password);
      if (error) {
        toast({ title: 'Błąd rejestracji', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Rejestracja pomyślna!', description: 'Sprawdź email, aby potwierdzić konto.' });
       router.push('/auth/confirm-email' as any);
      }
    } catch (err) {
      toast({ title: 'Błąd', description: 'Wystąpił nieoczekiwany błąd.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Utwórz konto</h1>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password">Hasło</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading} className="w-full">{loading ? 'Rejestrowanie...' : 'Zarejestruj się'}</Button>
              </form>
            </CardContent>
          </Card>
          <p className="text-center mt-4">Masz już konto? <Link href="/login" className="font-semibold text-accent-teal">Zaloguj się</Link></p>
        </motion.div>
      </main>
    </div>
  );
}
