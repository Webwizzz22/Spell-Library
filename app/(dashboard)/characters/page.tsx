'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function CharactersPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Magical Characters</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <p className="text-gray-300 text-center">
            Meet the magical characters of the wizarding world, {user.firstName}!
          </p>
        </div>
      </div>
    </div>
  );
}
