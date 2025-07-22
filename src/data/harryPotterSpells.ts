export interface HarryPotterSpell {
  id: string;
  name: string;
  pronunciation?: string;
  incantation: string;
  type: 'charm' | 'transfiguration' | 'hex' | 'curse' | 'jinx' | 'counter-spell' | 'healing';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  effect: string;
  description: string;
  wandMovement?: string;
  creator?: string;
  firstAppearance: string;
  notableUsers: string[];
  etymology?: string;
  trivia: string[];
  relatedSpells?: string[];
  isUnforgivable?: boolean;
  requiresPermit?: boolean;
}

export const harryPotterSpells: HarryPotterSpell[] = [
  {
    id: 'expelliarmus',
    name: 'Disarming Charm',
    pronunciation: 'ex-PEL-ee-AR-mus',
    incantation: 'Expelliarmus',
    type: 'charm',
    difficulty: 'beginner',
    effect: 'Disarms opponent by forcing them to release whatever they are holding',
    description: 'A defensive charm that causes the target to release whatever they are holding, most commonly used to disarm an opponent of their wand.',
    wandMovement: 'Flick wand towards target',
    firstAppearance: 'Chamber of Secrets',
    notableUsers: ['Harry Potter', 'Severus Snape', 'Gilderoy Lockhart'],
    etymology: 'From Latin "expellere" meaning "to drive out" and "arma" meaning "weapons"',
    trivia: [
      'Harry Potter\'s signature spell',
      'Can be powerful enough to knock someone backwards',
      'Used to defeat Voldemort in their final duel'
    ],
    relatedSpells: ['protego', 'stupefy']
  },
  {
    id: 'avada-kedavra',
    name: 'Killing Curse',
    pronunciation: 'uh-VAH-də kə-DAV-rə',
    incantation: 'Avada Kedavra',
    type: 'curse',
    difficulty: 'expert',
    effect: 'Instantly kills the target',
    description: 'One of the three Unforgivable Curses, this spell causes instant death with no known counter-curse.',
    creator: 'Unknown, ancient dark magic',
    firstAppearance: 'Goblet of Fire',
    notableUsers: ['Lord Voldemort', 'Death Eaters', 'Barty Crouch Jr.'],
    etymology: 'Derived from Aramaic "abra kadabra" meaning "let the thing be destroyed"',
    trivia: [
      'Leaves no trace of physical damage',
      'Requires genuine intent to kill',
      'Harry Potter is the only known survivor',
      'Produces a flash of green light'
    ],
    isUnforgivable: true,
    requiresPermit: true
  },
  {
    id: 'expecto-patronum',
    name: 'Patronus Charm',
    pronunciation: 'ex-PEK-toh pah-TROH-num',
    incantation: 'Expecto Patronum',
    type: 'charm',
    difficulty: 'advanced',
    effect: 'Conjures a silvery guardian that repels Dark creatures',
    description: 'An advanced charm that conjures a positive energy force known as a Patronus, which can repel Dementors and other Dark creatures.',
    wandMovement: 'Smooth, fluid motion',
    firstAppearance: 'Prisoner of Azkaban',
    notableUsers: ['Harry Potter', 'Severus Snape', 'Remus Lupin', 'Hermione Granger'],
    etymology: 'From Latin "expecto" meaning "I await" and "patronus" meaning "protector"',
    trivia: [
      'Requires focusing on a powerfully happy memory',
      'Takes the form of an animal significant to the caster',
      'Can be used to send messages',
      'Snape\'s Patronus was a doe, same as Lily Potter\'s'
    ],
    relatedSpells: ['lumos', 'protego']
  },
  {
    id: 'alohomora',
    name: 'Unlocking Charm',
    pronunciation: 'ah-LOH-ho-MOR-ah',
    incantation: 'Alohomora',
    type: 'charm',
    difficulty: 'beginner',
    effect: 'Unlocks doors and windows',
    description: 'A simple charm that can unlock most mechanical locks, though it has no effect on magically sealed doors.',
    wandMovement: 'Tap lock while speaking incantation',
    creator: 'Eldon Elsrickle',
    firstAppearance: 'Philosopher\'s Stone',
    notableUsers: ['Hermione Granger', 'Harry Potter', 'Most Hogwarts students'],
    etymology: 'Hawaiian "aloha" meaning "farewell" and Latin "mora" meaning "obstacle"',
    trivia: [
      'One of the first spells learned by most students',
      'Invented in the 17th century',
      'Cannot open magically protected locks',
      'Hermione used it to free Harry and Ron from a locked room'
    ],
    relatedSpells: ['colloportus', 'impervius']
  },
  {
    id: 'wingardium-leviosa',
    name: 'Levitation Charm',
    pronunciation: 'win-GAR-dee-um levi-O-sa',
    incantation: 'Wingardium Leviosa',
    type: 'charm',
    difficulty: 'beginner',
    effect: 'Makes objects float and fly',
    description: 'A fundamental charm that allows the caster to make objects levitate and move through the air.',
    wandMovement: 'Swish and flick',
    firstAppearance: 'Philosopher\'s Stone',
    notableUsers: ['Hermione Granger', 'Harry Potter', 'Ron Weasley'],
    etymology: 'From English "wing", Latin "arduus" meaning "steep", and "levis" meaning "light"',
    trivia: [
      'Famous for Hermione\'s pronunciation correction',
      'First spell successfully performed by first-year students',
      'Used to defeat a mountain troll',
      'Requires precise wand movement and pronunciation'
    ],
    relatedSpells: ['mobiliarbus', 'locomotor']
  },
  {
    id: 'stupefy',
    name: 'Stunning Spell',
    pronunciation: 'STOO-puh-fye',
    incantation: 'Stupefy',
    type: 'charm',
    difficulty: 'intermediate',
    effect: 'Renders target unconscious',
    description: 'A spell that renders the target unconscious, used frequently by both Dark wizards and Aurors.',
    wandMovement: 'Sharp jab towards target',
    firstAppearance: 'Goblet of Fire',
    notableUsers: ['Harry Potter', 'Hermione Granger', 'Aurors', 'Order of the Phoenix'],
    etymology: 'From Latin "stupefacere" meaning "to stun"',
    trivia: [
      'Produces a jet of red light',
      'Multiple stunners can be fatal',
      'Can be reversed with "Rennervate"',
      'Commonly used in dueling'
    ],
    relatedSpells: ['petrificus-totalus', 'expelliarmus', 'rennervate']
  },
  {
    id: 'crucio',
    name: 'Cruciatus Curse',
    pronunciation: 'KROO-see-oh',
    incantation: 'Crucio',
    type: 'curse',
    difficulty: 'expert',
    effect: 'Inflicts excruciating pain',
    description: 'One of the three Unforgivable Curses, it causes intense pain without physical damage.',
    firstAppearance: 'Goblet of Fire',
    notableUsers: ['Lord Voldemort', 'Bellatrix Lestrange', 'Barty Crouch Jr.'],
    etymology: 'From Latin "crucio" meaning "I torture"',
    trivia: [
      'Can cause permanent mental damage if used extensively',
      'Requires genuine desire to cause pain',
      'Used to torture Frank and Alice Longbottom into insanity',
      'Harry briefly used it on Bellatrix Lestrange'
    ],
    isUnforgivable: true,
    requiresPermit: true
  },
  {
    id: 'imperio',
    name: 'Imperius Curse',
    pronunciation: 'im-PEER-ee-oh',
    incantation: 'Imperio',
    type: 'curse',
    difficulty: 'expert',
    effect: 'Controls the actions of the target',
    description: 'One of the three Unforgivable Curses, it allows the caster to control the actions of the target.',
    firstAppearance: 'Goblet of Fire',
    notableUsers: ['Lord Voldemort', 'Barty Crouch Jr.', 'Harry Potter'],
    etymology: 'From Latin "impero" meaning "I command"',
    trivia: [
      'Can be resisted with strong will',
      'Harry Potter was able to resist it',
      'Used extensively by Death Eaters during both wars',
      'Leaves the victim with little to no memory of their actions'
    ],
    isUnforgivable: true,
    requiresPermit: true
  },
  {
    id: 'protego',
    name: 'Shield Charm',
    pronunciation: 'pro-TAY-go',
    incantation: 'Protego',
    type: 'charm',
    difficulty: 'intermediate',
    effect: 'Creates a magical barrier that deflects spells',
    description: 'A defensive charm that creates an invisible magical barrier in front of the caster, deflecting spells and physical objects.',
    wandMovement: 'Raise wand defensively',
    firstAppearance: 'Goblet of Fire',
    notableUsers: ['Harry Potter', 'Hermione Granger', 'Severus Snape'],
    etymology: 'From Latin "protego" meaning "I protect"',
    trivia: [
      'Can reflect spells back at the attacker',
      'Strength depends on the caster\'s skill',
      'Cannot block Unforgivable Curses',
      'Advanced version is "Protego Totalum"'
    ],
    relatedSpells: ['protego-totalum', 'protego-horribilis']
  },
  {
    id: 'lumos',
    name: 'Wand-Lighting Charm',
    pronunciation: 'LOO-mos',
    incantation: 'Lumos',
    type: 'charm',
    difficulty: 'beginner',
    effect: 'Creates light at the tip of the wand',
    description: 'A simple charm that illuminates the tip of the caster\'s wand, providing light in dark places.',
    wandMovement: 'Gentle upward flick',
    firstAppearance: 'Chamber of Secrets',
    notableUsers: ['Harry Potter', 'Hermione Granger', 'Most wizards'],
    etymology: 'From Latin "lumen" meaning "light"',
    trivia: [
      'Counter-charm is "Nox"',
      'Brightness can be adjusted by the caster',
      'One of the most commonly used spells',
      'Can be used by underage wizards in emergencies'
    ],
    relatedSpells: ['nox', 'lumos-maxima', 'lumos-solem']
  },
  {
    id: 'accio',
    name: 'Summoning Charm',
    pronunciation: 'AH-see-oh',
    incantation: 'Accio',
    type: 'charm',
    difficulty: 'intermediate',
    effect: 'Summons objects to the caster',
    description: 'A charm that causes an object to fly directly to the caster, even from great distances.',
    wandMovement: 'Point wand at desired object',
    firstAppearance: 'Goblet of Fire',
    notableUsers: ['Harry Potter', 'Hermione Granger', 'Most trained wizards'],
    etymology: 'From Latin "accio" meaning "I summon"',
    trivia: [
      'Harry used it to summon his Firebolt during the Triwizard Tournament',
      'Cannot summon living beings',
      'Objects can be summoned from great distances',
      'Requires clear visualization of the desired object'
    ],
    relatedSpells: ['depulso', 'mobiliarbus']
  },
  {
    id: 'sectumsempra',
    name: 'Sectumsempra',
    pronunciation: 'sec-tum-SEM-pra',
    incantation: 'Sectumsempra',
    type: 'curse',
    difficulty: 'advanced',
    effect: 'Causes deep cuts and gashes',
    description: 'A dark spell that inflicts deep, sword-like cuts on the target, causing severe bleeding.',
    creator: 'Severus Snape',
    firstAppearance: 'Half-Blood Prince',
    notableUsers: ['Harry Potter', 'Severus Snape'],
    etymology: 'From Latin "sectum" meaning "cut" and "sempra" meaning "always"',
    trivia: [
      'Created by Severus Snape as a teenager',
      'Counter-curse is known by Snape',
      'Harry used it on Draco Malfoy without knowing its effects',
      'Intended for enemies, particularly James Potter'
    ],
    relatedSpells: ['vulnera-sanentur', 'diffindo']
  },
  {
    id: 'obliviate',
    name: 'Memory Charm',
    pronunciation: 'oh-BLIV-ee-ate',
    incantation: 'Obliviate',
    type: 'charm',
    difficulty: 'advanced',
    effect: 'Erases or modifies memories',
    description: 'A complex charm used to erase or modify specific memories from the target\'s mind.',
    wandMovement: 'Complex spiral motion',
    firstAppearance: 'Chamber of Secrets',
    notableUsers: ['Gilderoy Lockhart', 'Hermione Granger', 'Ministry officials'],
    etymology: 'From Latin "obliviscor" meaning "to forget"',
    trivia: [
      'Extensively used by Ministry to maintain the Statute of Secrecy',
      'Can backfire if performed incorrectly',
      'Hermione used it on her parents before going into hiding',
      'Gilderoy Lockhart\'s specialty before his memory was damaged'
    ],
    relatedSpells: ['confundus', 'legilimens']
  }
];

export const getSpellsByDifficulty = (difficulty: string) => {
  return harryPotterSpells.filter(spell => spell.difficulty === difficulty);
};

export const getSpellsByType = (type: string) => {
  return harryPotterSpells.filter(spell => spell.type === type);
};

export const getUnforgivableCurses = () => {
  return harryPotterSpells.filter(spell => spell.isUnforgivable);
};

export const searchSpells = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return harryPotterSpells.filter(spell => 
    spell.name.toLowerCase().includes(lowercaseQuery) ||
    spell.incantation.toLowerCase().includes(lowercaseQuery) ||
    spell.effect.toLowerCase().includes(lowercaseQuery) ||
    spell.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getSpellById = (id: string) => {
  return harryPotterSpells.find(spell => spell.id === id);
};
