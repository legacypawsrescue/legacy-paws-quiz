# Partner rescues and the Fit Check

The Fit Check is an honest matching quiz. People answer questions about their home and their life, and they only see the dogs who would actually be safe and happy there, with the best fit for their life first.

**Partnership is by invitation.** We bring in rescues who share how we work: taking the time to learn who a dog really is, placing dogs on purpose, and telling the truth about the hard parts. No one can add dogs to the quiz on their own. Every partner is approved by Legacy Paws, and every dog is reviewed before it goes live.

## How a dog gets into the quiz

1. **We approve the rescue.** Legacy Paws adds the rescue to `dogs.json` with `"approved": true`. Until then, none of that rescue's dogs can show up anywhere, even if they're in the file.
2. **The partner assesses each dog** with the Dog Archetype Assessment:
   `https://legacypawsrescue.github.io/legacy-paws-quiz/dog-archetype.html?rescue=RESCUE-ID`
   It takes about five minutes. They answer nine questions about how the dog actually acts, the safety questions (kids, other dogs, cats, small animals, experienced handler), and the dog's story. They see the dog's archetype, then send the profile to us.
3. **We review it.** The profile lands in QuizLeads tagged `dog-profile` and `needs-review`. The result screen also has a ready-to-paste entry for `dogs.json` under "For the Legacy Paws team."
4. **We add it.** Paste the entry into `dogs.json`. The dog appears in the quiz.

To pause a partner, change their `"approved"` to `false`. All their dogs disappear from the quiz right away, without deleting anything.

## The eight archetypes

| Archetype | In one line |
|---|---|
| The Shadow | Follows you room to room, wants to be wherever you are. |
| The Lap Anchor | Low-energy, happiest melted into your lap all evening. |
| The Porch Sitter | Slow mornings, short walks, a sunny spot to rest. |
| The Trail Buddy | Needs the long hike, the run, the job. |
| The Backyard Romper | Playful and bouncy, needs room and a fence. |
| The Slow-Trust Sweetheart | Shy at first, then completely devoted. |
| The Family Glue | Easygoing and kid-tolerant, rolls with a busy house. |
| The One-Person Dog | Bonds hard to one human. |

The safety answers decide **who sees** a dog. The archetype decides **how well they fit** and the order dogs appear in.

## The links

| What it is | Link |
|---|---|
| Front door (find a match, help with my dog, free cheat sheet) | `https://legacypawsrescue.github.io/legacy-paws-quiz/` |
| Matching quiz, every approved partner's dogs | `.../match.html` |
| Matching quiz, one partner's dogs only | `.../match.html?rescue=RESCUE-ID` |
| Help with my dog | `.../help.html` |
| Dog Archetype Assessment (staff and approved partners) | `.../dog-archetype.html?rescue=RESCUE-ID` |

A partner shares their own matching link (for example `match.html?rescue=animalcity`). People who come in through it see only that rescue's dogs and see the rescue's name at the top.

**Every application goes through Legacy Paws.** People choose adopt or foster at the start of the quiz. At the end they're sent to Legacy Paws' foster-to-adopt application (adopt) or foster application (foster), even if no dog matches yet. If a partner's dog caught their eye, they tap "I'm interested in [dog]" and mention that dog on the application. Legacy Paws gets to know them first, then makes the match together with the partner caring for that dog, so partners receive screened, interested people rather than cold applications.

## Adding an approved rescue (Legacy Paws only)

Under `"rescues"` in `dogs.json`. The key (like `"animalcity"`) becomes their link id: lowercase, no spaces.

```json
"animalcity": {
  "name": "AnimalCity",
  "approved": true,
  "website": "https://example.org",
  "logo": "",
  "email": "hello@example.org",
  "adopt_url": "https://example.org/adopt"
}
```

Each dog's entry comes from the assessment. Fields, if you ever edit one by hand:

- `status`: `available`, `adopted` (moves into the success stories), or `resident` (never shown for adoption)
- `archetype`: `shadow`, `lap-anchor`, `porch-sitter`, `trail-buddy`, `backyard-romper`, `slow-trust-sweetheart`, `family-glue`, `one-person-dog`
- `not_with`: any of `young_kids`, `kids`, `dogs`, `cats`, `small_animals`
- `experienced_only`: `true` keeps the dog from first-time owners

## Where the leads go

Every finished quiz lands in the Legacy Paws QuizLeads collection with whether they want to adopt or foster (`intent:adopt`, `intent:foster`), the dogs they're interested in (`interested:biscuit`), the link they came in through (`via:animalcity`), and whether they clicked through to the application (`application-click`). Legacy Paws follows up first, then brings the partner in.

## Is the assessment page private?

It isn't linked from anywhere public and asks search engines not to list it, but anyone with the link could open it. That's okay, because finishing it only *sends a profile to us for review*. It can't put a dog in the quiz. Only Legacy Paws can do that.
