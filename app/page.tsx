'use client';

import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Wand2, BookOpen, Users, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background magical effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Wand2 className="h-8 w-8 text-yellow-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            SpellAcademia
          </h1>
        </div>
        
        <div className="flex space-x-4 items-center">
          <SignedOut>
            <SignInButton>
              <button className="px-6 py-2 border border-purple-400 rounded-lg hover:bg-purple-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
              Enter Academy
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-20 px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Master the Art of Magic
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
          Welcome to SpellAcademia, where you'll learn ancient spells, discover magical creatures, 
          and embark on an extraordinary journey through the wizarding world.
        </p>
        
        <SignedOut>
          <SignUpButton>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-12 py-4 rounded-full text-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105 shadow-2xl">
              Begin Your Magical Journey
            </button>
          </SignUpButton>
        </SignedOut>
        
        <SignedIn>
          <Link href="/dashboard" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-12 py-4 rounded-full text-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105 shadow-2xl inline-block">
            Continue Your Journey
          </Link>
        </SignedIn>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-6xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <BookOpen className="h-12 w-12 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Learn Ancient Spells</h3>
            <p className="text-gray-300">Master hundreds of spells from the wizarding world with interactive lessons and practice sessions.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <Users className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Meet Magical Characters</h3>
            <p className="text-gray-300">Interact with beloved characters and learn their stories, wisdom, and magical techniques.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <Star className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">House System</h3>
            <p className="text-gray-300">Get sorted into your house and unlock unique content, themes, and magical experiences.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 text-gray-400">
        <p>&copy; 2024 SpellAcademia. Embark on your magical journey today.</p>
      </footer>
    </div>
  );
}
