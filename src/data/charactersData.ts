export interface Character {
  id: string;
  name: string;
  house?: 'gryffindor' | 'hufflepuff' | 'ravenclaw' | 'slytherin';
  bloodStatus: 'pureblood' | 'halfblood' | 'muggleborn' | 'muggle' | 'unknown';
  role: 'student' | 'professor' | 'auror' | 'ministry' | 'death_eater' | 'order_member' | 'other';
  yearOfBirth?: number;
  patronus?: string;
  boggart?: string;
  wand?: {
    wood: string;
    core: string;
    length: string;
  };
  description: string;
  imageUrl: string;
  quotes: string[];
  facts: string[];
  relationships: {
    character: string;
    relationship: string;
  }[];
  appearances: {
    books: string[];
    movies: string[];
  };
  actor?: string;
  theme?: string; // Music theme identifier
}

export const charactersData: Character[] = [
  {
    id: 'harry-potter',
    name: 'Harry James Potter',
    house: 'gryffindor',
    bloodStatus: 'halfblood',
    role: 'student',
    yearOfBirth: 1980,
    patronus: 'Stag',
    boggart: 'Dementor',
    wand: {
      wood: 'Holly',
      core: 'Phoenix feather',
      length: '11 inches'
    },
    description: 'The Boy Who Lived, the Chosen One who defeated the Dark Lord Voldemort. Harry Potter is known for his lightning bolt scar, round glasses, and extraordinary courage.',
    imageUrl: '/images/characters/harry-potter.jpg',
    quotes: [
      "I don't think you're a waste of space.",
      "We've all got both light and dark inside us. What matters is the part we choose to act on.",
      "Expelliarmus!"
    ],
    facts: [
      'Can speak Parseltongue',
      'Youngest Seeker in a century at Hogwarts',
      'Survived the Killing Curse as a baby',
      'Master of the Elder Wand'
    ],
    relationships: [
      { character: 'ron-weasley', relationship: 'Best Friend' },
      { character: 'hermione-granger', relationship: 'Best Friend' },
      { character: 'ginny-weasley', relationship: 'Wife' },
      { character: 'voldemort', relationship: 'Nemesis' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Daniel Radcliffe',
    theme: 'hedwigs-theme'
  },
  {
    id: 'hermione-granger',
    name: 'Hermione Jean Granger',
    house: 'gryffindor',
    bloodStatus: 'muggleborn',
    role: 'student',
    yearOfBirth: 1979,
    patronus: 'Otter',
    boggart: 'Professor McGonagall telling her she failed everything',
    wand: {
      wood: 'Vine',
      core: 'Dragon heartstring',
      length: '10¾ inches'
    },
    description: 'The brightest witch of her age, known for her intelligence, logical thinking, and fierce loyalty to her friends.',
    imageUrl: '/images/characters/hermione-granger.jpg',
    quotes: [
      "It's wingardium leviOsa, not leviosAH!",
      "Books! And cleverness! There are more important things, but friendship and bravery.",
      "I'm going to bed before either of you come up with another clever idea to get us killed or worse, expelled."
    ],
    facts: [
      'Founded S.P.E.W (Society for the Promotion of Elfish Welfare)',
      'Can produce a corporeal Patronus',
      'Used Time-Turner in her third year',
      'Became Minister for Magic'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Best Friend' },
      { character: 'ron-weasley', relationship: 'Husband' },
      { character: 'crookshanks', relationship: 'Pet Owner' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Emma Watson',
    theme: 'hermiones-theme'
  },
  {
    id: 'ron-weasley',
    name: 'Ronald Bilius Weasley',
    house: 'gryffindor',
    bloodStatus: 'pureblood',
    role: 'student',
    yearOfBirth: 1980,
    patronus: 'Jack Russell Terrier',
    boggart: 'Spiders',
    wand: {
      wood: 'Willow',
      core: 'Unicorn hair',
      length: '14 inches'
    },
    description: 'Harry Potter\'s loyal best friend, known for his humor, bravery, and strategic mind, especially in Wizard\'s Chess.',
    imageUrl: '/images/characters/ron-weasley.jpg',
    quotes: [
      "Bloody hell!",
      "She needs to sort out her priorities!",
      "Don't let the Muggles get you down!"
    ],
    facts: [
      'Excellent at Wizard\'s Chess',
      'Has arachnophobia (fear of spiders)',
      'Sixth child of the Weasley family',
      'Became an Auror with Harry'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Best Friend' },
      { character: 'hermione-granger', relationship: 'Wife' },
      { character: 'arthur-weasley', relationship: 'Father' },
      { character: 'molly-weasley', relationship: 'Mother' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Rupert Grint',
    theme: 'weasley-theme'
  },
  {
    id: 'albus-dumbledore',
    name: 'Albus Percival Wulfric Brian Dumbledore',
    house: 'gryffindor',
    bloodStatus: 'halfblood',
    role: 'professor',
    yearOfBirth: 1881,
    patronus: 'Phoenix',
    wand: {
      wood: 'Elder',
      core: 'Thestral tail hair',
      length: '15 inches'
    },
    description: 'The greatest wizard of his time, Headmaster of Hogwarts, and leader of the Order of the Phoenix.',
    imageUrl: '/images/characters/albus-dumbledore.jpg',
    quotes: [
      "It is our choices, Harry, that show what we truly are, far more than our abilities.",
      "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
      "After all this time? Always."
    ],
    facts: [
      'Discovered the twelve uses of dragon\'s blood',
      'Former owner of the Elder Wand',
      'Defeated Grindelwald in 1945',
      'Founded the Order of the Phoenix'
    ],
    relationships: [
      { character: 'gellert-grindelwald', relationship: 'Former Friend/Enemy' },
      { character: 'severus-snape', relationship: 'Colleague/Ally' },
      { character: 'minerva-mcgonagall', relationship: 'Deputy' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['Films 1-6, 8']
    },
    actor: 'Richard Harris / Michael Gambon',
    theme: 'dumbledores-theme'
  },
  {
    id: 'severus-snape',
    name: 'Severus Snape',
    house: 'slytherin',
    bloodStatus: 'halfblood',
    role: 'professor',
    yearOfBirth: 1960,
    patronus: 'Doe',
    boggart: 'Unknown',
    wand: {
      wood: 'Unknown',
      core: 'Unknown',
      length: 'Unknown'
    },
    description: 'The Half-Blood Prince, Potions Master, and one of the most complex characters in the wizarding world.',
    imageUrl: '/images/characters/severus-snape.jpg',
    quotes: [
      "Always.",
      "You have your mother's eyes.",
      "Turn to page 394."
    ],
    facts: [
      'Former Death Eater turned spy',
      'Loved Lily Potter',
      'Invented many spells',
      'Protected Harry throughout his time at Hogwarts'
    ],
    relationships: [
      { character: 'lily-potter', relationship: 'Unrequited Love' },
      { character: 'james-potter', relationship: 'Enemy/Rival' },
      { character: 'voldemort', relationship: 'Former Master' },
      { character: 'albus-dumbledore', relationship: 'Ally' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Alan Rickman',
    theme: 'snapes-theme'
  },
  {
    id: 'voldemort',
    name: 'Tom Marvolo Riddle / Lord Voldemort',
    house: 'slytherin',
    bloodStatus: 'halfblood',
    role: 'other',
    yearOfBirth: 1926,
    wand: {
      wood: 'Yew',
      core: 'Phoenix feather',
      length: '13½ inches'
    },
    description: 'The Dark Lord, the most feared dark wizard of all time, who sought to conquer the wizarding world.',
    imageUrl: '/images/characters/voldemort.jpg',
    quotes: [
      "There is no good and evil, there is only power, and those too weak to seek it.",
      "Avada Kedavra!",
      "I am Lord Voldemort!"
    ],
    facts: [
      'Created seven Horcruxes to achieve immortality',
      'Cannot understand love',
      'Born as Tom Marvolo Riddle',
      'Killed Harry\'s parents'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Nemesis' },
      { character: 'nagini', relationship: 'Companion/Horcrux' },
      { character: 'bellatrix-lestrange', relationship: 'Follower' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['Films 1, 2, 4-8']
    },
    actor: 'Ralph Fiennes / Christian Coulson',
    theme: 'voldemorts-theme'
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Lucius Malfoy',
    house: 'slytherin',
    bloodStatus: 'pureblood',
    role: 'student',
    yearOfBirth: 1980,
    patronus: 'Unknown',
    boggart: 'Voldemort',
    wand: {
      wood: 'Hawthorn',
      core: 'Unicorn hair',
      length: '10 inches'
    },
    description: 'Harry\'s school rival, son of a Death Eater, who struggled with the expectations placed upon him.',
    imageUrl: '/images/characters/draco-malfoy.jpg',
    quotes: [
      "My father will hear about this!",
      "Potter! Is it true you fainted?",
      "I didn't know you could read."
    ],
    facts: [
      'Became a Death Eater at age 16',
      'Failed to kill Dumbledore',
      'Saved by Harry during the Battle of Hogwarts',
      'Married Astoria Greengrass'
    ],
    relationships: [
      { character: 'lucius-malfoy', relationship: 'Father' },
      { character: 'narcissa-malfoy', relationship: 'Mother' },
      { character: 'harry-potter', relationship: 'Rival' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Tom Felton',
    theme: 'malfoy-theme'
  },
  {
    id: 'luna-lovegood',
    name: 'Luna Lovegood',
    house: 'ravenclaw',
    bloodStatus: 'pureblood',
    role: 'student',
    yearOfBirth: 1981,
    patronus: 'Hare',
    wand: {
      wood: 'Unknown',
      core: 'Unknown',
      length: 'Unknown'
    },
    description: 'An eccentric and dreamy student known for her unique perspective on life and unwavering loyalty.',
    imageUrl: '/images/characters/luna-lovegood.jpg',
    quotes: [
      "You're just as sane as I am.",
      "Things we lose have a way of coming back to us in the end.",
      "I think they think I'm a bit odd, you know. Some people call me 'Loony' Lovegood, actually."
    ],
    facts: [
      'Can see Thestrals',
      'Believes in many magical creatures others dismiss',
      'Member of Dumbledore\'s Army',
      'Married Rolf Scamander'
    ],
    relationships: [
      { character: 'xenophilius-lovegood', relationship: 'Father' },
      { character: 'harry-potter', relationship: 'Friend' },
      { character: 'neville-longbottom', relationship: 'Friend' }
    ],
    appearances: {
      books: ['Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['Films 5-8']
    },
    actor: 'Evanna Lynch',
    theme: 'luna-theme'
  },
  {
    id: 'neville-longbottom',
    name: 'Neville Longbottom',
    house: 'gryffindor',
    bloodStatus: 'pureblood',
    role: 'student',
    yearOfBirth: 1980,
    patronus: 'Unknown',
    boggart: 'Severus Snape',
    wand: {
      wood: 'Cherry',
      core: 'Unicorn hair',
      length: '13 inches'
    },
    description: 'A brave Gryffindor who grew from a forgetful, clumsy boy into a courageous leader and hero.',
    imageUrl: '/images/characters/neville-longbottom.jpg',
    quotes: [
      "I'll join you when hell freezes over! Dumbledore's Army!",
      "The thing is, it helps when people stand up to them, it gives everyone hope.",
      "We're all going to keep fighting, Harry. You know that?"
    ],
    facts: [
      'Could have been the Chosen One',
      'Destroyed Nagini with Gryffindor\'s sword',
      'Led the resistance at Hogwarts',
      'Became Herbology Professor'
    ],
    relationships: [
      { character: 'frank-longbottom', relationship: 'Father' },
      { character: 'alice-longbottom', relationship: 'Mother' },
      { character: 'augusta-longbottom', relationship: 'Grandmother' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Matthew Lewis',
    theme: 'neville-theme'
  },
  {
    id: 'ginny-weasley',
    name: 'Ginevra Molly Weasley',
    house: 'gryffindor',
    bloodStatus: 'pureblood',
    role: 'student',
    yearOfBirth: 1981,
    patronus: 'Horse',
    wand: {
      wood: 'Unknown',
      core: 'Unknown',
      length: 'Unknown'
    },
    description: 'The youngest Weasley child and only daughter, known for her fierce independence and magical talent.',
    imageUrl: '/images/characters/ginny-weasley.jpg',
    quotes: [
      "The thing about growing up with Fred and George is that you sort of start thinking anything's possible if you've got enough nerve.",
      "I never really gave up on you. Not really. I always hoped...",
      "Shut it!"
    ],
    facts: [
      'Possessed by Tom Riddle\'s diary in her first year',
      'Played Quidditch for Gryffindor',
      'Member of Dumbledore\'s Army',
      'Married Harry Potter'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Husband' },
      { character: 'ron-weasley', relationship: 'Brother' },
      { character: 'arthur-weasley', relationship: 'Father' },
      { character: 'molly-weasley', relationship: 'Mother' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Bonnie Wright',
    theme: 'ginny-theme'
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Lucius Malfoy',
    house: 'slytherin',
    bloodStatus: 'pureblood',
    role: 'student',
    yearOfBirth: 1980,
    patronus: 'Unknown',
    boggart: 'Lord Voldemort',
    wand: {
      wood: 'Hawthorn',
      core: 'Unicorn hair',
      length: '10 inches'
    },
    description: 'A pure-blood wizard from a wealthy wizarding family, known for his rivalry with Harry Potter and his complex character development.',
    imageUrl: '/images/characters/draco-malfoy.jpg',
    quotes: [
      "My father will hear about this!",
      "Wait until my father hears about this!",
      "Potter!"
    ],
    facts: [
      'Death Eater (reluctantly)',
      'Seeker for Slytherin Quidditch team',
      'Failed to kill Dumbledore',
      'Saved by Harry Potter in the Room of Requirement'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Rival/Enemy' },
      { character: 'lucius-malfoy', relationship: 'Father' },
      { character: 'narcissa-malfoy', relationship: 'Mother' },
      { character: 'voldemort', relationship: 'Master (unwillingly)' }
    ],
    appearances: {
      books: ['Philosopher\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['All 8 films']
    },
    actor: 'Tom Felton',
    theme: 'draco-theme'
  },
  {
    id: 'severus-snape',
    name: 'Severus Snape',
    house: 'slytherin',
    bloodStatus: 'halfblood',
    role: 'professor',
    yearOfBirth: 1960,
    patronus: 'Doe',
    boggart: 'Unknown',
    wand: {
      wood: 'Unknown',
      core: 'Unknown',
      length: 'Unknown'
    },
    description: 'The Half-Blood Prince, Potions Master, and one of the most complex characters in the series.',
    imageUrl: '/images/characters/severus-snape.jpg',
    quotes: [
      "Always.",
      "Turn to page 394.",
      "You have your mother\'s eyes."
    ],
    facts: [
      'Created many spells including Sectumsempra',
      'Double agent during the Second Wizarding War',
      'Loved Lily Evans his entire life',
      'Killed Dumbledore on Dumbledore\'s orders'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Student/Complex' },
      { character: 'lily-evans', relationship: 'Childhood Friend/Love' },
      { character: 'dumbledore', relationship: 'Ally/Superior' },
      { character: 'voldemort', relationship: 'Spy Against' }
    ],
    appearances: {
      books: ['All books'],
      movies: ['All films']
    },
    actor: 'Alan Rickman',
    theme: 'snapes-theme'
  },
  {
    id: 'albus-dumbledore',
    name: 'Albus Percival Wulfric Brian Dumbledore',
    house: 'gryffindor',
    bloodStatus: 'halfblood',
    role: 'professor',
    yearOfBirth: 1881,
    patronus: 'Phoenix',
    boggart: 'His sister Ariana\'s corpse',
    wand: {
      wood: 'Elder',
      core: 'Thestral tail hair',
      length: '15 inches'
    },
    description: 'The greatest wizard of his time, Headmaster of Hogwarts, and mentor to Harry Potter.',
    imageUrl: '/images/characters/albus-dumbledore.jpg',
    quotes: [
      "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
      "It is our choices that show what we truly are, far more than our abilities.",
      "Of course it is happening inside your head, but why on earth should that mean that it is not real?"
    ],
    facts: [
      'Defeated Grindelwald in 1945',
      'Master of the Elder Wand',
      'Founder of the Order of the Phoenix',
      'Only wizard Voldemort ever feared'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Mentor' },
      { character: 'grindelwald', relationship: 'Former Friend/Enemy' },
      { character: 'severus-snape', relationship: 'Ally' },
      { character: 'voldemort', relationship: 'Enemy' }
    ],
    appearances: {
      books: ['All books (except died in book 6)'],
      movies: ['Films 1-6, 8']
    },
    actor: 'Richard Harris, Michael Gambon',
    theme: 'dumbledore-theme'
  },
  {
    id: 'rubeus-hagrid',
    name: 'Rubeus Hagrid',
    house: 'gryffindor',
    bloodStatus: 'halfblood',
    role: 'professor',
    yearOfBirth: 1928,
    patronus: 'Unknown',
    boggart: 'Unknown',
    wand: {
      wood: 'Oak',
      core: 'Unknown',
      length: '16 inches'
    },
    description: 'Keeper of Keys and Grounds at Hogwarts, half-giant with a love for magical creatures.',
    imageUrl: '/images/characters/rubeus-hagrid.jpg',
    quotes: [
      "You\'re a wizard, Harry!",
      "I shouldn\'t have said that. I should not have said that.",
      "What\'s comin\' will come, an\' we\'ll meet it when it does."
    ],
    facts: [
      'Half-giant',
      'Expelled from Hogwarts in his third year',
      'Loves dangerous magical creatures',
      'Member of the Order of the Phoenix'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Friend/Protector' },
      { character: 'dumbledore', relationship: 'Loyal Friend' },
      { character: 'hermione-granger', relationship: 'Student/Friend' },
      { character: 'ron-weasley', relationship: 'Student/Friend' }
    ],
    appearances: {
      books: ['All books'],
      movies: ['All films']
    },
    actor: 'Robbie Coltrane',
    theme: 'hagrid-theme'
  },
  {
    id: 'lord-voldemort',
    name: 'Tom Marvolo Riddle / Lord Voldemort',
    house: 'slytherin',
    bloodStatus: 'halfblood',
    role: 'death_eater',
    yearOfBirth: 1926,
    patronus: 'Cannot produce',
    boggart: 'His own corpse',
    wand: {
      wood: 'Yew',
      core: 'Phoenix feather',
      length: '13½ inches'
    },
    description: 'The Dark Lord, the most feared dark wizard of all time, seeking immortality and pure-blood supremacy.',
    imageUrl: '/images/characters/lord-voldemort.jpg',
    quotes: [
      "There is no good and evil, there is only power and those too weak to seek it.",
      "Avada Kedavra!",
      "I am Lord Voldemort!"
    ],
    facts: [
      'Created seven Horcruxes',
      'Born Tom Marvolo Riddle',
      'Cannot feel love',
      'Feared even by his own followers'
    ],
    relationships: [
      { character: 'harry-potter', relationship: 'Nemesis' },
      { character: 'dumbledore', relationship: 'Enemy' },
      { character: 'severus-snape', relationship: 'Death Eater (but spy)' },
      { character: 'draco-malfoy', relationship: 'Unwilling Servant' }
    ],
    appearances: {
      books: ['Chamber of Secrets', 'Goblet of Fire', 'Order of the Phoenix', 'Half-Blood Prince', 'Deathly Hallows'],
      movies: ['Films 2, 4-8']
    },
    actor: 'Ralph Fiennes, Christian Coulson',
    theme: 'voldemort-theme'
  }
];

export const getCharactersByHouse = (house: string) => {
  return charactersData.filter(character => character.house === house);
};

export const getCharacterById = (id: string) => {
  return charactersData.find(character => character.id === id);
};

export const searchCharacters = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return charactersData.filter(character => 
    character.name.toLowerCase().includes(lowercaseQuery) ||
    character.description.toLowerCase().includes(lowercaseQuery) ||
    character.quotes.some(quote => quote.toLowerCase().includes(lowercaseQuery))
  );
};
