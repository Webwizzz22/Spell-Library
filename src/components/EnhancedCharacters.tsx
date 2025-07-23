'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Heart, BookOpen, Wand2, Star, Users as UsersIcon, Filter, ArrowLeft, Play, Pause } from 'lucide-react';
import { charactersData, Character } from '../data/charactersData';
import { enhancedSoundLibrary } from './SoundManager';

interface EnhancedCharactersProps {
  user?: {
    house: 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin';
  };
}

const houseColors = {
  gryffindor: { 
    primary: 'bg-red-800', 
    secondary: 'bg-yellow-600', 
    text: 'text-red-200',
    border: 'border-red-400',
    glow: 'shadow-red-500/50'
  },
  hufflepuff: { 
    primary: 'bg-yellow-700', 
    secondary: 'bg-gray-700', 
    text: 'text-yellow-200',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-500/50'
  },
  ravenclaw: { 
    primary: 'bg-blue-800', 
    secondary: 'bg-gray-600', 
    text: 'text-blue-200',
    border: 'border-blue-400',
    glow: 'shadow-blue-500/50'
  },
  slytherin: { 
    primary: 'bg-green-800', 
    secondary: 'bg-gray-600', 
    text: 'text-green-200',
    border: 'border-green-400',
    glow: 'shadow-green-500/50'
  }
};

const EnhancedCharacters: React.FC<EnhancedCharactersProps> = ({ user }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(charactersData);
  const [playingTheme, setPlayingTheme] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteCharacters');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Filter characters based on search and filters
    let filtered = charactersData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(query) ||
        char.description.toLowerCase().includes(query) ||
        char.quotes.some(quote => quote.toLowerCase().includes(query)) ||
        char.facts.some(fact => fact.toLowerCase().includes(query))
      );
    }

    if (selectedHouse !== 'all') {
      filtered = filtered.filter(char => char.house === selectedHouse);
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(char => char.role === selectedRole);
    }

    setFilteredCharacters(filtered);
  }, [searchQuery, selectedHouse, selectedRole]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    enhancedSoundLibrary.play('spellCast');
    
    // Stop currently playing theme
    if (playingTheme) {
      setPlayingTheme(null);
    }
  };

  const handlePlayTheme = (character: Character, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (playingTheme === character.theme) {
      setPlayingTheme(null);
    } else {
      setPlayingTheme(character.theme || null);
      enhancedSoundLibrary.play('spellCast');
    }
  };

  const toggleFavorite = (characterId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFavorites = favorites.includes(characterId)
      ? favorites.filter(id => id !== characterId)
      : [...favorites, characterId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCharacters', JSON.stringify(newFavorites));
    enhancedSoundLibrary.play('buttonHover');
  };

  const getHouseStyle = (house?: string) => {
    if (!house || !user) return 'bg-gray-800 border-gray-600';
    return `${houseColors[house as keyof typeof houseColors].primary} ${houseColors[house as keyof typeof houseColors].border}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-20 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      />
      
      {/* Floating Castle Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="w-full h-full bg-[url('/images/hogwarts-castle.svg')] bg-center bg-no-repeat bg-cover"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 pb-20">
        {/* Header Section */}
        <motion.div
          style={{ scale: headerScale }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <UsersIcon className="w-20 h-20 text-yellow-400" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-yellow-400/30 rounded-full"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-serif mb-4"
          >
            Portrait Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Meet the witches and wizards who shaped the magical world. Discover their stories, listen to their themes, and add your favorites to your collection.
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search characters, quotes, or facts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
              />
            </div>

            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-medium transition-all duration-300 shadow-lg"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </motion.button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="flex flex-col space-y-2">
                  <label className="text-gray-300 font-medium">House</label>
                  <select
                    value={selectedHouse}
                    onChange={(e) => setSelectedHouse(e.target.value)}
                    title="Filter by House"
                    className="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400/50"
                  >
                    <option value="all">All Houses</option>
                    <option value="gryffindor">Gryffindor</option>
                    <option value="hufflepuff">Hufflepuff</option>
                    <option value="ravenclaw">Ravenclaw</option>
                    <option value="slytherin">Slytherin</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-gray-300 font-medium">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    title="Filter by Role"
                    className="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400/50"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                    <option value="auror">Auror</option>
                    <option value="ministry">Ministry</option>
                    <option value="death_eater">Death Eater</option>
                    <option value="order_member">Order Member</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Characters Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCharacters.map((character) => (
            <motion.div
              key={character.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharacterSelect(character)}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden backdrop-blur-sm border-2 transition-all duration-300 ${getHouseStyle(character.house)} hover:shadow-2xl`}
            >
              {/* Character Image Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">
                  {character.house === 'gryffindor' && '🦁'}
                  {character.house === 'hufflepuff' && '🦡'}
                  {character.house === 'ravenclaw' && '🦅'}
                  {character.house === 'slytherin' && '🐍'}
                  {!character.house && '⚡'}
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => toggleFavorite(character.id, e)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      favorites.includes(character.id)
                        ? 'bg-red-500/80 text-white'
                        : 'bg-black/40 text-gray-300 hover:bg-red-500/60 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(character.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  
                  {/* Theme Music Button */}
                  {character.theme && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handlePlayTheme(character, e)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        playingTheme === character.theme
                          ? 'bg-green-500/80 text-white'
                          : 'bg-black/40 text-gray-300 hover:bg-green-500/60 hover:text-white'
                      }`}
                    >
                      {playingTheme === character.theme ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </motion.button>
                  )}
                </div>

                {/* House Badge */}
                {character.house && (
                  <div className="absolute bottom-3 left-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${getHouseStyle(character.house)}`}>
                      {character.house.charAt(0).toUpperCase() + character.house.slice(1)}
                    </div>
                  </div>
                )}
              </div>

              {/* Character Info */}
              <div className="p-4 bg-black/40 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                  {character.name}
                </h3>
                
                <p className="text-sm text-gray-300 mb-2 capitalize">
                  {character.role.replace('_', ' ')} • {character.bloodStatus.replace('_', ' ')}
                </p>
                
                <p className="text-xs text-gray-400 line-clamp-2">
                  {character.description}
                </p>

                {/* Wand Info */}
                {character.wand && (
                  <div className="mt-2 flex items-center text-xs text-gray-400">
                    <Wand2 className="w-3 h-3 mr-1" />
                    <span>{character.wand.wood} • {character.wand.length}</span>
                  </div>
                )}
              </div>

              {/* Magical Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className={`absolute inset-0 rounded-2xl ${houseColors[character.house as keyof typeof houseColors]?.glow || 'shadow-white/20'} shadow-lg`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCharacters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Characters Found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/20 shadow-2xl"
            >
              {/* Header */}
              <div className={`relative p-6 ${getHouseStyle(selectedCharacter.house)} border-b border-white/20`}>
                <button
                  onClick={() => setSelectedCharacter(null)}
                  title="Close Character Details"
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-4xl">
                    {selectedCharacter.house === 'gryffindor' && '🦁'}
                    {selectedCharacter.house === 'hufflepuff' && '🦡'}
                    {selectedCharacter.house === 'ravenclaw' && '🦅'}
                    {selectedCharacter.house === 'slytherin' && '🐍'}
                    {!selectedCharacter.house && '⚡'}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedCharacter.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedCharacter.house && (
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                          {selectedCharacter.house.charAt(0).toUpperCase() + selectedCharacter.house.slice(1)}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white capitalize">
                        {selectedCharacter.role.replace('_', ' ')}
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white capitalize">
                        {selectedCharacter.bloodStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-200">{selectedCharacter.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Quotes */}
                {selectedCharacter.quotes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-400" />
                      Famous Quotes
                    </h3>
                    <div className="space-y-2">
                      {selectedCharacter.quotes.map((quote, index) => (
                        <div key={index} className="italic text-gray-300 border-l-4 border-yellow-400 pl-4">
                          "{quote}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Facts */}
                {selectedCharacter.facts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                      Interesting Facts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedCharacter.facts.map((fact, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-blue-400 text-sm">•</span>
                          <span className="text-gray-300 text-sm">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wand Details */}
                {selectedCharacter.wand && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                      <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
                      Wand Details
                    </h3>
                    <div className="bg-black/30 rounded-xl p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-gray-400 text-sm">Wood</div>
                          <div className="text-white font-medium">{selectedCharacter.wand.wood}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Core</div>
                          <div className="text-white font-medium">{selectedCharacter.wand.core}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Length</div>
                          <div className="text-white font-medium">{selectedCharacter.wand.length}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCharacter.patronus && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Patronus</h4>
                      <p className="text-gray-300">{selectedCharacter.patronus}</p>
                    </div>
                  )}

                  {selectedCharacter.boggart && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Boggart</h4>
                      <p className="text-gray-300">{selectedCharacter.boggart}</p>
                    </div>
                  )}

                  {selectedCharacter.yearOfBirth && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Year of Birth</h4>
                      <p className="text-gray-300">{selectedCharacter.yearOfBirth}</p>
                    </div>
                  )}

                  {selectedCharacter.actor && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Portrayed by</h4>
                      <p className="text-gray-300">{selectedCharacter.actor}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedCharacters;
