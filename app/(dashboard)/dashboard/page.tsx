'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { BookOpen, Users, Map, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (isLoaded && !user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background magical effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Wand2 className="h-12 w-12 text-yellow-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            SpellAcademia Dashboard
          </h1>
        </div>
        <p className="text-xl text-gray-300">Welcome back, young wizard! Continue your magical journey.</p>
      </div>

      {/* Navigation Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Spellbook */}
          <Link href="/spellbook" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer">
              <BookOpen className="h-16 w-16 text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Spellbook</h3>
              <p className="text-gray-300">Learn and master ancient spells from the wizarding world.</p>
            </div>
          </Link>

          {/* Characters */}
          <Link href="/characters" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer">
              <Users className="h-16 w-16 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Characters</h3>
              <p className="text-gray-300">Meet and interact with beloved magical characters.</p>
            </div>
          </Link>

          {/* Journey */}
          <Link href="/journey" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer">
              <Map className="h-16 w-16 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Journey</h3>
              <p className="text-gray-300">Track your progress through the magical curriculum.</p>
            </div>
          </Link>

          {/* Sorting Hat */}
          <Link href="/sorting-hat" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer">
              <Sparkles className="h-16 w-16 text-red-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Sorting Hat</h3>
              <p className="text-gray-300">Discover your Hogwarts house and unlock house-specific content.</p>
            </div>
          </Link>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">A</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Your Profile</h3>
                <p className="text-gray-300">Level 1 Apprentice</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-[15%]"></div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Spells Learned</span>
                <span className="font-bold text-yellow-400">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Characters Met</span>
                <span className="font-bold text-purple-400">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Journey Progress</span>
                <span className="font-bold text-blue-400">3/20</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
