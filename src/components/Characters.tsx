import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, BookOpen, Wand2, Star, Users as UsersIcon } from 'lucide-react';
import { charactersData, Character, searchCharacters } from '../data/charactersData';
import { enhancedSoundLibrary } from './SoundManager';

interface CharactersProps {
  // Component doesn't need user prop for now
}

const Characters: React.FC<CharactersProps> = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(charactersData);

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
      filtered = searchCharacters(searchQuery);
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
    
    // Play character theme if available
    if (character.theme) {
      enhancedSoundLibrary.playCharacterTheme(character.id);
    }
  };

  const toggleFavorite = (characterId: string) => {
    const newFavorites = favorites.includes(characterId)
      ? favorites.filter(id => id !== characterId)
      : [...favorites, characterId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCharacters', JSON.stringify(newFavorites));
    enhancedSoundLibrary.play('achievement');
  };

  const getHouseColors = (house?: string) => {
    switch (house) {
      case 'gryffindor': return { bg: 'from-red-900/20 to-yellow-800/20', border: 'border-red-500/30', text: 'text-red-300' };
      case 'hufflepuff': return { bg: 'from-yellow-700/20 to-yellow-900/20', border: 'border-yellow-500/30', text: 'text-yellow-300' };
      case 'ravenclaw': return { bg: 'from-blue-900/20 to-indigo-900/20', border: 'border-blue-500/30', text: 'text-blue-300' };
      case 'slytherin': return { bg: 'from-green-900/20 to-emerald-800/20', border: 'border-green-500/30', text: 'text-green-300' };
      default: return { bg: 'from-gray-700/20 to-gray-800/20', border: 'border-gray-500/30', text: 'text-gray-300' };
    }
  };

  const houses = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'];
  const roles = ['student', 'professor', 'auror', 'ministry', 'death_eater', 'order_member', 'other'];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 mb-4 font-serif"
          animate={{
            textShadow: [
              '0 0 20px #fbbf24',
              '0 0 40px #fbbf24',
              '0 0 20px #fbbf24'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          🧙‍♂️ Wizarding World Characters 🧙‍♀️
        </motion.h1>
        
        <motion.p 
          className="text-xl text-purple-200 mb-8 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover the magical beings who shaped the wizarding world
        </motion.p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/30 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          {/* House Filter */}
          <select
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
            className="px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
            aria-label="Filter by house"
          >
            <option value="all">All Houses</option>
            {houses.map(house => (
              <option key={house} value={house} className="capitalize">
                {house}
              </option>
            ))}
          </select>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role} className="capitalize">
                {role.replace('_', ' ')}
              </option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-center bg-purple-600/20 rounded-lg px-4 py-3">
            <UsersIcon className="w-5 h-5 text-purple-300 mr-2" />
            <span className="text-purple-200 font-medium">
              {filteredCharacters.length} characters found
            </span>
          </div>
        </div>
      </motion.div>

      {/* Characters Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <AnimatePresence>
          {filteredCharacters.map((character, index) => {
            const houseColors = getHouseColors(character.house);
            return (
              <motion.div
                key={character.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-gradient-to-br ${houseColors.bg} backdrop-blur-md rounded-2xl p-6 border-2 ${houseColors.border} cursor-pointer group overflow-hidden`}
                onClick={() => handleCharacterSelect(character)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Magical Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                {/* Character Image Placeholder */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl flex items-center justify-center overflow-hidden">
                    {character.house && (
                      <div className={`text-6xl opacity-80`}>
                        {character.house === 'gryffindor' && '🦁'}
                        {character.house === 'hufflepuff' && '🦡'}
                        {character.house === 'ravenclaw' && '🦅'}
                        {character.house === 'slytherin' && '🐍'}
                      </div>
                    )}
                    {!character.house && <Wand2 className="w-16 h-16 text-purple-300" />}
                  </div>
                  
                  {/* Favorite Button */}
                  <motion.button
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(character.id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(character.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </motion.button>
                </div>

                {/* Character Info */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {character.name}
                  </h3>
                  
                  {character.house && (
                    <p className={`text-sm font-medium mb-2 capitalize ${houseColors.text}`}>
                      {character.house} House
                    </p>
                  )}
                  
                  <p className="text-gray-300 text-sm mb-3 capitalize">
                    {character.role.replace('_', ' ')}
                  </p>
                  
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {character.description}
                  </p>

                  {/* Character Stats */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600/30">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-purple-300" />
                      <span className="text-xs text-gray-300">
                        {character.appearances.books.length} books
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-300">
                        {character.appearances.movies.length} films
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 rounded-3xl p-8 border-2 border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Character Detail Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image and Basic Info */}
                <div>
                  <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-2xl flex items-center justify-center mb-6">
                    {selectedCharacter.house && (
                      <div className="text-8xl">
                        {selectedCharacter.house === 'gryffindor' && '🦁'}
                        {selectedCharacter.house === 'hufflepuff' && '🦡'}
                        {selectedCharacter.house === 'ravenclaw' && '🦅'}
                        {selectedCharacter.house === 'slytherin' && '🐍'}
                      </div>
                    )}
                    {!selectedCharacter.house && <Wand2 className="w-24 h-24 text-purple-300" />}
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-4">{selectedCharacter.name}</h2>
                  
                  {selectedCharacter.actor && (
                    <p className="text-purple-300 mb-4">Portrayed by: {selectedCharacter.actor}</p>
                  )}

                  <div className="space-y-2 mb-6">
                    {selectedCharacter.house && (
                      <p className="text-gray-300">
                        <span className="font-semibold">House:</span> {selectedCharacter.house}
                      </p>
                    )}
                    <p className="text-gray-300">
                      <span className="font-semibold">Blood Status:</span> {selectedCharacter.bloodStatus}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Role:</span> {selectedCharacter.role.replace('_', ' ')}
                    </p>
                    {selectedCharacter.yearOfBirth && (
                      <p className="text-gray-300">
                        <span className="font-semibold">Born:</span> {selectedCharacter.yearOfBirth}
                      </p>
                    )}
                    {selectedCharacter.patronus && (
                      <p className="text-gray-300">
                        <span className="font-semibold">Patronus:</span> {selectedCharacter.patronus}
                      </p>
                    )}
                    {selectedCharacter.boggart && (
                      <p className="text-gray-300">
                        <span className="font-semibold">Boggart:</span> {selectedCharacter.boggart}
                      </p>
                    )}
                  </div>

                  {selectedCharacter.wand && (
                    <div className="bg-black/30 rounded-lg p-4 mb-6">
                      <h4 className="text-lg font-semibold text-amber-300 mb-2">🪄 Wand</h4>
                      <p className="text-gray-300 text-sm">
                        {selectedCharacter.wand.length} {selectedCharacter.wand.wood} with {selectedCharacter.wand.core} core
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column - Detailed Information */}
                <div>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-amber-300 mb-3">📖 About</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedCharacter.description}</p>
                  </div>

                  {selectedCharacter.quotes.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-amber-300 mb-3">💬 Famous Quotes</h4>
                      <div className="space-y-2">
                        {selectedCharacter.quotes.slice(0, 3).map((quote, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/30 rounded-lg p-3"
                          >
                            <p className="text-gray-300 italic">"{quote}"</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCharacter.facts.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-amber-300 mb-3">⚡ Magical Facts</h4>
                      <div className="space-y-2">
                        {selectedCharacter.facts.map((fact, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2"
                          >
                            <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">{fact}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="font-semibold text-amber-300 mb-2">📚 Books</h5>
                      <p className="text-gray-300 text-sm">{selectedCharacter.appearances.books.length} appearances</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="font-semibold text-amber-300 mb-2">🎬 Movies</h5>
                      <p className="text-gray-300 text-sm">{selectedCharacter.appearances.movies.length} appearances</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelectedCharacter(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Characters;
