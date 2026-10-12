/* ============================================================
   LEGACY PAWS: THE EIGHT DOG ARCHETYPES
   One source of truth, used by match.html and dog-archetype.html.
   ============================================================ */
const ARCHETYPES = {
  'shadow': {
    name: 'The Shadow',
    scene: 'Follows you room to room, lies at your feet, wants to be wherever you are.',
    traits: 'Deeply people-bonded. Hates being apart from their person, even briefly.',
    fit: "Someone home a lot who wants a constant companion. Not a dog for a house that's empty most of the day."
  },
  'lap-anchor': {
    name: 'The Lap Anchor',
    scene: 'Small or low-energy, happiest melted into your lap all evening.',
    traits: 'Low energy, affectionate, perfectly content indoors.',
    fit: 'Couch lovers, apartment dwellers, gentle quiet homes.'
  },
  'porch-sitter': {
    name: 'The Porch Sitter',
    scene: 'Calm and easygoing, wants slow mornings, short walks, and a sunny spot to rest.',
    traits: 'Low demands, easy company, content to just be near you without needing much.',
    fit: 'Retirees, quiet homes, anyone who wants steady, low-key company.'
  },
  'trail-buddy': {
    name: 'The Trail Buddy',
    scene: 'Needs the long hike, the run, the job. Genuinely lit up outdoors.',
    traits: 'High energy, athletic, needs real purpose and output, not just a yard.',
    fit: 'Active, outdoorsy people who want a true partner, not a couch companion.'
  },
  'backyard-romper': {
    name: 'The Backyard Romper',
    scene: 'Playful and bouncy, needs room and a fence to burn it all off.',
    traits: 'High energy, needs space, lives for play.',
    fit: 'Homes with a yard, active families who love to play.'
  },
  'slow-trust-sweetheart': {
    name: 'The Slow-Trust Sweetheart',
    scene: 'Shy at first, then completely devoted. Blooms in a patient, quiet home.',
    traits: 'Sensitive or under-socialized. Needs time, and trust has to be earned.',
    fit: 'Patient, calm people who are happy to let a dog open up on their own schedule.'
  },
  'family-glue': {
    name: 'The Family Glue',
    scene: 'Easygoing and kid-tolerant, rolls with a busy, noisy house.',
    traits: 'Adaptable, social, unbothered by chaos.',
    fit: 'Families with kids and a full household.'
  },
  'one-person-dog': {
    name: 'The One-Person Dog',
    scene: 'Bonds hard to a single human. Wants you, and mostly you.',
    traits: 'Selective and intensely loyal.',
    fit: 'A single adopter, or a home with one clear primary person.'
  }
};
const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);
