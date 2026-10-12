# Wix setup for the Fit Check quiz

The quiz (hosted on GitHub Pages) sends everything to the existing Wix HTTP function `post_quizLead` in `backend/http-functions.js`, which writes to the **QuizLeads** collection. Three changes are needed on the Wix side, in this order.

## 1. Save every field the quiz sends (most important)

Right now QuizLeads only keeps `email, name, path, tags, resultLabel, fosterDuration, emergency, submittedAt`. The quiz sends much more, and it's being dropped. Please save these too:

| Field | Type | What it is |
|---|---|---|
| `details` | Text (long) | Every question and the person's answer, in plain words |
| `archetype` | Text | The person's best-fit dog archetype key (e.g. `trail-buddy`) |
| `archetypeName` | Text | Same, readable (e.g. `The Trail Buddy`) |
| `matchedDogs` | Text | Names of the dogs who matched (array, store joined with commas) |
| `matchedRescues` | Text | Rescue IDs of matched dogs (array, join with commas) |
| `rescueEmails` | Text | Lead emails for those rescues (array, join with commas) |
| `scope` | Text | Which link they came in on (`all`, a partner ID, or `direct`) |
| `anonymous` | Boolean | `true` when the person finished without leaving an email |
| `subscribe` / `sendCheatSheet` | Boolean | Joined the email list / should get the cheat sheet |
| `rescueName` | Text | Dog profiles only: the partner's rescue name |
| `dogProfile` | Text (long) | Dog profiles only: the ready-to-paste dogs.json entry (store `JSON.stringify(body.dogProfile, null, 2)`) |

The simplest version: insert the whole request body (joining arrays to strings), instead of picking fields one by one. Make `resultLabel` a long text field too; the quiz now puts a full plain-English summary in it.

## 2. Accept submissions with no email

Every finished quiz now sends one record **even if the person never leaves an email**, with `email: ""`, `anonymous: true`, and the tag `anonymous`. This is how Domenica sees everyone who takes the quiz, not only the people who sign up. If the function currently rejects a missing or empty email, please allow it when `anonymous` is `true`. If they also leave their email, a second record arrives with it, so one person who signs up shows up as one anonymous record plus one named record. That's expected.

## 3. Notify Domenica when something important arrives

Please send an email to Domenica whenever a QuizLeads row arrives with any of:
- an email address (a real lead), or
- `path: "dog-profile"` (a partner dog waiting for her review)

Use whatever's easiest (a Wix Automation on new CMS items if available, or a triggered email from the backend). Include `name`, `email`, `path`, and `resultLabel` in the email, since `resultLabel` already reads as a full summary.

## 4. Email the Dog Parent Cheat Sheet automatically

Anyone who subscribes already sees an **Open my cheat sheet** button right away. Their record arrives with `subscribe: true`, `sendCheatSheet: true`, `cheatSheetUrl`, and tags `newsletter` and `cheatsheet` (`path: "subscribe"` when they signed up from the front door without taking a quiz).

**a. Make each subscriber a Wix contact with a "Cheat Sheet" label.** Inside `post_quizLead`, after saving the row (check against the existing code first):

```js
import { contacts } from 'wix-crm-backend';

if (body.sendCheatSheet && body.email) {
  const { contactId } = await contacts.appendOrCreateContact({
    name: { first: body.name || '' },
    emails: [{ email: body.email }]
  });
  const { label } = await contacts.findOrCreateLabel('Cheat Sheet');
  await contacts.labelContact(contactId, [label.key], { suppressAuth: true });
}
```

**b. Create the automation.** Automations → New Automation. Trigger: **Label added to contact** → **Cheat Sheet**. Action: **Send an email** with a short welcome and a button to:
`https://docs.google.com/document/d/1YmBSpngPS5GrfltCLcVLuoFuxS6RAX9FdsNQyMqKbng/edit?usp=sharing`

To add them to the marketing list too, set the contact's email subscription status to subscribed.

## Testing

Take the quiz at `https://legacypawsrescue.github.io/legacy-paws-quiz/` once without an email and once with one, then check QuizLeads for both rows with `details`, `archetype`, and `matchedDogs` filled in. Then run a test dog through `dog-archetype.html?rescue=legacy-paws` and check that `dogProfile` is saved and the notification email arrives.
