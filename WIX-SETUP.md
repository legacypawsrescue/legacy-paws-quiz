# Emailing the Dog Parent Cheat Sheet automatically

The quiz already does its part:

- Anyone who subscribes sees an **Open my cheat sheet** button right away.
- Their info is sent to the existing Wix endpoint (`/_functions/quizLead`) with:
  - `subscribe: true`
  - `sendCheatSheet: true`
  - `cheatSheetUrl: "https://docs.google.com/document/d/1YmBSpngPS5GrfltCLcVLuoFuxS6RAX9FdsNQyMqKbng/edit?usp=sharing"`
  - tags including `newsletter` and `cheatsheet`
  - `path: "subscribe"` when they signed up from the front door without taking a quiz

The email itself has to be sent by Wix. That takes two small pieces.

## 1. Make each subscriber a Wix contact with a "Cheat Sheet" label

In the `quizLead` function in `backend/http-functions.js`, after the row is saved to QuizLeads, add something like this (check it against the existing code first):

```js
import { contacts } from 'wix-crm-backend';

// inside post_quizLead, after saving the QuizLeads row:
if (body.sendCheatSheet) {
  const { contactId } = await contacts.appendOrCreateContact({
    name: { first: body.name || '' },
    emails: [{ email: body.email }]
  });
  const { label } = await contacts.findOrCreateLabel('Cheat Sheet');
  await contacts.labelContact(contactId, [label.key], { suppressAuth: true });
}
```

If the function already creates a contact, you only need the label lines.

## 2. Create the automation in the Wix dashboard

1. Go to **Automations**, then **New Automation**.
2. Trigger: **Label added to contact**, and choose **Cheat Sheet**.
3. Action: **Send an email**. Write a short welcome email with a button linking to the cheat sheet URL above.
4. Turn it on, then test it by subscribing on the quiz with your own email.

To have them on your marketing email list too, make sure the contact's email subscription status is set to subscribed (in the contact settings, or in the same backend code).
