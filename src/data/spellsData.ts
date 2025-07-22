import { Spell } from '../types';

export const spellsData: Spell[] = [
  {
    id: 'alohomora',
    name: 'Alohomora',
    topic: 'HTML Basics',
    description: 'Unlock the fundamental structure of the web with HTML magic',
    difficulty: 'beginner',
    xpReward: 100,
    house: 'gryffindor',
    icon: '🔓',
    estimatedTime: '45 min',
    content: {
      theory: `
        <h2>🏰 Welcome to the Ancient Art of HTML Magic!</h2>
        <p>Just as every magical spell requires proper incantation and structure, HTML provides the foundational framework that gives life to all web pages. Like the very architecture of Hogwarts castle, HTML creates the sturdy foundation upon which all web magic is built.</p>
        
        <h3>✨ What is HTML?</h3>
        <p>HTML (HyperText Markup Language) is the sacred language that instructs web browsers on how to display and structure content. Think of it as the ancient blueprints used by the founders of Hogwarts to create their magnificent castle.</p>
        
        <h3>🏛️ The Sacred Structure of HTML</h3>
        <ul>
          <li><strong>&lt;html&gt;</strong> - The grand hall that contains all magical elements</li>
          <li><strong>&lt;head&gt;</strong> - The wise mind of your webpage (metadata, title, magical links)</li>
          <li><strong>&lt;body&gt;</strong> - The visible realm where users witness your magic</li>
        </ul>
        
        <h3>📜 Essential HTML Incantations (Tags)</h3>
        <ul>
          <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings that command attention like chapter titles in ancient spellbooks</li>
          <li><strong>&lt;p&gt;</strong> - Paragraphs that weave stories and knowledge</li>
          <li><strong>&lt;div&gt;</strong> - Magical containers for organizing your spells</li>
          <li><strong>&lt;span&gt;</strong> - Precise inline containers for styling specific text portions</li>
          <li><strong>&lt;a&gt;</strong> - Portals that transport users to other magical realms</li>
          <li><strong>&lt;img&gt;</strong> - Windows that reveal images and bring your magic to life</li>
          <li><strong>&lt;ul&gt; & &lt;li&gt;</strong> - Lists that organize information like potion ingredients</li>
        </ul>

        <h3>🎭 Semantic HTML - The Art of Meaningful Magic</h3>
        <p>Just as different spells serve different purposes, HTML elements should be chosen based on their meaning, not just their appearance:</p>
        <ul>
          <li><strong>&lt;header&gt;</strong> - The grand entrance to your content</li>
          <li><strong>&lt;nav&gt;</strong> - The magical map for navigation</li>
          <li><strong>&lt;main&gt;</strong> - The heart of your content</li>
          <li><strong>&lt;section&gt;</strong> - Distinct chapters of your story</li>
          <li><strong>&lt;article&gt;</strong> - Self-contained pieces of content</li>
          <li><strong>&lt;footer&gt;</strong> - The closing ceremony of your page</li>
        </ul>
      `,
      example: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏰 Welcome to SpellAcademia</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #1e1b4b, #312e81);
            color: #e5e7eb;
            margin: 0;
            padding: 20px;
        }
        .spell-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.3);
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #fbbf24;
        }
        h1 { color: #fbbf24; text-align: center; }
        .magical-list { list-style: none; padding: 0; }
        .magical-list li { 
            padding: 10px; 
            margin: 5px 0; 
            background: rgba(147, 51, 234, 0.2);
            border-radius: 8px;
            border-left: 4px solid #a855f7;
        }
    </style>
</head>
<body>
    <header class="spell-container">
        <h1>⚡ Welcome to SpellAcademia! ⚡</h1>
        <p>Here you'll master the ancient arts of web development through magical spells and enchantments.</p>
        
        <nav>
            <h2>🧭 Navigation Spells</h2>
            <ul class="magical-list">
                <li><a href="#spells" style="color: #fbbf24;">📚 Available Spells</a></li>
                <li><a href="#progress" style="color: #fbbf24;">📈 Your Progress</a></li>
                <li><a href="#spellbook" style="color: #fbbf24;">📖 Personal Spellbook</a></li>
            </ul>
        </nav>
        
        <main>
            <section id="spells">
                <h2>🔮 Today's Featured Spell: Alohomora</h2>
                <article>
                    <p>This powerful unlocking spell opens doors to web development mastery, just like HTML unlocks the structure of the web!</p>
                    
                    <h3>✨ What You'll Learn:</h3>
                    <ul class="magical-list">
                        <li>🏗️ HTML document structure and anatomy</li>
                        <li>📝 Essential HTML tags and their magical properties</li>
                        <li>🎯 Semantic HTML for meaningful content</li>
                        <li>🔗 Creating links and embedding images</li>
                    </ul>
                </article>
            </section>
            
            <section id="practice">
                <h2>⚗️ Practice Your Magic</h2>
                <p>Try creating your own HTML spell below:</p>
                <div style="background: #1f2937; padding: 20px; border-radius: 10px; border: 1px solid #6b7280;">
                    <code style="color: #10b981;">
                        &lt;div class="my-first-spell"&gt;<br>
                        &nbsp;&nbsp;&lt;h3&gt;My Magical Creation&lt;/h3&gt;<br>
                        &nbsp;&nbsp;&lt;p&gt;I am learning HTML magic!&lt;/p&gt;<br>
                        &lt;/div&gt;
                    </code>
                </div>
            </section>
        </main>
        
        <footer>
            <p style="text-align: center; color: #a855f7; font-style: italic;">
                "It is our choices that show what we truly are, far more than our abilities." - Albus Dumbledore
            </p>
        </footer>
    </header>
</body>
</html>
      `,
      practice: `🎯 **Your HTML Spell Challenge:**

Create a magical HTML page about your coding journey with the following elements:

**Required Incantations:**
1. Start with proper DOCTYPE and HTML structure
2. Add a meaningful title in the head section
3. Create a header with your name as an h1
4. Write a paragraph about why you want to learn web development
5. Make an unordered list of 3 programming languages you're interested in
6. Add a section with an h2 titled "My Coding Goals"
7. Include at least one link to a helpful coding resource
8. Add an image that inspires you (use a placeholder URL)
9. Create a footer with a motivational quote

**Bonus Magic:**
- Use semantic HTML elements (header, main, section, footer)
- Add some inline styles to make it look magical
- Include HTML comments to explain your code

**Spell Cauldron Instructions:**
Write your HTML in the editor below and watch your magic come to life!`,
      quiz: [
        {
          id: '1',
          question: 'What does HTML stand for in the magical world of web development?',
          options: [
            'Hyper Transfer Markup Language',
            'HyperText Markup Language',
            'High Tech Modern Language',
            'Hogwarts Teaching Markup Language'
          ],
          correctAnswer: 1,
          explanation: 'HTML stands for HyperText Markup Language. It\'s the foundational language that structures all web content, much like how spells have specific incantations and structures.',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'Which HTML tag creates the largest and most powerful heading spell?',
          options: ['<h6>', '<h3>', '<h1>', '<header>'],
          correctAnswer: 2,
          explanation: '<h1> creates the largest heading and should be used for the main title of your page, like the title of a powerful spell in an ancient grimoire.',
          difficulty: 'easy'
        },
        {
          id: '3',
          question: 'What is the correct way to create a magical portal (link) in HTML?',
          options: [
            '<link href="url">Portal Text</link>',
            '<a href="url">Portal Text</a>',
            '<portal>Portal Text</portal>',
            '<href="url">Portal Text</href>'
          ],
          correctAnswer: 1,
          explanation: 'The <a> tag with the href attribute creates hyperlinks - magical portals that transport users to other pages or locations.',
          difficulty: 'easy'
        },
        {
          id: '4',
          question: 'Which element represents the visible body of your magical webpage?',
          options: ['<head>', '<html>', '<body>', '<main>'],
          correctAnswer: 2,
          explanation: 'The <body> element contains all the visible content that users see and interact with on your webpage - it\'s where your magic comes to life!',
          difficulty: 'medium'
        },
        {
          id: '5',
          question: 'What makes HTML "semantic" and why is it important for web wizards?',
          options: [
            'Using tags based on their visual appearance',
            'Using tags based on their meaning and purpose',
            'Using only div and span elements',
            'Using inline styles for everything'
          ],
          correctAnswer: 1,
          explanation: 'Semantic HTML means choosing elements based on their meaning rather than appearance. This makes your code more accessible, SEO-friendly, and easier for other wizards to understand.',
          difficulty: 'medium'
        }
      ],
      magicalFacts: [
        "🏰 The first website ever created is still online at info.cern.ch - it's like the first spell ever cast!",
        "📜 HTML was created by Tim Berners-Lee in 1990, making him the Merlin of the web world",
        "🔮 There are over 100 HTML elements, but you only need to master about 20 for most magical web creations",
        "⚡ The HTML5 specification is over 1,000 pages long - that's one massive spellbook!",
        "🎭 Semantic HTML helps screen readers and search engines understand your content better"
      ]
    }
  },
  {
    id: 'lumos',
    name: 'Lumos',
    topic: 'CSS Selectors',
    description: 'Illuminate your pages with the precise targeting power of CSS selectors',
    difficulty: 'beginner',
    xpReward: 120,
    house: 'ravenclaw',
    icon: '💡',
    estimatedTime: '50 min',
    content: {
      theory: `
        <h2>💡 Lumos: Illuminating the Web with CSS Selectors!</h2>
        <p>Just as the Lumos spell creates light to reveal hidden secrets in dark places, CSS selectors help you target and illuminate specific elements on your webpage, bringing beauty and style to your HTML structure with surgical precision.</p>
        
        <h3>🎯 What are CSS Selectors?</h3>
        <p>CSS selectors are magical patterns that allow you to choose exactly which HTML elements you want to enchant with styles. They're like precise targeting spells that can find any element in your webpage, no matter how deeply nested or specifically positioned.</p>
        
        <h3>⚡ Basic Selector Spells</h3>
        <ul>
          <li><strong>Element Selector</strong> - Targets all elements of a specific type (p, h1, div)</li>
          <li><strong>Class Selector (.)</strong> - Targets elements with a specific class attribute</li>
          <li><strong>ID Selector (#)</strong> - Targets a unique element with a specific ID</li>
          <li><strong>Universal Selector (*)</strong> - The most powerful spell that targets ALL elements</li>
        </ul>
        
        <h3>🔮 Advanced Selector Enchantments</h3>
        <ul>
          <li><strong>Descendant Selector (space)</strong> - Targets elements nested inside others (div p)</li>
          <li><strong>Child Selector (>)</strong> - Targets direct children only (div > p)</li>
          <li><strong>Adjacent Sibling (+)</strong> - Targets the next sibling element (h1 + p)</li>
          <li><strong>General Sibling (~)</strong> - Targets all following siblings (h1 ~ p)</li>
        </ul>

        <h3>✨ Pseudo-Class Magic</h3>
        <p>These special selectors target elements in specific states or positions:</p>
        <ul>
          <li><strong>:hover</strong> - When a user hovers over an element</li>
          <li><strong>:focus</strong> - When an element has keyboard focus</li>
          <li><strong>:first-child</strong> - The first child element</li>
          <li><strong>:last-child</strong> - The last child element</li>
          <li><strong>:nth-child(n)</strong> - The nth child element</li>
          <li><strong>:not(selector)</strong> - Elements that don't match the selector</li>
        </ul>

        <h3>🎭 Attribute Selector Spells</h3>
        <p>Target elements based on their attributes:</p>
        <ul>
          <li><strong>[attribute]</strong> - Elements with the attribute</li>
          <li><strong>[attribute="value"]</strong> - Elements with exact attribute value</li>
          <li><strong>[attribute*="value"]</strong> - Elements containing the value</li>
          <li><strong>[attribute^="value"]</strong> - Elements starting with the value</li>
          <li><strong>[attribute$="value"]</strong> - Elements ending with the value</li>
        </ul>
      `,
      example: `
/* 🎯 Element Selector - Styles all paragraphs */
p {
    color: #e4e4e7;
    font-family: 'Georgia', serif;
    line-height: 1.8;
    margin-bottom: 1rem;
}

/* ✨ Class Selector - Styles elements with class="magic-text" */
.magic-text {
    color: #fbbf24;
    text-shadow: 0 0 10px #fbbf24, 0 0 20px #f59e0b;
    font-weight: bold;
    animation: glow 2s ease-in-out infinite alternate;
}

/* 🏰 ID Selector - Styles the element with id="main-title" */
#main-title {
    font-size: 3rem;
    color: #a855f7;
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, #8b5cf6, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* 🔮 Descendant Selector - Styles spans inside .spell-container */
.spell-container span {
    background: linear-gradient(45deg, #8b5cf6, #a855f7);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: white;
    font-weight: bold;
}

/* ⚡ Child Selector - Direct children only */
.spell-list > li {
    background: rgba(147, 51, 234, 0.2);
    border-left: 4px solid #a855f7;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 8px;
}

/* 🎭 Pseudo-class Magic - Hover effects */
.spell-button:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
    background: linear-gradient(45deg, #7c3aed, #8b5cf6);
    cursor: pointer;
    transition: all 0.3s ease;
}

/* 🌟 Advanced Pseudo-selectors */
.spell-list li:first-child {
    border-top: 3px solid #fbbf24;
    font-weight: bold;
}

.spell-list li:nth-child(even) {
    background: rgba(251, 191, 36, 0.1);
}

.spell-list li:last-child {
    border-bottom: 3px solid #10b981;
}

/* 🎯 Attribute Selectors */
input[type="text"] {
    border: 2px solid #8b5cf6;
    border-radius: 8px;
    padding: 0.75rem;
    background: rgba(30, 27, 75, 0.3);
    color: white;
    font-family: 'Georgia', serif;
}

input[type="text"]:focus {
    border-color: #fbbf24;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2);
    outline: none;
}

/* 🔥 Complex Selector Combinations */
.spell-container .magic-text:hover:not(.disabled) {
    transform: rotate(2deg) scale(1.1);
    text-shadow: 0 0 20px #fbbf24, 0 0 40px #f59e0b;
}

/* ✨ Animation for magical effects */
@keyframes glow {
    from { text-shadow: 0 0 10px #fbbf24; }
    to { text-shadow: 0 0 20px #fbbf24, 0 0 30px #f59e0b; }
}

/* 🌙 Responsive Magic */
@media (max-width: 768px) {
    .spell-container {
        padding: 1rem;
        margin: 0.5rem;
    }
    
    #main-title {
        font-size: 2rem;
    }
}
      `,
      practice: `🎯 **Your CSS Selector Spell Challenge:**

Create a magical spell list with advanced CSS selector targeting:

**HTML Structure to Style:**
\`\`\`html
<div class="spellbook">
    <h1 id="spellbook-title">My Magical Spellbook</h1>
    <ul class="spell-list">
        <li class="spell beginner">Alohomora - HTML Basics</li>
        <li class="spell beginner">Lumos - CSS Selectors</li>
        <li class="spell intermediate">Incendio - Flexbox Magic</li>
        <li class="spell advanced">Expecto Patronum - JavaScript</li>
    </ul>
    <div class="spell-details">
        <p>Select a spell to learn more</p>
        <button class="learn-btn" data-spell="alohomora">Learn Alohomora</button>
    </div>
</div>
\`\`\`

**Required Selector Spells:**
1. Style the main title with a gradient background
2. Make all spell list items have a magical glow effect
3. Target only beginner spells with green styling
4. Target only the first spell in the list with special styling
5. Create hover effects for all buttons
6. Style paragraphs inside spell-details differently
7. Use attribute selectors to style the data-spell button
8. Create a :not() selector to exclude certain elements

**Bonus Challenges:**
- Use nth-child to alternate spell colors
- Create complex selector combinations
- Add magical animations and transitions
- Make it responsive with media queries`,
      quiz: [
        {
          id: '1',
          question: 'Which CSS selector targets elements with class="magical"?',
          options: ['#magical', '.magical', 'magical', '*magical'],
          correctAnswer: 1,
          explanation: 'The class selector uses a dot (.) followed by the class name to target elements with that specific class attribute.',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'What does the CSS selector "div p" target?',
          options: [
            'All divs and all paragraphs separately',
            'Divs that are also paragraphs',
            'All paragraphs that are descendants of divs',
            'Only direct paragraph children of divs'
          ],
          correctAnswer: 2,
          explanation: 'The descendant selector "div p" targets all paragraph elements that are nested inside div elements, regardless of how deeply nested they are.',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'Which selector applies styles when a user hovers over an element?',
          options: [':hover', '::hover', '#hover', '.hover'],
          correctAnswer: 0,
          explanation: ':hover is a pseudo-class that applies styles when a user hovers their cursor over an element, creating interactive magical effects.',
          difficulty: 'easy'
        },
        {
          id: '4',
          question: 'What is the difference between "div > p" and "div p"?',
          options: [
            'There is no difference',
            '> targets direct children, space targets all descendants',
            '> targets all descendants, space targets direct children',
            'Both target the same elements'
          ],
          correctAnswer: 1,
          explanation: 'The child selector (>) targets only direct children, while the descendant selector (space) targets all nested elements regardless of depth.',
          difficulty: 'medium'
        },
        {
          id: '5',
          question: 'Which attribute selector targets elements where the title attribute contains "magic"?',
          options: [
            '[title="magic"]',
            '[title*="magic"]',
            '[title^="magic"]',
            '[title$="magic"]'
          ],
          correctAnswer: 1,
          explanation: 'The *= operator in attribute selectors matches elements where the attribute contains the specified value anywhere within it.',
          difficulty: 'hard'
        }
      ],
      magicalFacts: [
        "🎯 CSS selectors are processed from right to left by browsers - the rightmost selector is evaluated first!",
        "⚡ The universal selector (*) can slow down your page if overused, so use it wisely",
        "🔮 CSS specificity follows the rule: inline styles > IDs > classes > elements",
        "✨ Pseudo-elements (::before, ::after) can create magical effects without extra HTML",
        "🎭 The :not() selector is incredibly powerful for excluding specific elements from styling"
      ]
    },
    prerequisites: ['alohomora']
  },
  {
    id: 'incendio',
    name: 'Incendio',
    topic: 'Flexbox/Grid',
    description: 'Burn away layout confusion with the powerful flames of modern CSS layout magic',
    difficulty: 'intermediate',
    xpReward: 150,
    house: 'hufflepuff',
    icon: '🔥',
    estimatedTime: '60 min',
    content: {
      theory: `
        <h2>🔥 Incendio: Mastering CSS Layout Magic!</h2>
        <p>Just as the Incendio spell creates controlled, powerful flames, CSS Flexbox and Grid give you precise, powerful control over layout, burning away the old frustrations of web positioning and alignment forever.</p>
        
        <h3>⚡ Flexbox - One-Dimensional Layout Magic</h3>
        <p>Flexbox excels at distributing space and aligning items along a single axis (either row or column). It's perfect for navigation bars, centering content, and creating flexible, responsive layouts that adapt like magic.</p>
        
        <h4>🎯 Essential Flexbox Container Properties</h4>
        <ul>
          <li><strong>display: flex</strong> - Transforms an element into a magical flex container</li>
          <li><strong>flex-direction</strong> - Sets the main axis (row, column, row-reverse, column-reverse)</li>
          <li><strong>justify-content</strong> - Aligns items along the main axis (start, center, space-between, space-around, space-evenly)</li>
          <li><strong>align-items</strong> - Aligns items along the cross axis (stretch, center, flex-start, flex-end)</li>
          <li><strong>flex-wrap</strong> - Controls whether items wrap to new lines (nowrap, wrap, wrap-reverse)</li>
          <li><strong>gap</strong> - Creates magical spacing between flex items</li>
        </ul>
        
        <h4>✨ Flex Item Properties</h4>
        <ul>
          <li><strong>flex-grow</strong> - How much an item should grow to fill available space</li>
          <li><strong>flex-shrink</strong> - How much an item should shrink when space is limited</li>
          <li><strong>flex-basis</strong> - The initial size before growing or shrinking</li>
          <li><strong>flex</strong> - Shorthand for grow, shrink, and basis (e.g., flex: 1 0 300px)</li>
          <li><strong>align-self</strong> - Override the container's align-items for individual items</li>
        </ul>
        
        <h3>🏗️ CSS Grid - Two-Dimensional Layout Mastery</h3>
        <p>Grid provides ultimate control over both rows and columns simultaneously, like having a magical blueprint that can create any layout imaginable. Perfect for complex layouts, dashboards, and card-based designs.</p>
        
        <h4>🎭 Essential Grid Container Properties</h4>
        <ul>
          <li><strong>display: grid</strong> - Creates a powerful grid container</li>
          <li><strong>grid-template-columns/rows</strong> - Defines the structure (1fr 2fr 1fr, repeat(3, 1fr), minmax(200px, 1fr))</li>
          <li><strong>grid-gap / gap</strong> - Sets spacing between grid items</li>
          <li><strong>grid-template-areas</strong> - Creates named grid areas for semantic layouts</li>
          <li><strong>justify-items/align-items</strong> - Controls item alignment within grid cells</li>
          <li><strong>justify-content/align-content</strong> - Controls grid alignment within container</li>
        </ul>
        
        <h4>🔮 Grid Item Properties</h4>
        <ul>
          <li><strong>grid-column/grid-row</strong> - Specifies item placement (1 / 3, span 2)</li>
          <li><strong>grid-area</strong> - Places items in named areas or specific grid positions</li>
          <li><strong>justify-self/align-self</strong> - Individual item alignment overrides</li>
        </ul>

        <h3>🌟 When to Use Each Layout Spell</h3>
        <ul>
          <li><strong>Flexbox</strong> - Navigation bars, centering content, equal-height columns, form layouts</li>
          <li><strong>Grid</strong> - Page layouts, card grids, complex dashboards, magazine-style layouts</li>
          <li><strong>Both Together</strong> - Grid for overall page structure, Flexbox for component internals</li>
        </ul>
      `,
      example: `
/* 🔥 FLEXBOX MAGIC EXAMPLES */

/* Navigation Bar Spell */
.magical-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #4c1d95, #5b21b6);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fbbf24;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

/* Perfect Centering Spell */
.perfect-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle, #1e1b4b, #312e81);
}

/* Flexible Card Container */
.spell-cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
}

.spell-card {
    flex: 0 1 300px; /* Don't grow, can shrink, base width 300px */
    background: rgba(30, 27, 75, 0.8);
    border-radius: 12px;
    padding: 2rem;
    border: 2px solid #8b5cf6;
    transition: transform 0.3s ease;
}

.spell-card:hover {
    transform: translateY(-10px) scale(1.02);
}

/* Responsive Flex Layout */
.responsive-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .responsive-layout {
        flex-direction: row;
        align-items: stretch;
    }
    
    .main-content {
        flex: 2; /* Takes 2/3 of available space */
    }
    
    .sidebar {
        flex: 1; /* Takes 1/3 of available space */
    }
}

/* 🏗️ CSS GRID MAGIC EXAMPLES */

/* Magical Dashboard Layout */
.spell-dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

/* Complex Layout with Named Areas */
.hogwarts-layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar content aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
    padding: 1rem;
}

.header { 
    grid-area: header; 
    background: linear-gradient(45deg, #7c2d12, #dc2626);
    padding: 1rem;
    border-radius: 8px;
}

.sidebar { 
    grid-area: sidebar; 
    background: linear-gradient(45deg, #1e40af, #3b82f6);
    padding: 1rem;
    border-radius: 8px;
}

.content { 
    grid-area: content; 
    background: rgba(30, 27, 75, 0.8);
    padding: 2rem;
    border-radius: 8px;
}

.aside { 
    grid-area: aside; 
    background: linear-gradient(45deg, #166534, #22c55e);
    padding: 1rem;
    border-radius: 8px;
}

.footer { 
    grid-area: footer; 
    background: linear-gradient(45deg, #581c87, #a855f7);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

/* Responsive Grid Gallery */
.spell-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
}

.gallery-item {
    background: linear-gradient(135deg, #4c1d95, #7c3aed);
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #a855f7;
    transition: all 0.3s ease;
}

.gallery-item:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
}

/* Advanced Grid Techniques */
.masonry-style {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
}

.tall-item {
    grid-row: span 2;
}

.wide-item {
    grid-column: span 2;
}

/* 🌟 COMBINING FLEXBOX AND GRID */
.ultimate-layout {
    display: grid;
    grid-template-areas: "nav nav" "main aside";
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
}

.nav-container {
    grid-area: nav;
    display: flex; /* Flexbox inside Grid! */
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(45deg, #1e1b4b, #312e81);
}
      `,
      practice: `🔥 **Your Layout Magic Challenge:**

Create a complete magical academy layout using both Flexbox and Grid:

**Part 1: Flexbox Navigation**
Create a responsive navigation bar with:
- Logo on the left
- Navigation links in the center
- User profile on the right
- Mobile-responsive hamburger menu

**Part 2: Grid Dashboard**
Build a spell dashboard with:
- Header spanning full width
- Sidebar for spell categories
- Main content area for spell cards
- Aside for user stats
- Footer with magical quotes

**Part 3: Flexible Spell Cards**
Create a card container that:
- Uses Flexbox for card arrangement
- Cards have flexible widths (min 250px, max 400px)
- Cards grow and shrink responsively
- Perfect spacing between cards

**Required CSS Properties to Use:**
- display: flex and display: grid
- grid-template-areas
- justify-content, align-items
- flex-grow, flex-shrink, flex-basis
- gap for spacing
- Media queries for responsiveness

**Bonus Challenges:**
- Create a masonry-style layout
- Add hover animations
- Make it work on mobile devices
- Combine Grid and Flexbox creatively

**HTML Structure Provided:**
\`\`\`html
<div class="academy-layout">
    <nav class="main-nav">
        <div class="logo">🏰 SpellAcademia</div>
        <ul class="nav-links">
            <li><a href="#">Spells</a></li>
            <li><a href="#">Progress</a></li>
            <li><a href="#">Spellbook</a></li>
        </ul>
        <div class="user-profile">👤 Wizard</div>
    </nav>
    
    <aside class="sidebar">
        <h3>Spell Categories</h3>
        <ul class="categories">
            <li>HTML Magic</li>
            <li>CSS Enchantments</li>
            <li>JavaScript Spells</li>
        </ul>
    </aside>
    
    <main class="main-content">
        <div class="spell-cards">
            <div class="spell-card">Alohomora</div>
            <div class="spell-card">Lumos</div>
            <div class="spell-card">Incendio</div>
            <!-- More cards... -->
        </div>
    </main>
    
    <aside class="stats-sidebar">
        <h3>Your Stats</h3>
        <div class="stat">Level: 5</div>
        <div class="stat">XP: 1250</div>
    </aside>
    
    <footer class="main-footer">
        <p>"Magic is believing in yourself" ✨</p>
    </footer>
</div>
\`\`\``,
      quiz: [
        {
          id: '1',
          question: 'Which property transforms an element into a flex container?',
          options: ['flex: 1', 'display: flex', 'flex-container: true', 'flexbox: on'],
          correctAnswer: 1,
          explanation: 'display: flex is the magical property that transforms an element into a flex container, enabling flexbox layout for its children.',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'What does "justify-content: space-between" do in a flex container?',
          options: [
            'Centers all items in the middle',
            'Distributes items with equal space around each item',
            'Places first item at start, last at end, equal space between others',
            'Aligns all items to the start of the container'
          ],
          correctAnswer: 2,
          explanation: 'justify-content: space-between distributes flex items so the first item is at the start, the last item is at the end, and the remaining space is distributed equally between items.',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'Which layout method is better for two-dimensional layouts (both rows AND columns)?',
          options: ['Flexbox', 'CSS Grid', 'Float', 'Position'],
          correctAnswer: 1,
          explanation: 'CSS Grid is specifically designed for two-dimensional layouts, giving you precise control over both rows and columns simultaneously, like a magical blueprint.',
          difficulty: 'easy'
        },
        {
          id: '4',
          question: 'What does "flex: 1 0 300px" mean for a flex item?',
          options: [
            'Grow factor 1, shrink factor 0, basis 300px',
            'Width 1px, height 0px, margin 300px',
            'Grow factor 0, shrink factor 1, basis 300px',
            'It sets the flex direction to row'
          ],
          correctAnswer: 0,
          explanation: 'flex: 1 0 300px means the item can grow (factor 1), cannot shrink (factor 0), and has an initial basis of 300px before growing.',
          difficulty: 'hard'
        },
        {
          id: '5',
          question: 'In CSS Grid, what does "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))" create?',
          options: [
            'Exactly 3 columns of equal width',
            'Responsive columns that fit as many 250px+ items as possible',
            'One column that changes size',
            'Fixed 250px columns only'
          ],
          correctAnswer: 1,
          explanation: 'This creates a responsive grid that automatically fits as many columns as possible, each at least 250px wide, growing to fill available space - pure layout magic!',
          difficulty: 'hard'
        }
      ],
      magicalFacts: [
        "🔥 Flexbox was originally called the 'Flexible Box Layout Module' - quite a mouthful for such powerful magic!",
        "🏗️ CSS Grid can create layouts that were impossible with older CSS methods - it's like having architectural superpowers",
        "⚡ You can use Flexbox and Grid together - Grid for page layout, Flexbox for component internals",
        "🎯 The 'fr' unit in Grid stands for 'fraction' and distributes available space proportionally",
        "✨ Flexbox can solve the age-old problem of vertical centering with just 3 lines of CSS!"
      ]
    },
    prerequisites: ['lumos']
  },
  {
    id: 'accio',
    name: 'Accio',
    topic: 'DOM Manipulation',
    description: 'Summon and control HTML elements with the power of JavaScript magic',
    difficulty: 'intermediate',
    xpReward: 180,
    house: 'slytherin',
    icon: '🪄',
    estimatedTime: '70 min',
    content: {
      theory: `
        <h2>🪄 Accio: Summoning Elements with DOM Magic!</h2>
        <p>Just as the Accio spell summons objects from afar, DOM manipulation allows you to summon, control, and transform HTML elements using the mystical powers of JavaScript. Master this spell, and you'll command the very fabric of web pages!</p>
        
        <h3>🌟 What is the DOM?</h3>
        <p>The Document Object Model (DOM) is like a magical map of your HTML document. It represents every element, attribute, and piece of text as objects that JavaScript can manipulate. Think of it as the living, breathing soul of your webpage that you can control with code.</p>
        
        <h3>🎯 Summoning Elements (Selecting)</h3>
        <p>Before you can control elements, you must first summon them:</p>
        <ul>
          <li><strong>document.getElementById()</strong> - Summons an element by its unique ID</li>
          <li><strong>document.querySelector()</strong> - Summons the first element matching a CSS selector</li>
          <li><strong>document.querySelectorAll()</strong> - Summons all elements matching a CSS selector</li>
          <li><strong>document.getElementsByClassName()</strong> - Summons elements by class name</li>
          <li><strong>document.getElementsByTagName()</strong> - Summons elements by tag name</li>
        </ul>
        
        <h3>✨ Transforming Elements (Manipulation)</h3>
        <p>Once summoned, you can transform elements in countless ways:</p>
        <ul>
          <li><strong>element.textContent</strong> - Changes the text inside an element</li>
          <li><strong>element.innerHTML</strong> - Changes the HTML content inside an element</li>
          <li><strong>element.style</strong> - Modifies CSS styles directly</li>
          <li><strong>element.classList</strong> - Adds, removes, or toggles CSS classes</li>
          <li><strong>element.setAttribute()</strong> - Sets HTML attributes</li>
          <li><strong>element.getAttribute()</strong> - Gets HTML attributes</li>
        </ul>
        
        <h3>🏗️ Creating and Destroying Elements</h3>
        <p>True DOM wizards can create elements from thin air and banish them when needed:</p>
        <ul>
          <li><strong>document.createElement()</strong> - Creates new elements</li>
          <li><strong>element.appendChild()</strong> - Adds elements as children</li>
          <li><strong>element.insertBefore()</strong> - Inserts elements at specific positions</li>
          <li><strong>element.removeChild()</strong> - Removes child elements</li>
          <li><strong>element.remove()</strong> - Removes the element itself</li>
          <li><strong>element.cloneNode()</strong> - Creates copies of elements</li>
        </ul>
        
        <h3>⚡ Event Magic (Interactivity)</h3>
        <p>Make your elements respond to user actions with event spells:</p>
        <ul>
          <li><strong>element.addEventListener()</strong> - Listens for user interactions</li>
          <li><strong>click, mouseover, keydown</strong> - Common event types</li>
          <li><strong>event.preventDefault()</strong> - Prevents default browser behavior</li>
          <li><strong>event.target</strong> - The element that triggered the event</li>
        </ul>

        <h3>🔮 Advanced DOM Spells</h3>
        <ul>
          <li><strong>element.closest()</strong> - Finds the nearest ancestor matching a selector</li>
          <li><strong>element.matches()</strong> - Checks if element matches a selector</li>
          <li><strong>element.scrollIntoView()</strong> - Scrolls element into view</li>
          <li><strong>document.createDocumentFragment()</strong> - Creates efficient DOM fragments</li>
        </ul>
      `,
      example: `
// 🪄 SUMMONING ELEMENTS (Selection)

// Summon by ID - most precise spell
const spellTitle = document.getElementById('main-title');

// Summon by CSS selector - very flexible
const firstSpellCard = document.querySelector('.spell-card');
const allSpellCards = document.querySelectorAll('.spell-card');

// Summon by class name - gets all elements with that class
const magicalElements = document.getElementsByClassName('magical');

// Summon by tag name - gets all elements of that type
const allParagraphs = document.getElementsByTagName('p');

// ✨ TRANSFORMING ELEMENTS (Manipulation)

// Change text content
spellTitle.textContent = '🏰 Welcome to SpellAcademia! ⚡';

// Change HTML content (be careful with user input!)
const spellDescription = document.querySelector('.spell-description');
spellDescription.innerHTML = '<strong>Master the art of</strong> <em>web development</em>!';

// Modify styles directly
spellTitle.style.color = '#fbbf24';
spellTitle.style.textShadow = '0 0 10px #fbbf24';
spellTitle.style.fontSize = '3rem';

// Work with CSS classes (preferred method)
spellTitle.classList.add('magical-glow');
spellTitle.classList.remove('hidden');
spellTitle.classList.toggle('active');

// Check if class exists
if (spellTitle.classList.contains('magical-glow')) {
    console.log('The title is glowing with magic! ✨');
}

// Set and get attributes
const spellButton = document.querySelector('.spell-button');
spellButton.setAttribute('data-spell', 'alohomora');
spellButton.setAttribute('aria-label', 'Learn Alohomora spell');

const spellType = spellButton.getAttribute('data-spell');
console.log(\`Learning spell: \${spellType}\`);

// 🏗️ CREATING NEW ELEMENTS

// Create a new spell card
const newSpellCard = document.createElement('div');
newSpellCard.className = 'spell-card magical-card';
newSpellCard.innerHTML = \`
    <h3>🔮 Expecto Patronum</h3>
    <p>Conjure protective magic with advanced JavaScript</p>
    <button class="learn-btn">Begin Spell</button>
\`;

// Add the new card to the spell container
const spellContainer = document.querySelector('.spell-container');
spellContainer.appendChild(newSpellCard);

// Insert element at specific position
const firstCard = document.querySelector('.spell-card');
spellContainer.insertBefore(newSpellCard, firstCard);

// Create multiple elements efficiently
const fragment = document.createDocumentFragment();
for (let i = 1; i <= 5; i++) {
    const spellItem = document.createElement('li');
    spellItem.textContent = \`Spell Level \${i}\`;
    spellItem.className = 'spell-level';
    fragment.appendChild(spellItem);
}
document.querySelector('.spell-levels').appendChild(fragment);

// ⚡ EVENT MAGIC (Interactivity)

// Basic click event
const learnButton = document.querySelector('.learn-btn');
learnButton.addEventListener('click', function(event) {
    console.log('🎉 Spell learning initiated!');
    event.target.textContent = 'Learning...';
    event.target.style.background = 'linear-gradient(45deg, #10b981, #059669)';
});

// More complex event handling
document.querySelectorAll('.spell-card').forEach(card => {
    // Hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
    
    // Click to expand
    card.addEventListener('click', function() {
        const isExpanded = this.classList.contains('expanded');
        
        // Close all other cards
        document.querySelectorAll('.spell-card').forEach(c => {
            c.classList.remove('expanded');
        });
        
        // Toggle this card
        if (!isExpanded) {
            this.classList.add('expanded');
            
            // Add detailed content
            if (!this.querySelector('.spell-details')) {
                const details = document.createElement('div');
                details.className = 'spell-details';
                details.innerHTML = \`
                    <p>✨ Difficulty: Intermediate</p>
                    <p>⏱️ Duration: 45 minutes</p>
                    <p>🏆 XP Reward: 150 points</p>
                    <button class="start-spell-btn">Start Learning</button>
                \`;
                this.appendChild(details);
            }
        }
    });
});

// Form handling with DOM manipulation
const spellForm = document.querySelector('#spell-form');
spellForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const formData = new FormData(this);
    const spellName = formData.get('spell-name');
    const difficulty = formData.get('difficulty');
    
    // Create result element
    const result = document.createElement('div');
    result.className = 'spell-result';
    result.innerHTML = \`
        <h3>🎉 Spell Created!</h3>
        <p><strong>Name:</strong> \${spellName}</p>
        <p><strong>Difficulty:</strong> \${difficulty}</p>
        <p>Your custom spell has been added to your spellbook!</p>
    \`;
    
    // Insert result after form
    this.parentNode.insertBefore(result, this.nextSibling);
    
    // Clear form
    this.reset();
    
    // Remove result after 5 seconds
    setTimeout(() => {
        result.remove();
    }, 5000);
});

// 🔮 ADVANCED DOM MAGIC

// Dynamic spell search
const searchInput = document.querySelector('#spell-search');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const spellCards = document.querySelectorAll('.spell-card');
    
    spellCards.forEach(card => {
        const spellName = card.querySelector('h3').textContent.toLowerCase();
        const spellDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (spellName.includes(searchTerm) || spellDesc.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
});

// Magical progress bar
function updateProgressBar(percentage) {
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = \`\${percentage}% Complete\`;
    
    // Add magical effects based on progress
    if (percentage >= 100) {
        progressBar.classList.add('complete');
        progressBar.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        
        // Create celebration effect
        createMagicalParticles();
    }
}

// Create magical particle effects
function createMagicalParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        particle.style.cssText = \`
            position: fixed;
            width: 4px;
            height: 4px;
            background: #fbbf24;
            border-radius: 50%;
            pointer-events: none;
            left: \${Math.random() * window.innerWidth}px;
            top: \${Math.random() * window.innerHeight}px;
            animation: sparkle 2s ease-out forwards;
        \`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => particle.remove(), 2000);
    }
}

// Keyboard navigation magic
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals or expanded cards
        document.querySelectorAll('.expanded').forEach(el => {
            el.classList.remove('expanded');
        });
    }
    
    if (event.key === 'Enter' && event.target.classList.contains('spell-card')) {
        // Activate spell card with Enter key
        event.target.click();
    }
});
      `,
      practice: `🪄 **Your DOM Manipulation Spell Challenge:**

Create an interactive Spell Academy dashboard with full DOM manipulation:

**Part 1: Spell Card Generator**
- Create a form to add new spell cards dynamically
- Include fields: spell name, description, difficulty, house
- Generate cards with proper styling and structure
- Add them to the spell container

**Part 2: Interactive Spell Cards**
- Make cards expandable on click
- Add hover effects with DOM style manipulation
- Include a "favorite" button that toggles appearance
- Show/hide detailed information dynamically

**Part 3: Spell Search & Filter**
- Create a search input that filters spells in real-time
- Add difficulty filter buttons (beginner, intermediate, advanced)
- Show/hide cards based on search criteria
- Update a counter showing filtered results

**Part 4: Progress Tracking**
- Create a progress bar that updates as spells are completed
- Add XP counter that increases with completed spells
- Show achievement badges when milestones are reached
- Store progress in localStorage (bonus)

**Required DOM Methods to Use:**
- document.querySelector() / querySelectorAll()
- createElement() and appendChild()
- addEventListener() for multiple event types
- classList.add/remove/toggle/contains
- textContent and innerHTML
- style property manipulation
- setAttribute() and getAttribute()

**HTML Structure to Work With:**
\`\`\`html
<div class="spell-academy">
    <header class="academy-header">
        <h1 id="main-title">🏰 Spell Academy Dashboard</h1>
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="progress-text">0% Complete</span>
        </div>
    </header>
    
    <div class="controls">
        <input type="text" id="spell-search" placeholder="Search spells...">
        <div class="filter-buttons">
            <button class="filter-btn" data-difficulty="all">All</button>
            <button class="filter-btn" data-difficulty="beginner">Beginner</button>
            <button class="filter-btn" data-difficulty="intermediate">Intermediate</button>
            <button class="filter-btn" data-difficulty="advanced">Advanced</button>
        </div>
    </div>
    
    <form id="add-spell-form">
        <input type="text" name="spell-name" placeholder="Spell Name" required>
        <input type="text" name="description" placeholder="Description" required>
        <select name="difficulty">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
        </select>
        <button type="submit">Add Spell</button>
    </form>
    
    <div class="spell-container">
        <!-- Spell cards will be added here dynamically -->
    </div>
    
    <div class="stats">
        <div class="stat">
            <span class="stat-label">Total XP:</span>
            <span id="total-xp">0</span>
        </div>
        <div class="stat">
            <span class="stat-label">Spells Mastered:</span>
            <span id="spells-completed">0</span>
        </div>
    </div>
</div>
\`\`\`

**Bonus Challenges:**
- Add drag-and-drop functionality to reorder spells
- Create a spell comparison feature
- Add keyboard navigation
- Implement undo/redo functionality
- Create magical particle effects on interactions`,
      quiz: [
        {
          id: '1',
          question: 'Which method is best for selecting a single element by its ID?',
          options: [
            'document.querySelector("#myId")',
            'document.getElementById("myId")',
            'document.querySelectorAll("#myId")[0]',
            'All of the above work equally well'
          ],
          correctAnswer: 1,
          explanation: 'document.getElementById() is the most direct and efficient method for selecting an element by its ID, though querySelector() also works.',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'What is the difference between textContent and innerHTML?',
          options: [
            'They do exactly the same thing',
            'textContent sets plain text, innerHTML can set HTML markup',
            'innerHTML sets plain text, textContent can set HTML markup',
            'textContent is faster but innerHTML is more secure'
          ],
          correctAnswer: 1,
          explanation: 'textContent sets or gets plain text content, while innerHTML can set or get HTML markup. innerHTML can be dangerous with user input due to XSS risks.',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'Which is the preferred way to add CSS classes to an element?',
          options: [
            'element.className += " newClass"',
            'element.classList.add("newClass")',
            'element.style.class = "newClass"',
            'element.setAttribute("class", "newClass")'
          ],
          correctAnswer: 1,
          explanation: 'element.classList.add() is the preferred method as it\'s cleaner, safer, and provides additional methods like remove(), toggle(), and contains().',
          difficulty: 'medium'
        },
        {
          id: '4',
          question: 'What does event.preventDefault() do?',
          options: [
            'Stops the event from bubbling up to parent elements',
            'Prevents the default browser behavior for that event',
            'Removes the event listener',
            'Cancels all future events of that type'
          ],
          correctAnswer: 1,
          explanation: 'event.preventDefault() stops the browser from performing its default action for that event (like following a link or submitting a form).',
          difficulty: 'medium'
        },
        {
          id: '5',
          question: 'Which method is most efficient for adding multiple elements to the DOM?',
          options: [
            'Adding elements one by one with appendChild()',
            'Using innerHTML to set all content at once',
            'Creating a DocumentFragment and appending it',
            'Using insertAdjacentHTML() for each element'
          ],
          correctAnswer: 2,
          explanation: 'DocumentFragment allows you to build DOM structure in memory and then add it all at once, minimizing reflows and improving performance.',
          difficulty: 'hard'
        }
      ],
      magicalFacts: [
        "🪄 The DOM is a live representation - changes to it immediately affect what users see!",
        "⚡ querySelector() uses CSS selector syntax, making it incredibly flexible for element selection",
        "🎯 Event delegation lets you handle events on elements that don't exist yet - pure magic!",
        "🔮 DocumentFragment is like an invisible container that helps optimize DOM manipulation performance",
        "✨ The DOM API has over 100 different methods and properties - you're learning the most powerful ones!"
      ]
    },
    prerequisites: ['incendio']
  },
  {
    id: 'expecto-patronum',
    name: 'Expecto Patronum',
    topic: 'JavaScript Logic',
    description: 'Conjure powerful protective logic to defend against bugs and errors',
    difficulty: 'advanced',
    xpReward: 200,
    house: 'gryffindor',
    icon: '🦌',
    estimatedTime: '80 min',
    content: {
      theory: `
        <h2>🦌 Expecto Patronum: Advanced JavaScript Logic Magic!</h2>
        <p>Just as the Expecto Patronum spell conjures a powerful guardian to protect against Dementors, mastering JavaScript logic creates robust, defensive code that protects your applications from bugs, errors, and unexpected behavior. This is the most advanced protective magic in a developer's arsenal!</p>
        
        <h3>🛡️ Conditional Logic - Your First Line of Defense</h3>
        <p>Conditional statements are like magical shields that protect your code by making decisions:</p>
        <ul>
          <li><strong>if/else statements</strong> - Basic decision-making magic</li>
          <li><strong>switch statements</strong> - Multi-path decision spells</li>
          <li><strong>Ternary operators</strong> - Compact conditional magic (condition ? true : false)</li>
          <li><strong>Logical operators</strong> - && (AND), || (OR), ! (NOT) for complex conditions</li>
          <li><strong>Nullish coalescing (??)</strong> - Handle null/undefined values gracefully</li>
        </ul>
        
        <h3>🔄 Loop Magic - Repetitive Spells</h3>
        <p>Loops allow you to cast the same spell multiple times efficiently:</p>
        <ul>
          <li><strong>for loops</strong> - Traditional counting magic</li>
          <li><strong>while loops</strong> - Continue until condition is false</li>
          <li><strong>for...of loops</strong> - Iterate through arrays and iterables</li>
          <li><strong>for...in loops</strong> - Iterate through object properties</li>
          <li><strong>Array methods</strong> - forEach, map, filter, reduce (functional magic)</li>
        </ul>
        
        <h3>🎯 Functions - Reusable Spell Formulas</h3>
        <p>Functions encapsulate magical logic for reuse and organization:</p>
        <ul>
          <li><strong>Function declarations</strong> - Traditional spell definitions</li>
          <li><strong>Arrow functions</strong> - Modern, concise spell syntax</li>
          <li><strong>Parameters and arguments</strong> - Spell ingredients</li>
          <li><strong>Return values</strong> - Spell results</li>
          <li><strong>Higher-order functions</strong> - Functions that work with other functions</li>
          <li><strong>Closures</strong> - Functions that remember their environment</li>
        </ul>
        
        <h3>🏗️ Data Structures - Organizing Your Magic</h3>
        <p>Proper data organization is crucial for powerful spells:</p>
        <ul>
          <li><strong>Arrays</strong> - Ordered collections of magical items</li>
          <li><strong>Objects</strong> - Key-value pairs for complex data</li>
          <li><strong>Maps and Sets</strong> - Advanced collection types</li>
          <li><strong>Destructuring</strong> - Extract values elegantly</li>
          <li><strong>Spread operator</strong> - Expand arrays and objects</li>
        </ul>
        
        <h3>⚡ Asynchronous Magic - Time-Based Spells</h3>
        <p>Handle time-dependent operations with grace:</p>
        <ul>
          <li><strong>Promises</strong> - Handle future values</li>
          <li><strong>async/await</strong> - Write asynchronous code that looks synchronous</li>
          <li><strong>setTimeout/setInterval</strong> - Time-based spell casting</li>
          <li><strong>Event handling</strong> - Respond to user actions</li>
        </ul>
        
        <h3>🛡️ Error Handling - Defensive Magic</h3>
        <p>Protect your spells from unexpected failures:</p>
        <ul>
          <li><strong>try/catch blocks</strong> - Catch and handle errors gracefully</li>
          <li><strong>Error objects</strong> - Understand what went wrong</li>
          <li><strong>Input validation</strong> - Verify spell ingredients</li>
          <li><strong>Type checking</strong> - Ensure data types are correct</li>
        </ul>
      `,
      example: `
// 🦌 EXPECTO PATRONUM: ADVANCED JAVASCRIPT LOGIC

// 🛡️ CONDITIONAL LOGIC MAGIC

// Basic protective spell with validation
function castSpell(spellName, casterLevel, targetElement) {
    // Input validation - first line of defense
    if (!spellName || typeof spellName !== 'string') {
        throw new Error('🚫 Invalid spell name! Spell names must be strings.');
    }
    
    if (!casterLevel || casterLevel < 1) {
        throw new Error('🚫 Invalid caster level! Must be at least level 1.');
    }
    
    // Complex conditional logic
    let spellPower;
    let spellEffect;
    
    switch (spellName.toLowerCase()) {
        case 'alohomora':
            spellPower = casterLevel * 10;
            spellEffect = casterLevel >= 5 ? 'Unlocks any door' : 'Unlocks simple locks';
            break;
        case 'lumos':
            spellPower = casterLevel * 15;
            spellEffect = casterLevel >= 10 ? 'Blinds enemies' : 'Provides light';
            break;
        case 'expecto patronum':
            if (casterLevel < 15) {
                return { success: false, message: '🚫 Insufficient level for Patronus!' };
            }
            spellPower = casterLevel * 25;
            spellEffect = 'Conjures protective guardian';
            break;
        default:
            return { success: false, message: \`🚫 Unknown spell: \${spellName}\` };
    }
    
    // Ternary operator for success calculation
    const successRate = casterLevel >= 20 ? 0.95 : (casterLevel * 0.04 + 0.1);
    const isSuccessful = Math.random() < successRate;
    
    // Nullish coalescing for default values
    const finalTarget = targetElement ?? 'general area';
    
    return {
        success: isSuccessful,
        spellName,
        power: spellPower,
        effect: spellEffect,
        target: finalTarget,
        message: isSuccessful 
            ? \`✨ \${spellName} cast successfully on \${finalTarget}!\` 
            : \`💥 \${spellName} fizzled out...\`
    };
}

// 🔄 LOOP MAGIC - REPETITIVE SPELLS

// Spell practice session with different loop types
class SpellPractice {
    constructor() {
        this.spells = ['Alohomora', 'Lumos', 'Incendio', 'Accio'];
        this.practiceResults = [];
    }
    
    // Traditional for loop - practice each spell multiple times
    practiceBasicSpells(repetitions = 3) {
        console.log('🎯 Starting basic spell practice...');
        
        for (let i = 0; i < this.spells.length; i++) {
            for (let rep = 1; rep <= repetitions; rep++) {
                const result = castSpell(this.spells[i], rep * 2, \`target-\${i}-\${rep}\`);
                this.practiceResults.push({
                    spell: this.spells[i],
                    attempt: rep,
                    ...result
                });
            }
        }
    }
    
    // for...of loop - iterate through spell collection
    practiceAdvancedSpells() {
        console.log('🔮 Practicing advanced spells...');
        
        const advancedSpells = [
            { name: 'Expecto Patronum', minLevel: 15 },
            { name: 'Avada Kedavra', minLevel: 50 },
            { name: 'Crucio', minLevel: 40 }
        ];
        
        for (const spell of advancedSpells) {
            const casterLevel = Math.floor(Math.random() * 60) + 1;
            
            if (casterLevel >= spell.minLevel) {
                const result = castSpell(spell.name, casterLevel);
                console.log(\`✅ \${spell.name}: \${result.message}\`);
            } else {
                console.log(\`❌ \${spell.name}: Level \${casterLevel} too low (need \${spell.minLevel})\`);
            }
        }
    }
    
    // Array methods - functional programming magic
    analyzeResults() {
        console.log('📊 Analyzing practice results...');
        
        // Filter successful spells
        const successfulSpells = this.practiceResults.filter(result => result.success);
        
        // Map to get spell names only
        const spellNames = this.practiceResults.map(result => result.spell);
        
        // Reduce to calculate total power
        const totalPower = this.practiceResults.reduce((sum, result) => {
            return sum + (result.power || 0);
        }, 0);
        
        // Group by spell type
        const spellStats = this.practiceResults.reduce((stats, result) => {
            if (!stats[result.spell]) {
                stats[result.spell] = { attempts: 0, successes: 0, totalPower: 0 };
            }
            stats[result.spell].attempts++;
            if (result.success) stats[result.spell].successes++;
            stats[result.spell].totalPower += result.power || 0;
            return stats;
        }, {});
        
        return {
            totalAttempts: this.practiceResults.length,
            successfulSpells: successfulSpells.length,
            successRate: (successfulSpells.length / this.practiceResults.length * 100).toFixed(1),
            totalPower,
            spellStats
        };
    }
}

// 🎯 ADVANCED FUNCTION MAGIC

// Higher-order function - creates spell enhancers
function createSpellEnhancer(enhancementType) {
    const enhancements = {
        power: (spell) => ({ ...spell, power: spell.power * 1.5 }),
        accuracy: (spell) => ({ ...spell, successRate: Math.min(spell.successRate * 1.2, 1) }),
        speed: (spell) => ({ ...spell, castTime: spell.castTime * 0.8 }),
        area: (spell) => ({ ...spell, area: spell.area * 2 })
    };
    
    return enhancements[enhancementType] || ((spell) => spell);
}

// Closure magic - spell memory
function createSpellMemory() {
    let learnedSpells = [];
    let totalExperience = 0;
    
    return {
        learnSpell: function(spellName, difficulty) {
            const existingSpell = learnedSpells.find(s => s.name === spellName);
            
            if (existingSpell) {
                existingSpell.proficiency += 10;
                console.log(\`📈 Improved \${spellName} proficiency to \${existingSpell.proficiency}\`);
            } else {
                const newSpell = {
                    name: spellName,
                    difficulty,
                    proficiency: 20,
                    learnedAt: new Date()
                };
                learnedSpells.push(newSpell);
                console.log(\`✨ Learned new spell: \${spellName}\`);
            }
            
            totalExperience += difficulty * 10;
        },
        
        getSpellbook: function() {
            return {
                spells: [...learnedSpells], // Return copy to prevent mutation
                totalSpells: learnedSpells.length,
                totalExperience,
                averageProficiency: learnedSpells.reduce((sum, spell) => sum + spell.proficiency, 0) / learnedSpells.length || 0
            };
        },
        
        canCastSpell: function(spellName, requiredProficiency = 50) {
            const spell = learnedSpells.find(s => s.name === spellName);
            return spell && spell.proficiency >= requiredProficiency;
        }
    };
}

// ⚡ ASYNCHRONOUS MAGIC - TIME-BASED SPELLS

// Promise-based spell casting
function castAsyncSpell(spellName, castingTime = 1000) {
    return new Promise((resolve, reject) => {
        console.log(\`🔮 Beginning to cast \${spellName}...\`);
        
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            
            if (success) {
                resolve({
                    spell: spellName,
                    success: true,
                    message: \`✨ \${spellName} cast successfully!\`,
                    castTime: castingTime,
                    power: Math.floor(Math.random() * 100) + 50
                });
            } else {
                reject(new Error(\`💥 \${spellName} casting failed!\`));
            }
        }, castingTime);
    });
}

// Async/await spell combination
async function castSpellCombo(spells) {
    const results = [];
    let totalPower = 0;
    
    try {
        console.log('🌟 Casting spell combination...');
        
        for (const spellName of spells) {
            const result = await castAsyncSpell(spellName, 500);
            results.push(result);
            totalPower += result.power;
            console.log(result.message);
        }
        
        // Bonus power for successful combo
        if (results.length === spells.length) {
            totalPower *= 1.5;
            console.log(\`🎉 Perfect combo! Bonus power applied. Total: \${totalPower}\`);
        }
        
        return { success: true, results, totalPower };
        
    } catch (error) {
        console.error('❌ Spell combo failed:', error.message);
        return { success: false, error: error.message, results };
    }
}

// 🛡️ ERROR HANDLING - DEFENSIVE MAGIC

class SpellCastingError extends Error {
    constructor(message, spellName, casterLevel) {
        super(message);
        this.name = 'SpellCastingError';
        this.spellName = spellName;
        this.casterLevel = casterLevel;
        this.timestamp = new Date();
    }
}

function safeSpellCasting(spellName, casterLevel, options = {}) {
    try {
        // Validate inputs
        if (typeof spellName !== 'string' || spellName.trim() === '') {
            throw new SpellCastingError('Invalid spell name', spellName, casterLevel);
        }
        
        if (!Number.isInteger(casterLevel) || casterLevel < 1) {
            throw new SpellCastingError('Invalid caster level', spellName, casterLevel);
        }
        
        // Attempt spell casting
        const result = castSpell(spellName, casterLevel, options.target);
        
        // Log successful casting
        console.log(\`📝 Spell log: \${spellName} cast by level \${casterLevel} wizard\`);
        
        return result;
        
    } catch (error) {
        // Handle different types of errors
        if (error instanceof SpellCastingError) {
            console.error(\`🚫 Spell Casting Error: \${error.message}\`);
            console.error(\`   Spell: \${error.spellName}, Level: \${error.casterLevel}\`);
        } else {
            console.error(\`💥 Unexpected error during spell casting: \${error.message}\`);
        }
        
        // Return safe fallback
        return {
            success: false,
            error: error.message,
            spellName,
            casterLevel,
            timestamp: new Date()
        };
    }
}

// 🎮 PUTTING IT ALL TOGETHER - SPELL ACADEMY SIMULATOR

class SpellAcademy {
    constructor() {
        this.students = new Map();
        this.spellMemory = createSpellMemory();
        this.practiceSession = new SpellPractice();
    }
    
    async enrollStudent(name, startingLevel = 1) {
        try {
            if (this.students.has(name)) {
                throw new Error(\`Student \${name} is already enrolled!\`);
            }
            
            const student = {
                name,
                level: startingLevel,
                experience: 0,
                spellsLearned: [],
                achievements: [],
                enrolledAt: new Date()
            };
            
            this.students.set(name, student);
            console.log(\`🎓 \${name} enrolled at Spell Academy!\`);
            
            // Welcome spell casting
            await this.teachSpell(name, 'Lumos');
            
            return student;
            
        } catch (error) {
            console.error(\`❌ Enrollment failed: \${error.message}\`);
            return null;
        }
    }
    
    async teachSpell(studentName, spellName) {
        const student = this.students.get(studentName);
        
        if (!student) {
            throw new Error(\`Student \${studentName} not found!\`);
        }
        
        try {
            // Simulate learning time
            console.log(\`📚 \${studentName} is learning \${spellName}...\`);
            
            const learningResult = await castAsyncSpell(\`Learn \${spellName}\`, 2000);
            
            if (learningResult.success) {
                student.spellsLearned.push(spellName);
                student.experience += 50;
                
                // Level up check
                const newLevel = Math.floor(student.experience / 100) + 1;
                if (newLevel > student.level) {
                    student.level = newLevel;
                    console.log(\`🎉 \${studentName} leveled up to level \${newLevel}!\`);
                }
                
                this.spellMemory.learnSpell(spellName, 3);
                
                return { success: true, student };
            }
            
        } catch (error) {
            console.error(\`❌ Failed to teach \${spellName} to \${studentName}: \${error.message}\`);
            return { success: false, error: error.message };
        }
    }
    
    getAcademyStats() {
        const students = Array.from(this.students.values());
        
        return {
            totalStudents: students.length,
            averageLevel: students.reduce((sum, s) => sum + s.level, 0) / students.length || 0,
            totalExperience: students.reduce((sum, s) => sum + s.experience, 0),
            spellbook: this.spellMemory.getSpellbook(),
            topStudents: students
                .sort((a, b) => b.experience - a.experience)
                .slice(0, 3)
                .map(s => ({ name: s.name, level: s.level, experience: s.experience }))
        };
    }
}

// 🌟 EXAMPLE USAGE
async function demonstrateAdvancedLogic() {
    console.log('🏰 Welcome to Advanced JavaScript Logic Magic!');
    
    // Create spell academy
    const academy = new SpellAcademy();
    
    // Enroll students
    await academy.enrollStudent('Harry Potter', 5);
    await academy.enrollStudent('Hermione Granger', 8);
    await academy.enrollStudent('Ron Weasley', 4);
    
    // Teach spells
    await academy.teachSpell('Harry Potter', 'Expecto Patronum');
    await academy.teachSpell('Hermione Granger', 'Alohomora');
    
    // Practice spells
    const practice = new SpellPractice();
    practice.practiceBasicSpells(2);
    practice.practiceAdvancedSpells();
    
    const practiceResults = practice.analyzeResults();
    console.log('📊 Practice Results:', practiceResults);
    
    // Cast spell combinations
    const comboResult = await castSpellCombo(['Lumos', 'Alohomora', 'Incendio']);
    console.log('🌟 Combo Result:', comboResult);
    
    // Show academy stats
    const stats = academy.getAcademyStats();
    console.log('🏆 Academy Stats:', stats);
}

// Run the demonstration
demonstrateAdvancedLogic().catch(console.error);
      `,
      practice: `🦌 **Your Advanced JavaScript Logic Challenge:**

Create a complete Spell Battle System with advanced JavaScript logic:

**Part 1: Wizard Class System**
Create a Wizard class with:
- Properties: name, level, health, mana, spells[], experience
- Methods: castSpell(), learnSpell(), levelUp(), rest()
- Validation for all inputs and actions
- Experience-based leveling system

**Part 2: Spell System**
Create different spell types with:
- Damage spells (reduce enemy health)
- Healing spells (restore health/mana)
- Utility spells (buffs, debuffs, shields)
- Each spell has: name, manaCost, power, cooldown, requirements

**Part 3: Battle Logic**
Implement turn-based combat with:
- Initiative system (speed determines turn order)
- Spell effectiveness calculations
- Critical hits and misses
- Status effects (poison, shield, etc.)
- Victory/defeat conditions

**Part 4: Advanced Features**
Add these complex systems:
- Spell combinations (casting multiple spells for bonus effects)
- Elemental weaknesses/strengths
- Equipment system affecting spell power
- Achievement system with unlockable content
- Save/load game state using localStorage

**Required JavaScript Concepts:**
- Classes and inheritance
- Complex conditional logic (nested if/else, switch)
- Array methods (map, filter, reduce, find)
- Async/await for spell animations
- Error handling with try/catch
- Closures for private data
- Higher-order functions
- Event-driven programming

**Starter Code Structure:**
\`\`\`javascript
class Wizard {
    constructor(name, house) {
        // Initialize wizard properties
    }
    
    async castSpell(spellName, target) {
        // Implement spell casting logic with validation
    }
    
    learnSpell(spell) {
        // Add spell to wizard's spellbook with requirements check
    }
    
    takeDamage(amount) {
        // Handle damage with shields and resistances
    }
}

class Spell {
    constructor(name, type, power, manaCost, requirements = {}) {
        // Initialize spell properties
    }
    
    canCast(caster) {
        // Check if wizard can cast this spell
    }
    
    calculateDamage(caster, target) {
        // Complex damage calculation with modifiers
    }
}

class BattleSystem {
    constructor() {
        // Initialize battle state
    }
    
    async startBattle(wizard1, wizard2) {
        // Implement turn-based battle logic
    }
    
    processTurn(activeWizard, targetWizard, action) {
        // Handle individual turn logic
    }
    
    checkVictoryConditions() {
        // Determine if battle is over
    }
}

// Usage Example:
const harry = new Wizard('Harry Potter', 'Gryffindor');
const voldemort = new Wizard('Voldemort', 'Slytherin');

const battle = new BattleSystem();
battle.startBattle(harry, voldemort);
\`\`\`

**Bonus Challenges:**
- Add AI for computer-controlled wizards
- Create a tournament system
- Implement spell crafting/creation
- Add multiplayer support simulation
- Create detailed battle logs and statistics
- Build a spell effect animation system`,
      quiz: [
        {
          id: '1',
          question: 'What is the difference between == and === in JavaScript?',
          options: [
            'There is no difference',
            '== checks type and value, === checks only value',
            '=== checks type and value, == only checks value',
            '== is faster than ==='
          ],
          correctAnswer: 2,
          explanation: '=== (strict equality) checks both type and value, while == (loose equality) performs type coercion and only checks value after conversion.',
          difficulty: 'medium'
        },
        {
          id: '2',
          question: 'What will this code output: console.log(0 || "default" || null)?',
          options: [
            '0',
            '"default"',
            'null',
            'undefined'
          ],
          correctAnswer: 1,
          explanation: 'The || operator returns the first truthy value. Since 0 is falsy, it returns "default" which is truthy.',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'What is a closure in JavaScript?',
          options: [
            'A way to close browser windows',
            'A function that has access to variables in its outer scope',
            'A method to end loops early',
            'A type of error handling'
          ],
          correctAnswer: 1,
          explanation: 'A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has finished executing.',
          difficulty: 'hard'
        },
        {
          id: '4',
          question: 'Which array method should you use to transform each element and return a new array?',
          options: [
            'forEach()',
            'filter()',
            'map()',
            'reduce()'
          ],
          correctAnswer: 2,
          explanation: 'map() transforms each element in an array and returns a new array with the transformed values. forEach() doesn\'t return anything.',
          difficulty: 'medium'
        },
        {
          id: '5',
          question: 'What happens if you don\'t handle a Promise rejection?',
          options: [
            'The program crashes immediately',
            'It gets converted to a resolved Promise',
            'You get an "Unhandled Promise Rejection" warning',
            'Nothing happens'
          ],
          correctAnswer: 2,
          explanation: 'Unhandled Promise rejections generate warnings and can cause issues. Always handle rejections with .catch() or try/catch with async/await.',
          difficulty: 'hard'
        }
      ],
      magicalFacts: [
        "🦌 The Patronus charm is one of the most advanced spells - just like mastering JavaScript logic!",
        "⚡ JavaScript's event loop handles asynchronous operations like magic - it never blocks!",
        "🔮 Closures in JavaScript are like magical containers that remember their environment forever",
        "🛡️ Proper error handling is like casting protective spells - it prevents your code from breaking",
        "✨ Array methods like map, filter, and reduce are functional programming magic that makes code elegant and powerful!"
      ]
    },
    prerequisites: ['accio']
  },
  {
    id: 'protego',
    name: 'Protego',
    topic: 'Responsive Design',
    description: 'Shield your designs across all devices with responsive magic',
    difficulty: 'advanced',
    xpReward: 220,
    house: 'ravenclaw',
    icon: '🛡️',
    estimatedTime: '90 min',
    content: {
      theory: `
        <h2>🛡️ Protego: Mastering Responsive Design Magic!</h2>
        <p>Just as the Protego spell creates an invisible shield that adapts to protect against any attack, responsive design creates flexible layouts that adapt and protect your user experience across all devices, screen sizes, and viewing conditions. This is the ultimate defensive magic for modern web development!</p>
        
        <h3>📱 The Multi-Device Challenge</h3>
        <p>In today's magical world, users access websites from countless devices:</p>
        <ul>
          <li><strong>Mobile phones</strong> - 320px to 480px wide</li>
          <li><strong>Tablets</strong> - 768px to 1024px wide</li>
          <li><strong>Laptops</strong> - 1024px to 1440px wide</li>
          <li><strong>Desktop monitors</strong> - 1440px and beyond</li>
          <li><strong>Ultra-wide displays</strong> - 2560px and beyond</li>
        </ul>
        
        <h3>🎯 Core Responsive Principles</h3>
        <ul>
          <li><strong>Mobile-First Design</strong> - Start with mobile, enhance for larger screens</li>
          <li><strong>Flexible Grids</strong> - Use percentages and fr units instead of fixed pixels</li>
          <li><strong>Flexible Images</strong> - Images that scale with their containers</li>
          <li><strong>Media Queries</strong> - Apply different styles based on device characteristics</li>
          <li><strong>Viewport Meta Tag</strong> - Control how pages are displayed on mobile devices</li>
        </ul>
        
        <h3>📐 CSS Units for Responsive Magic</h3>
        <ul>
          <li><strong>Relative Units</strong> - %, em, rem, vw, vh, vmin, vmax</li>
          <li><strong>%</strong> - Percentage of parent element</li>
          <li><strong>em</strong> - Relative to element's font size</li>
          <li><strong>rem</strong> - Relative to root font size</li>
          <li><strong>vw/vh</strong> - Viewport width/height (1vw = 1% of viewport width)</li>
          <li><strong>vmin/vmax</strong> - Smaller/larger of vw or vh</li>
        </ul>
        
        <h3>🔮 Media Query Spells</h3>
        <p>Media queries are conditional spells that apply styles based on device characteristics:</p>
        <ul>
          <li><strong>@media screen</strong> - Target screen devices</li>
          <li><strong>min-width/max-width</strong> - Screen width conditions</li>
          <li><strong>min-height/max-height</strong> - Screen height conditions</li>
          <li><strong>orientation</strong> - Portrait or landscape</li>
          <li><strong>resolution</strong> - Screen pixel density</li>
          <li><strong>prefers-color-scheme</strong> - Dark/light mode preference</li>
        </ul>
        
        <h3>🏗️ Responsive Layout Techniques</h3>
        <ul>
          <li><strong>CSS Grid</strong> - Two-dimensional responsive layouts</li>
          <li><strong>Flexbox</strong> - One-dimensional flexible layouts</li>
          <li><strong>Container Queries</strong> - Style based on container size (modern browsers)</li>
          <li><strong>Clamp() Function</strong> - Responsive typography and spacing</li>
          <li><strong>Aspect Ratio</strong> - Maintain proportions across devices</li>
        </ul>
        
        <h3>🖼️ Responsive Images & Media</h3>
        <ul>
          <li><strong>max-width: 100%</strong> - Basic responsive images</li>
          <li><strong>srcset attribute</strong> - Serve different images for different screen densities</li>
          <li><strong>picture element</strong> - Art direction and format selection</li>
          <li><strong>object-fit</strong> - Control how images fit their containers</li>
          <li><strong>lazy loading</strong> - Improve performance on mobile</li>
        </ul>
        
        <h3>⚡ Performance Considerations</h3>
        <ul>
          <li><strong>Mobile-first CSS</strong> - Smaller initial payload</li>
          <li><strong>Critical CSS</strong> - Inline above-the-fold styles</li>
          <li><strong>Image optimization</strong> - WebP, AVIF formats</li>
          <li><strong>Font loading</strong> - font-display: swap</li>
          <li><strong>Minimize reflows</strong> - Avoid layout thrashing</li>
        </ul>
        
        <h3>🎨 Advanced Responsive Techniques</h3>
        <ul>
          <li><strong>Intrinsic Web Design</strong> - Layouts that adapt naturally</li>
          <li><strong>Component-based responsive design</strong> - Each component handles its own responsiveness</li>
          <li><strong>Progressive enhancement</strong> - Start basic, add features for capable devices</li>
          <li><strong>Responsive typography</strong> - Fluid type scales</li>
          <li><strong>Touch-friendly interfaces</strong> - Appropriate tap targets and gestures</li>
        </ul>
      `,
      example: `
/* 🛡️ PROTEGO: RESPONSIVE DESIGN MAGIC */

/* 📱 ESSENTIAL VIEWPORT AND RESET */
/* Always include this in your HTML head:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
*/

/* CSS Reset for consistent responsive behavior */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px; /* Base font size for rem calculations */
    scroll-behavior: smooth;
}

body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #e5e7eb;
    background: linear-gradient(135deg, #1e1b4b, #312e81);
}

/* 🎯 MOBILE-FIRST RESPONSIVE LAYOUT */

/* Base styles (mobile-first) */
.spell-academy-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    
    /* Responsive padding using clamp() */
    padding: clamp(1rem, 4vw, 3rem);
}

.hero-section {
    text-align: center;
    padding: 2rem 0;
    
    /* Responsive spacing */
    padding: clamp(2rem, 8vh, 6rem) 0;
}

.hero-title {
    /* Responsive typography with clamp() */
    font-size: clamp(2rem, 8vw, 4rem);
    color: #fbbf24;
    margin-bottom: 1rem;
    
    /* Responsive text shadow */
    text-shadow: 0 0 clamp(10px, 2vw, 30px) #fbbf24;
}

.hero-subtitle {
    font-size: clamp(1rem, 4vw, 1.5rem);
    color: #a855f7;
    margin-bottom: 2rem;
}

/* 🏗️ RESPONSIVE GRID LAYOUTS */

/* Mobile: Single column */
.spell-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
    
    /* Responsive gap */
    gap: clamp(1rem, 3vw, 2rem);
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
    .spell-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
    .spell-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Large desktop: 4 columns */
@media (min-width: 1440px) {
    .spell-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* 🎴 RESPONSIVE SPELL CARDS */
.spell-card {
    background: linear-gradient(135deg, #4c1d95, #7c3aed);
    border-radius: clamp(8px, 2vw, 16px);
    padding: clamp(1rem, 4vw, 2rem);
    border: 2px solid #a855f7;
    transition: all 0.3s ease;
    
    /* Maintain aspect ratio */
    aspect-ratio: 3 / 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.spell-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
}

.spell-icon {
    font-size: clamp(2rem, 6vw, 3rem);
    margin-bottom: 1rem;
}

.spell-title {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: #fbbf24;
    margin-bottom: 0.5rem;
}

.spell-description {
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    color: #e5e7eb;
    flex-grow: 1;
}

/* 📱 RESPONSIVE NAVIGATION */
.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-logo {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    font-weight: bold;
    color: #fbbf24;
}

/* Mobile navigation */
.nav-links {
    display: none; /* Hidden on mobile */
    list-style: none;
    gap: 2rem;
}

.nav-toggle {
    display: block; /* Visible on mobile */
    background: none;
    border: none;
    color: #fbbf24;
    font-size: 1.5rem;
    cursor: pointer;
}

/* Tablet and desktop navigation */
@media (min-width: 768px) {
    .nav-links {
        display: flex;
    }
    
    .nav-toggle {
        display: none;
    }
}

.nav-link {
    color: #e5e7eb;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    /* Responsive font size */
    font-size: clamp(0.9rem, 2vw, 1rem);
}

.nav-link:hover {
    background: rgba(168, 85, 247, 0.2);
    color: #fbbf24;
}

/* 🖼️ RESPONSIVE IMAGES */
.responsive-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    
    /* Maintain aspect ratio */
    aspect-ratio: 16 / 9;
}

/* Art direction with picture element */
.hero-image {
    width: 100%;
    height: 50vh;
    object-fit: cover;
    border-radius: 12px;
}

@media (min-width: 768px) {
    .hero-image {
        height: 60vh;
    }
}

@media (min-width: 1024px) {
    .hero-image {
        height: 70vh;
    }
}

/* 📐 RESPONSIVE TYPOGRAPHY SYSTEM */
:root {
    /* Fluid typography scale */
    --font-size-xs: clamp(0.75rem, 2vw, 0.875rem);
    --font-size-sm: clamp(0.875rem, 2.5vw, 1rem);
    --font-size-base: clamp(1rem, 3vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 3.5vw, 1.25rem);
    --font-size-xl: clamp(1.25rem, 4vw, 1.5rem);
    --font-size-2xl: clamp(1.5rem, 5vw, 2rem);
    --font-size-3xl: clamp(2rem, 6vw, 3rem);
    --font-size-4xl: clamp(3rem, 8vw, 4rem);
    
    /* Responsive spacing */
    --space-xs: clamp(0.25rem, 1vw, 0.5rem);
    --space-sm: clamp(0.5rem, 2vw, 1rem);
    --space-md: clamp(1rem, 3vw, 1.5rem);
    --space-lg: clamp(1.5rem, 4vw, 2rem);
    --space-xl: clamp(2rem, 6vw, 3rem);
    --space-2xl: clamp(3rem, 8vw, 4rem);
}

/* Apply responsive typography */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }

/* 🎨 RESPONSIVE LAYOUT COMPONENTS */

/* Responsive sidebar layout */
.layout-with-sidebar {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
    .layout-with-sidebar {
        grid-template-columns: 300px 1fr;
    }
}

/* Responsive card layout */
.card-container {
    display: grid;
    gap: var(--space-md);
    
    /* Auto-fit responsive grid */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* 🌙 DARK MODE SUPPORT */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #0f0f23;
        --bg-secondary: #1a1a2e;
        --text-primary: #e5e7eb;
        --text-secondary: #9ca3af;
    }
}

@media (prefers-color-scheme: light) {
    :root {
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --text-primary: #1f2937;
        --text-secondary: #6b7280;
    }
}

/* 📱 TOUCH-FRIENDLY INTERFACES */
@media (hover: none) and (pointer: coarse) {
    /* Touch device styles */
    .spell-card {
        /* Larger touch targets */
        min-height: 120px;
        padding: var(--space-lg);
    }
    
    .nav-link {
        /* Larger tap targets */
        padding: var(--space-md) var(--space-lg);
        min-height: 44px;
        display: flex;
        align-items: center;
    }
    
    /* Remove hover effects on touch devices */
    .spell-card:hover {
        transform: none;
        box-shadow: none;
    }
}

/* 🔄 RESPONSIVE ANIMATIONS */
@media (prefers-reduced-motion: reduce) {
    /* Respect user's motion preferences */
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* ⚡ PERFORMANCE OPTIMIZATIONS */

/* Optimize font loading */
@font-face {
    font-family: 'MagicalFont';
    src: url('magical-font.woff2') format('woff2');
    font-display: swap; /* Improve loading performance */
}

/* Optimize images for different screen densities */
.high-dpi-image {
    background-image: url('spell-bg-1x.jpg');
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .high-dpi-image {
        background-image: url('spell-bg-2x.jpg');
    }
}

/* 📊 RESPONSIVE DEBUGGING */
/* Uncomment for development debugging */
/*
.debug-responsive::before {
    content: 'XS';
    position: fixed;
    top: 0;
    right: 0;
    background: red;
    color: white;
    padding: 0.5rem;
    z-index: 9999;
}

@media (min-width: 640px) {
    .debug-responsive::before { content: 'SM'; background: orange; }
}

@media (min-width: 768px) {
    .debug-responsive::before { content: 'MD'; background: yellow; color: black; }
}

@media (min-width: 1024px) {
    .debug-responsive::before { content: 'LG'; background: green; }
}

@media (min-width: 1280px) {
    .debug-responsive::before { content: 'XL'; background: blue; }
}
*/

/* 🎯 CONTAINER QUERIES (Modern Browsers) */
@supports (container-type: inline-size) {
    .spell-container {
        container-type: inline-size;
    }
    
    @container (min-width: 400px) {
        .spell-card {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
}
      `,
      practice: `🛡️ **Your Responsive Design Challenge:**

Create a fully responsive SpellAcademia website that works perfectly on all devices:

**Part 1: Mobile-First Layout**
Build a responsive layout starting with mobile:
- Header with collapsible navigation
- Hero section with responsive typography
- Spell card grid that adapts to screen size
- Footer with responsive contact information

**Part 2: Advanced Responsive Techniques**
Implement advanced responsive features:
- Fluid typography using clamp()
- Responsive images with srcset
- Container queries for component-level responsiveness
- Touch-friendly interfaces for mobile devices
- Dark/light mode support

**Part 3: Performance Optimization**
Optimize for mobile performance:
- Critical CSS inlining
- Lazy loading for images
- Responsive image formats (WebP, AVIF)
- Font loading optimization
- Minimize layout shifts

**Part 4: Accessibility & UX**
Ensure excellent user experience:
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences
- High contrast mode support
- Touch gesture support

**Required Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

**HTML Structure to Make Responsive:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SpellAcademia - Responsive Magic</title>
</head>
<body>
    <header class="main-header">
        <nav class="main-nav">
            <div class="nav-logo">🏰 SpellAcademia</div>
            <button class="nav-toggle" aria-label="Toggle navigation">☰</button>
            <ul class="nav-links">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#spells" class="nav-link">Spells</a></li>
                <li><a href="#progress" class="nav-link">Progress</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">Master Web Development Magic</h1>
                <p class="hero-subtitle">Learn HTML, CSS, and JavaScript through magical spells</p>
                <button class="cta-button">Begin Your Journey</button>
            </div>
            <picture class="hero-image">
                <source media="(min-width: 1024px)" srcset="hero-desktop.webp">
                <source media="(min-width: 768px)" srcset="hero-tablet.webp">
                <img src="hero-mobile.webp" alt="Magical castle" loading="lazy">
            </picture>
        </section>

        <section class="spells-section">
            <div class="container">
                <h2 class="section-title">Available Spells</h2>
                <div class="spell-grid">
                    <article class="spell-card">
                        <div class="spell-icon">🔓</div>
                        <h3 class="spell-title">Alohomora</h3>
                        <p class="spell-description">Unlock HTML basics</p>
                        <div class="spell-meta">
                            <span class="difficulty">Beginner</span>
                            <span class="duration">45 min</span>
                        </div>
                        <button class="spell-button">Learn Spell</button>
                    </article>
                    <!-- More spell cards... -->
                </div>
            </div>
        </section>

        <section class="stats-section">
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">1,234</div>
                        <div class="stat-label">Students</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Spells</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">95%</div>
                        <div class="stat-label">Success Rate</div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="main-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>SpellAcademia</h3>
                    <p>Master web development through magical learning</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="GitHub">🐙</a>
                        <a href="#" aria-label="Discord">💬</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
\`\`\`

**CSS Requirements:**
- Use CSS custom properties for consistent theming
- Implement mobile-first media queries
- Use modern CSS features (Grid, Flexbox, clamp())
- Create smooth transitions and animations
- Ensure accessibility compliance

**JavaScript Enhancements:**
- Mobile navigation toggle
- Responsive image lazy loading
- Touch gesture support
- Responsive breakpoint detection
- Performance monitoring

**Testing Checklist:**
- Test on actual devices (phone, tablet, desktop)
- Verify touch interactions work properly
- Check loading performance on slow connections
- Validate accessibility with screen readers
- Test with different font sizes and zoom levels

**Bonus Challenges:**
- Implement Progressive Web App features
- Add offline functionality
- Create responsive data visualizations
- Build responsive forms with validation
- Add print-specific styles`,
      quiz: [
        {
          id: '1',
          question: 'What does the viewport meta tag do?',
          options: [
            'Sets the background color of the page',
            'Controls how the page is displayed on mobile devices',
            'Defines the page title',
            'Sets the font size for mobile devices'
          ],
          correctAnswer: 1,
          explanation: 'The viewport meta tag controls how a webpage is displayed on mobile devices, setting the width and initial scale for proper responsive behavior.',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'Which CSS unit is best for responsive typography?',
          options: [
            'px (pixels)',
            'pt (points)',
            'rem (root em)',
            'cm (centimeters)'
          ],
          correctAnswer: 2,
          explanation: 'rem units are ideal for responsive typography because they scale relative to the root font size, making it easy to create consistent, scalable text.',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'What does "mobile-first" design mean?',
          options: [
            'Only designing for mobile devices',
            'Starting with mobile styles and enhancing for larger screens',
            'Making mobile the most important feature',
            'Testing only on mobile devices'
          ],
          correctAnswer: 1,
          explanation: 'Mobile-first design means starting with styles for mobile devices and then using media queries to enhance the design for larger screens.',
          difficulty: 'medium'
        },
        {
          id: '4',
          question: 'Which CSS function allows for responsive values with minimum, preferred, and maximum?',
          options: [
            'calc()',
            'min()',
            'max()',
            'clamp()'
          ],
          correctAnswer: 3,
          explanation: 'clamp() allows you to set a value that scales between a minimum and maximum, with a preferred value in between - perfect for responsive design.',
          difficulty: 'hard'
        },
        {
          id: '5',
          question: 'What is the purpose of the srcset attribute in img tags?',
          options: [
            'To set the image source',
            'To provide alternative images for different screen sizes/densities',
            'To set the image alt text',
            'To define image loading behavior'
          ],
          correctAnswer: 1,
          explanation: 'srcset allows you to provide multiple image sources for different screen sizes and pixel densities, letting the browser choose the most appropriate one.',
          difficulty: 'hard'
        }
      ],
      magicalFacts: [
        "🛡️ The first responsive website was created in 2010 - now it's essential magic for all web developers!",
        "📱 Over 60% of web traffic comes from mobile devices - responsive design is no longer optional!",
        "🎯 The clamp() CSS function can replace complex media query calculations with a single line",
        "⚡ Container queries are the future of responsive design - components that respond to their own size!",
        "🔮 Viewport units (vw, vh) can create truly fluid layouts that scale with the screen size"
      ]
    },
    prerequisites: ['expecto-patronum']
  }
];