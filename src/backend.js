/*
===============================================================================
                    SPELLACADEMIA BACKEND ARCHITECTURE
===============================================================================

This file contains the complete backend structure for SpellAcademia.
All code is commented out to keep the frontend lightweight.
Uncomment and implement when ready for full-stack development.

TECH STACK:
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

===============================================================================
*/

/*
// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spellaacademia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ============================================================================
//                               SCHEMAS
// ============================================================================

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  house: { 
    type: String, 
    enum: ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'],
    default: 'gryffindor'
  },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  avatar: { type: String, default: '' },
  joinedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  completedSpells: [String],
  favoriteCharacters: [String],
  visitedLocations: [String],
  achievements: [String],
  preferences: {
    soundEnabled: { type: Boolean, default: true },
    theme: { type: String, default: 'auto' },
    notifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

// Spell Progress Schema
const spellProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spellId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in minutes
  lastAttempt: { type: Date },
  xpEarned: { type: Number, default: 0 },
  completedAt: { type: Date },
  hints: {
    used: { type: Number, default: 0 },
    available: { type: Number, default: 3 }
  }
}, { timestamps: true });

// Character Interaction Schema
const characterInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  characterId: { type: String, required: true },
  interactionType: { 
    type: String, 
    enum: ['view', 'favorite', 'learn', 'quiz'], 
    required: true 
  },
  interactionData: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

// Journey Progress Schema
const journeyProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stepId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  unlockedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  xpEarned: { type: Number, default: 0 }
});

// Models
const User = mongoose.model('User', userSchema);
const SpellProgress = mongoose.model('SpellProgress', spellProgressSchema);
const CharacterInteraction = mongoose.model('CharacterInteraction', characterInteractionSchema);
const JourneyProgress = mongoose.model('JourneyProgress', journeyProgressSchema);

// ============================================================================
//                               MIDDLEWARE
// ============================================================================

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ============================================================================
//                            AUTHENTICATION ROUTES
// ============================================================================

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, house } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      house: house || 'gryffindor'
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        house: user.house,
        level: user.level,
        xp: user.xp
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        house: user.house,
        level: user.level,
        xp: user.xp,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
//                               USER ROUTES
// ============================================================================

// Get User Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User Profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { name, house, preferences } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (house) user.house = house;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Progress
app.get('/api/user/progress', authenticateToken, async (req, res) => {
  try {
    const spellProgress = await SpellProgress.find({ userId: req.user.userId });
    const journeyProgress = await JourneyProgress.find({ userId: req.user.userId });
    
    res.json({
      spellProgress,
      journeyProgress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
//                               SPELL ROUTES
// ============================================================================

// Get All Spells
app.get('/api/spells', async (req, res) => {
  try {
    // This would typically come from a database or static file
    const spells = [
      {
        id: 'html-basics',
        name: 'HTML Fundamentals',
        topic: 'HTML',
        description: 'Learn the building blocks of the web',
        difficulty: 'beginner',
        xpReward: 100,
        house: 'gryffindor',
        estimatedTime: '30 minutes'
      },
      {
        id: 'css-styling',
        name: 'CSS Styling Magic',
        topic: 'CSS',
        description: 'Master the art of visual design',
        difficulty: 'beginner',
        xpReward: 150,
        house: 'ravenclaw',
        estimatedTime: '45 minutes'
      },
      {
        id: 'js-basics',
        name: 'JavaScript Enchantments',
        topic: 'JavaScript',
        description: 'Bring your web pages to life',
        difficulty: 'intermediate',
        xpReward: 200,
        house: 'slytherin',
        estimatedTime: '60 minutes'
      }
    ];
    
    res.json(spells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Spell by ID
app.get('/api/spells/:spellId', async (req, res) => {
  try {
    const { spellId } = req.params;
    // In a real app, you'd fetch from database
    res.json({ message: `Spell ${spellId} details` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Spell Progress
app.post('/api/spells/:spellId/start', authenticateToken, async (req, res) => {
  try {
    const { spellId } = req.params;
    const userId = req.user.userId;

    let progress = await SpellProgress.findOne({ userId, spellId });
    
    if (!progress) {
      progress = new SpellProgress({
        userId,
        spellId,
        attempts: 1
      });
    } else {
      progress.attempts += 1;
    }
    
    progress.lastAttempt = new Date();
    await progress.save();

    res.json({ message: 'Spell started', progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete Spell
app.post('/api/spells/:spellId/complete', authenticateToken, async (req, res) => {
  try {
    const { spellId } = req.params;
    const { score, timeSpent } = req.body;
    const userId = req.user.userId;

    let progress = await SpellProgress.findOne({ userId, spellId });
    
    if (!progress) {
      progress = new SpellProgress({ userId, spellId });
    }

    progress.completed = true;
    progress.score = Math.max(progress.score, score); // Keep best score
    progress.completedAt = new Date();
    progress.timeSpent += timeSpent || 0;
    
    // Calculate XP based on score and difficulty
    const xpEarned = Math.floor(score * 2); // Simple XP calculation
    progress.xpEarned = xpEarned;

    await progress.save();

    // Update user XP and level
    const user = await User.findById(userId);
    user.xp += xpEarned;
    user.level = Math.floor(user.xp / 1000) + 1; // Level up every 1000 XP
    
    if (!user.completedSpells.includes(spellId)) {
      user.completedSpells.push(spellId);
    }
    
    await user.save();

    res.json({ 
      message: 'Spell completed successfully', 
      progress, 
      xpEarned,
      newLevel: user.level,
      totalXP: user.xp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
//                            CHARACTER ROUTES
// ============================================================================

// Get All Characters
app.get('/api/characters', async (req, res) => {
  try {
    const characters = [
      {
        id: 'harry',
        name: 'Harry Potter',
        house: 'gryffindor',
        description: 'The Boy Who Lived',
        story: 'Harry represents courage and determination in learning.'
      },
      {
        id: 'hermione',
        name: 'Hermione Granger',
        house: 'gryffindor',
        description: 'Brightest witch of her age',
        story: 'Hermione shows the importance of studying and understanding fundamentals.'
      },
      {
        id: 'ron',
        name: 'Ron Weasley',
        house: 'gryffindor',
        description: 'Loyal friend and brave wizard',
        story: 'Ron demonstrates the value of loyalty and teamwork in development.'
      }
    ];
    
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record Character Interaction
app.post('/api/characters/:characterId/interact', authenticateToken, async (req, res) => {
  try {
    const { characterId } = req.params;
    const { interactionType, interactionData } = req.body;
    const userId = req.user.userId;

    const interaction = new CharacterInteraction({
      userId,
      characterId,
      interactionType,
      interactionData
    });

    await interaction.save();

    res.json({ message: 'Interaction recorded', interaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
//                             JOURNEY ROUTES
// ============================================================================

// Get Journey Steps
app.get('/api/journey', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProgress = await JourneyProgress.find({ userId });
    
    const journeySteps = [
      {
        id: 'diagon-alley',
        title: 'Diagon Alley',
        description: 'Begin your magical journey',
        xpReward: 100,
        unlocked: true
      },
      {
        id: 'platform-nine',
        title: 'Platform 9¾',
        description: 'Board the Hogwarts Express',
        xpReward: 150,
        unlocked: false
      },
      {
        id: 'great-hall',
        title: 'The Great Hall',
        description: 'Join your house',
        xpReward: 200,
        unlocked: false
      }
    ];

    // Add progress data to steps
    const stepsWithProgress = journeySteps.map(step => {
      const progress = userProgress.find(p => p.stepId === step.id);
      return {
        ...step,
        completed: progress?.completed || false,
        completedAt: progress?.completedAt
      };
    });

    res.json(stepsWithProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete Journey Step
app.post('/api/journey/:stepId/complete', authenticateToken, async (req, res) => {
  try {
    const { stepId } = req.params;
    const userId = req.user.userId;

    let progress = await JourneyProgress.findOne({ userId, stepId });
    
    if (!progress) {
      progress = new JourneyProgress({ userId, stepId });
    }

    progress.completed = true;
    progress.completedAt = new Date();
    progress.xpEarned = 100; // Base XP for completing step

    await progress.save();

    // Update user XP
    const user = await User.findById(userId);
    user.xp += progress.xpEarned;
    user.level = Math.floor(user.xp / 1000) + 1;
    await user.save();

    res.json({ 
      message: 'Journey step completed', 
      progress,
      xpEarned: progress.xpEarned,
      newLevel: user.level
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
//                              ANALYTICS ROUTES
// ============================================================================

// Get User Analytics
app.get('/api/analytics/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const spellsCompleted = await SpellProgress.countDocuments({ 
      userId, 
      completed: true 
    });
    
    const totalTimeSpent = await SpellProgress.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$timeSpent' } } }
    ]);

    const averageScore = await SpellProgress.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), completed: true } },
      { $group: { _id: null, average: { $avg: '$score' } } }
    ]);

    res.json({
      spellsCompleted,
      totalTimeSpent: totalTimeSpent[0]?.total || 0,
      averageScore: Math.round(averageScore[0]?.average || 0),
      totalInteractions: await CharacterInteraction.countDocuments({ userId })
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
//                              ERROR HANDLING
// ============================================================================

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ============================================================================
//                              SERVER START
// ============================================================================

app.listen(PORT, () => {
  console.log(`SpellAcademia Backend running on port ${PORT}`);
  console.log(`Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/spellaacademia'}`);
});

module.exports = app;
*/

// ============================================================================
//                         FRONTEND DATA HELPERS
// ============================================================================

// For the lightweight frontend, we'll use local storage and mock data
export const mockBackend = {
  // User Management
  saveUserData: (userData) => {
    localStorage.setItem('spellAcademiaUser', JSON.stringify(userData));
  },
  
  getUserData: () => {
    const user = localStorage.getItem('spellAcademiaUser');
    return user ? JSON.parse(user) : {
      id: 'demo-user',
      name: 'Young Wizard',
      house: 'gryffindor',
      level: 1,
      xp: 0,
      joinedAt: new Date().toISOString()
    };
  },

  // Progress Management
  saveProgress: (progressData) => {
    localStorage.setItem('spellAcademiaProgress', JSON.stringify(progressData));
  },
  
  getProgress: () => {
    const progress = localStorage.getItem('spellAcademiaProgress');
    return progress ? JSON.parse(progress) : [];
  },

  // Mock API endpoints for frontend development
  api: {
    // Authentication
    register: async (userData) => {
      console.log('Mock API: Register user', userData);
      return { success: true, token: 'mock-jwt-token', user: userData };
    },

    login: async (credentials) => {
      console.log('Mock API: Login user', credentials);
      return { success: true, token: 'mock-jwt-token' };
    },

    // Spells
    getSpells: async () => {
      return [
        {
          id: 'html-basics',
          name: 'HTML Fundamentals',
          description: 'Learn the building blocks of the web',
          difficulty: 'beginner',
          xpReward: 100
        },
        {
          id: 'css-styling',
          name: 'CSS Styling Magic',
          description: 'Master the art of visual design',
          difficulty: 'beginner', 
          xpReward: 150
        },
        {
          id: 'js-basics',
          name: 'JavaScript Enchantments',
          description: 'Bring your web pages to life',
          difficulty: 'intermediate',
          xpReward: 200
        }
      ];
    },

    completeSpell: async (spellId, score) => {
      console.log('Mock API: Complete spell', spellId, score);
      return { success: true, xpEarned: score * 2 };
    },

    // Characters
    getCharacters: async () => {
      return [
        {
          id: 'harry',
          name: 'Harry Potter',
          house: 'gryffindor',
          description: 'The Boy Who Lived'
        },
        {
          id: 'hermione',
          name: 'Hermione Granger',
          house: 'gryffindor',
          description: 'Brightest witch of her age'
        },
        {
          id: 'ron',
          name: 'Ron Weasley',
          house: 'gryffindor',
          description: 'Loyal friend and brave wizard'
        }
      ];
    },

    // Journey
    getJourneySteps: async () => {
      return [
        {
          id: 'diagon-alley',
          title: 'Diagon Alley',
          description: 'Begin your magical journey',
          completed: false,
          unlocked: true
        },
        {
          id: 'platform-nine',
          title: 'Platform 9¾',
          description: 'Board the Hogwarts Express',
          completed: false,
          unlocked: false
        }
      ];
    }
  }
};
