/* ============================================================
   LEGACY PAWS: THE EIGHT DOG ARCHETYPES
   One source of truth, used by match.html and dog-archetype.html.
   ============================================================ */
const ARCHETYPES = {
  'shadow': {
    name: 'The Shadow',
    scene: 'Follows you room to room, lies at your feet, wants to be wherever you are.',
    traits: 'Deeply people-bonded. Hates being apart from their person, even briefly.',
    fit: "Someone home a lot who wants a constant companion. Not a dog for a house that's empty most of the day.",
    lookFor: ["Follows people from room to room and settles faster when someone is close by", "Checks in with eye contact on walks without being asked", "Leans into you or lies on your feet when you sit down", "Ask: how does he do when his foster leaves the house, even for a few minutes?"],
    redFlags: ["Wanders off and ignores people, preferring to be left alone", "Can't settle at all when his person steps out of sight, if your days have long stretches away from home"]
  },
  'lap-anchor': {
    name: 'The Lap Anchor',
    scene: 'Small or low-energy, happiest melted into your lap all evening.',
    traits: 'Low energy, affectionate, perfectly content indoors.',
    fit: 'Couch lovers, apartment dwellers, gentle quiet homes.',
    lookFor: ["Dozes through everyday noise and settles easily indoors", "Is content after a short walk and doesn't keep asking for more", "Seeks out laps, touch, and closeness more than toys", "Ask: how much exercise does he need before he settles in the evening?"],
    redFlags: ["Still bouncing off the walls after an hour of exercise", "The foster says he needs a job or he gets destructive", "Barks at every sound in the hallway or outside the window"]
  },
  'porch-sitter': {
    name: 'The Porch Sitter',
    scene: 'Calm and easygoing, wants slow mornings, short walks, and a sunny spot to rest.',
    traits: 'Low demands, easy company, content to just be near you without needing much.',
    fit: 'Retirees, quiet homes, anyone who wants steady, low-key company.',
    lookFor: ["Naturally mellow, often older, happy with a slow, short walk", "Lies down near you instead of asking you to play", "Walks politely without pulling", "Ask: what are his medical needs and mobility like now, and what will they likely be in a year?"],
    redFlags: ["A young dog who needs hours of exercise a day", "Pulls hard on the leash, enough to pull you off your feet", "Seems calm in a kennel but nobody knows how he acts in a home. Shut down can look a lot like calm"]
  },
  'trail-buddy': {
    name: 'The Trail Buddy',
    scene: 'Needs the long hike, the run, the job. Genuinely lit up outdoors.',
    traits: 'High energy, athletic, needs real purpose and output, not just a yard.',
    fit: 'Active, outdoorsy people who want a true partner, not a couch companion.',
    lookFor: ["Has real stamina and bounces back fast after a long walk", "Stays curious and steady in new places, new sounds, and new smells", "Checks in with you outside instead of tuning you out", "Ask: has he been hiked? How is his recall? How does he do with wildlife and dogs on the trail?"],
    redFlags: ["Panics in new places or falls apart at sudden sounds", "Overheats easily, struggles to breathe on hard exercise, or has joint problems", "Strong urge to chase with no recall, if you want to hike off-leash", "Reacts hard to other dogs he passes on a trail"]
  },
  'backyard-romper': {
    name: 'The Backyard Romper',
    scene: 'Playful and bouncy, needs room and a fence to burn it all off.',
    traits: 'High energy, needs space, lives for play.',
    fit: 'Homes with a yard, active families who love to play.',
    lookFor: ["Loves toys and fetch, and plays with real joy", "Can stop playing and calm down when asked", "Plays nicely, without grabbing hands or clothes", "Ask: has he ever jumped or dug out of a fence? Can he be trusted in a yard?"],
    redFlags: ["A history of escaping fences by jumping, climbing, or digging", "Plays so rough he can't calm down, especially if you have kids", "Guards toys, balls, or sticks from people or other dogs"]
  },
  'slow-trust-sweetheart': {
    name: 'The Slow-Trust Sweetheart',
    scene: 'Shy at first, then completely devoted. Blooms in a patient, quiet home.',
    traits: 'Sensitive or under-socialized. Needs time, and trust has to be earned.',
    fit: 'Patient, calm people who are happy to let a dog open up on their own schedule.',
    lookFor: ["Shy but curious. Sniffs you, backs off, then comes back for more", "Eventually takes a treat from your hand", "Recovers from a startle in a minute or two", "Warms up a little more each visit. Ask what helped him trust his foster"],
    redFlags: ["Fear that has turned into snapping or biting with little warning, if you have kids or lots of visitors", "Still so frozen after several quiet days that he won't eat. Ask about professional support before you commit", "Needs total quiet, if your house is rarely quiet"]
  },
  'family-glue': {
    name: 'The Family Glue',
    scene: 'Easygoing and kid-tolerant, rolls with a busy, noisy house.',
    traits: 'Adaptable, social, unbothered by chaos.',
    fit: 'Families with kids and a full household.',
    lookFor: ["Stays loose and wiggly when the house gets loud", "Recovers fast from a dropped pan or a slammed door", "Lets people gently handle his paws, ears, and the space around his food bowl", "Ask: has he actually been around kids the ages of yours, and how did it go?"],
    redFlags: ["Hides, shuts down, or leaves the room when the house gets loud", "Guards food, toys, or his bed. Kids can't always read that warning in time", "So mouthy or jumpy he knocks people down", "Nips at heels when people run"]
  },
  'one-person-dog': {
    name: 'The One-Person Dog',
    scene: 'Bonds hard to a single human. Wants you, and mostly you.',
    traits: 'Selective and intensely loyal.',
    fit: 'A single adopter, or a home with one clear primary person.',
    lookFor: ["Picks one person and sticks with them, while staying polite with others", "Calm and steady with his person, cautious but not aggressive with strangers", "Ask: how does he act when visitors come over or someone walks up to his person?"],
    redFlags: ["Growls or stiffens when someone walks up to his person. That's guarding, not loyalty", "Can't settle at all when his person leaves the house", "You have a partner or family who all want to be close to the dog"]
  }
};
const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);
