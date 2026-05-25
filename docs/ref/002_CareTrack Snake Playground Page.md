# PRD — CareTrack Snake Playground Page

## 1. Feature Name

Snake Care Playground

## 2. Route

Create a new page:

/playground/snake

This page is part of the CareTrack Playground experience.

The existing /playground page may remain the main playground landing page. Later, /playground can contain an animal dropdown that routes users to:

- /playground/gecko
- /playground/snake
- /playground/turtle
- /playground/spider
- /playground/amphibian
- /playground/custom

For now, implement only:

/playground/snake

## 3. Objective

Create a snake-focused interactive playground page that demonstrates how CareTrack helps snake keepers track feeding, refused meals, shed cycles, weight, behavior notes, reminders, and offline care history.

This page is for website visitors who want to understand how CareTrack works before downloading the app.

## 4. Important Product Rule

Snake Playground is NOT a genetics simulator.

Do not include:

- Snake genetics prediction
- Snake morph calculator
- Snake breeding calculator
- COI calculation
- Pairing simulation
- Offspring probability
- Trait inheritance calculator

Those advanced genetics playground features are gecko-only.

Snake Playground must focus on practical care tracking.

## 5. Target Users

Primary users:

- Ball python keepers
- Corn snake keepers
- Boa keepers
- Hognose snake keepers
- Kingsnake keepers
- Multi-snake reptile keepers

Secondary users:

- Beginner snake keepers
- Reptile keepers replacing notebooks or spreadsheets
- Users comparing CareTrack before downloading
- Keepers who want reminder-based care tracking

## 6. SEO Goal

The page should help CareTrack rank for snake-related care tracking keywords.

Primary keyword:

snake care tracker

Secondary keywords:

- snake feeding tracker
- snake shed tracker
- ball python care tracker
- ball python feeding tracker
- corn snake care tracker
- snake weight tracker
- reptile feeding reminder
- snake care app
- offline reptile care tracker
- reptile care log app

## 7. Page Metadata

Title:

Snake Care Tracker Playground | Feeding, Sheds, Weight & Reminders

Meta description:

Try the CareTrack Snake Playground. Preview feeding logs, refused meals, shed tracking, weight, behavior notes, reminders, and offline snake care history.

Canonical URL:

https://thecaretracks.com/playground/snake

Open Graph title:

Snake Care Tracker Playground | CareTrack

Open Graph description:

Preview how CareTrack helps snake keepers track feeding, sheds, weight, behavior, reminders, and offline care logs.

Twitter title:

Snake Care Tracker Playground | CareTrack

Twitter description:

Try a snake care tracker playground for feeding logs, shed history, weight tracking, behavior notes, and reminders.

## 8. Page H1

Snake Care Tracker Playground

## 9. Hero Section

### H1

Snake Care Tracker Playground

### Subtitle

Preview how CareTrack helps snake keepers organize feeding history, refused meals, shed cycles, weight, behavior notes, reminders, and offline care records.

### Primary CTA

Download CareTrack

### Secondary CTA

Try the Demo

### Hero bullets

- Track feeding dates, prey notes, and refused meals
- Record sheds, weight, behavior, and care observations
- Preview reminders and offline snake care history

### Hero visual

Use a snake-focused product visual.

For now, use a placeholder card if final images are not ready.

Placeholder label:

TODO: Add snake playground hero image

Hero image direction for later generation:

A calm ball python beside a modern smartphone UI showing a snake profile, last feeding, next feeding reminder, last shed, weight, and care notes. Clean green and cream CareTrack style. Friendly pet-care feeling. Not scary, not aggressive.

Alt text:

CareTrack snake playground showing feeding, shed, weight, and reminder tracking for a snake profile

## 10. Page Layout

The page should contain these sections:

1. Hero
2. Animal Playground Switcher
3. Snake Playground Demo
4. Live Care Preview
5. Care Timeline Preview
6. What Snake Keepers Can Track
7. Built for Popular Pet Snakes
8. Offline Snake Care Records
9. Image Placeholder Section
10. FAQ
11. Final CTA

## 11. Animal Playground Switcher

Add a small switcher near the top so users understand this is part of a multi-animal playground system.

### Section title

Choose Playground

### Options

- Gecko Genetics
- Snake Care
- Turtle Care — Coming soon
- Spider / Tarantula Care — Coming soon
- Amphibian Care — Coming soon
- Custom Species — Coming soon

### Behavior

Current active option:

Snake Care

Clicking Gecko Genetics should route to:

/playground

or /playground/gecko if that route exists.

Clicking Snake Care keeps user on:

/playground/snake

Coming soon options should not break the page.

If a user clicks a coming soon option, show a small message:

This playground mode is coming soon. CareTrack is being expanded to show more animal-specific care workflows.

## 12. Snake Playground Demo Section

### H2

Try a Snake Care Workflow

### Intro copy

Use the controls below to preview how CareTrack organizes snake care records. This demo does not diagnose health issues or provide veterinary advice. It simply shows how feeding, shed, weight, behavior, and reminder records can be organized.

### Layout

Desktop:

Two-column layout.

Left column:
Interactive controls.

Right column:
Live preview card and timeline.

Mobile:

Stacked layout.

Controls first.
Preview second.
Timeline third.

## 13. Snake Playground Controls

Create interactive controls.

### Control 1 — Snake Species

Label:

Snake type

Options:

- Ball Python
- Corn Snake
- Boa
- Hognose Snake
- Kingsnake
- Custom Snake

Default:

Ball Python

### Control 2 — Life Stage

Label:

Life stage

Options:

- Hatchling / Juvenile
- Sub-adult
- Adult

Default:

Adult

### Control 3 — Last Feeding

Label:

Last feeding

Options:

- Today
- 3 days ago
- 7 days ago
- 10 days ago
- 14 days ago
- 21 days ago
- Custom

Default:

10 days ago

### Control 4 — Feeding Result

Label:

Feeding result

Options:

- Accepted
- Refused
- Skipped
- Not offered yet

Default:

Accepted

### Control 5 — Food / Prey Note

Label:

Food / prey note

Options:

- Pinky mouse
- Fuzzy mouse
- Hopper mouse
- Adult mouse
- Rat pup
- Small rat
- Custom / not specified

Default:

Custom / not specified

Important:

Do not give strict feeding advice. This is only a care-log demo.

### Control 6 — Last Shed

Label:

Last shed

Options:

- This week
- 2 weeks ago
- 1 month ago
- 2 months ago
- Unknown

Default:

1 month ago

### Control 7 — Shed Status

Label:

Shed status

Options:

- Complete
- Incomplete
- In shed
- Unknown

Default:

Complete

### Control 8 — Weight

Label:

Weight

Input type:

Number

Unit selector:

- g
- kg

Default:

Leave empty or use a sample placeholder.

Placeholder:

Example: 850

### Control 9 — Behavior Note

Label:

Behavior

Options:

- Normal
- Hiding more
- Active
- Defensive
- Refused food
- Pre-shed signs
- Custom note

Default:

Normal

### Control 10 — Reminder Interval

Label:

Next feeding reminder

Options:

- 7 days
- 10 days
- 14 days
- 21 days
- 30 days
- Custom

Default:

10 days

## 14. Live Care Preview

The preview card should update when the user changes controls.

### Card title

Snake Care Preview

### Example preview

Milo — Ball Python

Life stage:
Adult

Last feeding:
10 days ago

Feeding result:
Accepted

Food note:
Adult mouse

Last shed:
1 month ago

Shed status:
Complete

Weight:
850 g

Behavior:
Normal

Next reminder:
In 10 days

Care status:
On track

## 15. Care Status Logic

This logic is demo-only and must not sound medical.

### Status labels

- On track
- Due soon
- Feeding overdue
- Watch pattern
- In shed
- Missing data

### Logic rules

If feeding result is Refused:

Status:
Watch pattern

Message:
This feeding was refused. CareTrack helps you keep refusal notes so you can review patterns over time.

If shed status is In shed:

Status:
In shed

Message:
Shed-related notes help you connect feeding, behavior, and shed timing.

If last shed is Unknown:

Status:
Missing data

Message:
Start logging sheds to build a clearer care history.

If last feeding is beyond selected reminder interval:

Status:
Feeding overdue

Message:
This snake may be due for a feeding check based on the reminder interval you selected.

If feeding result is Accepted and reminder is not overdue:

Status:
On track

Message:
Care history is organized and the next reminder is ready.

### Forbidden wording

Do not say:

- Healthy
- Sick
- Safe
- Unsafe
- Diagnosis
- Treatment
- Medical problem
- Guaranteed
- Emergency

Use recordkeeping language only.

## 16. Timeline Preview

Add a care timeline below the live preview.

### H3

Care Timeline

### Example entries

- 12 May — Feeding accepted
- 20 May — Shed recorded
- 22 May — Weight updated
- 26 May — Behavior note added
- 30 May — Next feeding reminder

Timeline should update lightly based on selected values where possible.

If full dynamic timeline is too much for first version, use a static sample timeline.

## 17. What Snake Keepers Can Track Section

### H2

What Snake Keepers Can Track

Create six feature cards.

### Card 1

Title:
Feeding History

Copy:
Record when food was offered, what was offered, whether it was accepted, and any feeding notes.

### Card 2

Title:
Refused Meal Notes

Copy:
Log refused meals so you can review feeding patterns instead of relying on memory.

### Card 3

Title:
Shed Tracking

Copy:
Track shed dates and shed notes to understand your snake’s normal rhythm over time.

### Card 4

Title:
Weight Tracking

Copy:
Connect weight records with feeding, shedding, and behavior history.

### Card 5

Title:
Behavior Notes

Copy:
Record hiding, activity level, defensive behavior, appetite changes, and other observations.

### Card 6

Title:
Care Reminders

Copy:
Set reminder intervals based on your snake’s routine and check what is due next.

## 18. Built for Popular Pet Snakes Section

### H2

Built for Popular Pet Snakes

Create species cards.

### Card 1 — Ball Python

Title:
Ball Python Care Tracking

Copy:
Track feeding intervals, refused meals, shed cycles, weight, and behavior notes for ball pythons.

Bullets:

- Feeding history
- Refused meal notes
- Shed tracking
- Weight records
- Reminder intervals

### Card 2 — Corn Snake

Title:
Corn Snake Feeding & Shed Logs

Copy:
Keep feeding, shed, weight, and care observations organized for corn snakes.

Bullets:

- Feeding dates
- Shed history
- Weight logs
- Behavior notes
- Care reminders

### Card 3 — Boa

Title:
Boa Care History

Copy:
Track longer feeding intervals, weight changes, sheds, and long-term care observations for boas.

Bullets:

- Feeding schedule
- Shed records
- Weight trends
- Behavior notes
- Long-term history

### Card 4 — Hognose Snake

Title:
Hognose Snake Care Notes

Copy:
Record feeding attempts, refused meals, shed cycles, weight, and behavior patterns for hognose snakes.

Bullets:

- Feeding attempt notes
- Refusal history
- Shed tracking
- Weight logs
- Behavior notes

### Card 5 — Custom Snake

Title:
Custom Snake Profile

Copy:
If your snake is not listed, create a custom snake profile and define your own reminder routine.

Bullets:

- Custom species name
- Custom feeding interval
- Reminder time
- Notes
- Offline history

## 19. Offline Snake Care Records Section

### H2

Offline Snake Care Records

### Copy

CareTrack is designed for keepers who want fast, reliable care records without depending on a constant internet connection. Your snake profiles and care history remain available on your device, even when you are offline.

### Bullets

- Works without internet
- Fast care logging
- Local care history
- Useful for reptile rooms and routine checks
- No complicated setup

## 20. Image Placeholder Section

### H2

Snake Playground Images Coming Next

This section should prepare the page for future generated snake images.

Create placeholder cards.

### Placeholder 1

Title:
Snake Playground Hero

Copy:
TODO: Add hero image showing a calm snake and a CareTrack mobile preview.

Alt text:
CareTrack snake playground hero with mobile snake care tracker preview

### Placeholder 2

Title:
Feeding Tracker Preview

Copy:
TODO: Add image showing feeding history, accepted/refused result, and next feeding reminder.

Alt text:
Snake feeding tracker preview showing last feeding and next reminder

### Placeholder 3

Title:
Shed Tracker Preview

Copy:
TODO: Add image showing last shed, shed status, and behavior notes.

Alt text:
Snake shed tracker preview showing shed history and care notes

### Placeholder 4

Title:
Weight and Behavior Preview

Copy:
TODO: Add image showing snake weight log, behavior notes, and care timeline.

Alt text:
Snake weight and behavior tracker preview in CareTrack

## 21. Future Image Generation Prompts

Add these prompts into a comment or documentation block for later use.

### Prompt 1 — Hero Image

Professional product marketing image for a snake care tracker app. A calm ball python beside a modern smartphone UI showing snake profile, last feeding, next feeding reminder, last shed, weight, and behavior notes. Clean green and cream color palette, friendly exotic pet care style, not scary, not aggressive, high-quality SaaS landing page aesthetic.

### Prompt 2 — Feeding Tracker

Modern mobile UI mockup for a snake feeding tracker. Show snake profile, last feeding date, feeding result accepted or refused, food/prey note, and next feeding reminder. Clean card-based interface, green accent color, CareTrack-style design.

### Prompt 3 — Shed Tracker

Modern mobile UI mockup showing snake shed tracking. Include last shed date, shed status, behavior note, and care timeline. Calm corn snake visual, clean reptile care app style.

### Prompt 4 — Species Cards

Friendly illustration set of popular pet snakes: ball python, corn snake, boa, hognose snake, and kingsnake. Clean vector style, natural colors, calm educational design, no aggressive posture.

## 22. FAQ Section

### H2

Snake Playground FAQ

### FAQ 1

Question:
What is the Snake Playground?

Answer:
The Snake Playground is an interactive preview that shows how CareTrack can organize snake feeding, shed, weight, behavior, reminder, and care-history records.

### FAQ 2

Question:
Can I use CareTrack for ball pythons?

Answer:
Yes. CareTrack can help ball python keepers track feeding history, refused meals, shed cycles, weight, behavior notes, and feeding reminders.

### FAQ 3

Question:
Can I track refused meals?

Answer:
Yes. Use feeding result and notes to record refused meals and review feeding patterns over time.

### FAQ 4

Question:
Can I track snake sheds?

Answer:
Yes. CareTrack helps you log shed dates and shed-related notes so you can follow your snake’s shed history.

### FAQ 5

Question:
Does Snake Playground predict snake genetics?

Answer:
No. Snake Playground is focused on care tracking. Genetics prediction is currently only for gecko-related playground features.

### FAQ 6

Question:
Does CareTrack work offline?

Answer:
Yes. CareTrack is designed around offline-first care records, so your snake care history can remain available on your device.

### FAQ 7

Question:
Does CareTrack replace veterinary advice?

Answer:
No. CareTrack helps organize care records and educational information. It does not replace advice from an experienced reptile veterinarian.

## 23. Final CTA Section

### H2

Track Real Snake Care in CareTrack

### Copy

The playground shows how CareTrack can organize snake care. Download the app to create real profiles, set reminders, and keep feeding, shed, weight, behavior, and care history organized.

### Primary CTA

Download on Google Play

### Secondary CTA

Explore All Features

## 24. Internal Links

Add links to:

- /
- /playground
- /playground/snake
- /features/reptile-care-tracker
- /features/feeding-reminders
- /features/offline-care-logs
- /features/snake-care-tracker
- /support

If /playground/gecko exists, link to it.

If not, link Gecko Genetics option to /playground.

## 25. Navigation Update

Add Snake Playground link where relevant.

Possible places:

- Playground dropdown
- Homepage feature section
- Snake care tracker page
- Footer
- SEO sitemap

Anchor text:

Snake Care Playground

Do not use generic anchor text like “click here”.

## 26. Structured Data

Add SoftwareApplication JSON-LD.

Use this template:

{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CareTrack",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Android",
  "description": "Offline snake care tracker for feeding history, shed tracking, weight records, behavior notes, reminders, and reptile care logs.",
  "url": "https://thecaretracks.com/playground/snake",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

If the project supports FAQPage JSON-LD, add FAQPage structured data for the FAQ section.

## 27. Technical Requirements

- Create /playground/snake route.
- Add responsive page layout.
- Add snake playground controls.
- Add live preview state.
- Add demo care status helper.
- Add static or dynamic care timeline.
- Add SEO metadata.
- Add Open Graph metadata.
- Add canonical URL.
- Add structured data.
- Add internal links.
- Add page to sitemap.
- Add image placeholders with alt text.
- Keep UI consistent with existing CareTrack styling.
- Do not break existing /playground page.
- Do not modify gecko genetics logic unless needed for navigation.
- Build must pass.

## 28. Suggested Component Structure

Use the existing project structure if different. Otherwise use:

src/pages/SnakePlaygroundPage.tsx
src/components/playground/SnakePlaygroundControls.tsx
src/components/playground/SnakeCarePreview.tsx
src/components/playground/SnakeCareTimeline.tsx
src/components/playground/PlaygroundSwitcher.tsx
src/data/snakePlaygroundOptions.ts
src/utils/snakeCareDemoStatus.ts

## 29. Suggested State Model

type SnakePlaygroundState = {
  species: "ball_python" | "corn_snake" | "boa" | "hognose" | "kingsnake" | "custom";
  lifeStage: "juvenile" | "sub_adult" | "adult";
  lastFeeding: "today" | "3_days" | "7_days" | "10_days" | "14_days" | "21_days" | "custom";
  feedingResult: "accepted" | "refused" | "skipped" | "not_offered";
  preyNote: "pinky_mouse" | "fuzzy_mouse" | "hopper_mouse" | "adult_mouse" | "rat_pup" | "small_rat" | "custom";
  lastShed: "this_week" | "2_weeks" | "1_month" | "2_months" | "unknown";
  shedStatus: "complete" | "incomplete" | "in_shed" | "unknown";
  weightValue?: number;
  weightUnit: "g" | "kg";
  behavior: "normal" | "hiding_more" | "active" | "defensive" | "refused_food" | "pre_shed" | "custom";
  reminderIntervalDays: 7 | 10 | 14 | 21 | 30 | number;
};

## 30. Suggested Demo Status Helper

Implement helper logic similar to this:

function getSnakeCareDemoStatus(state: SnakePlaygroundState) {
  if (state.feedingResult === "refused") {
    return {
      label: "Watch pattern",
      tone: "warning",
      message: "This feeding was refused. CareTrack helps you keep refusal notes so you can review patterns over time."
    };
  }

  if (state.shedStatus === "in_shed") {
    return {
      label: "In shed",
      tone: "info",
      message: "Shed-related notes help you connect feeding, behavior, and shed timing."
    };
  }

  if (state.lastShed === "unknown") {
    return {
      label: "Missing data",
      tone: "neutral",
      message: "Start logging sheds to build a clearer care history."
    };
  }

  if (isFeedingOverdue(state)) {
    return {
      label: "Feeding overdue",
      tone: "warning",
      message: "This snake may be due for a feeding check based on the reminder interval you selected."
    };
  }

  return {
    label: "On track",
    tone: "success",
    message: "Care history is organized and the next reminder is ready."
  };
}

Do not use medical or diagnostic wording.

## 31. Accessibility Requirements

- All form controls must have visible labels.
- Dropdowns must be keyboard accessible.
- Buttons must have accessible names.
- Cards must have readable contrast.
- Status labels must not rely only on color.
- Images must include alt text.
- Coming soon links must be clear and non-confusing.
- Page should work well on mobile.

## 32. Analytics Events

If analytics exists, add these events:

snake_playground_view
snake_playground_control_changed
snake_playground_download_clicked
snake_playground_switcher_clicked
snake_playground_faq_opened

Event properties:

- species
- lifeStage
- feedingResult
- shedStatus
- sourceSection

## 33. Content Rules

Do:

- Focus on snake care tracking.
- Mention feeding, refused meals, sheds, weight, behavior, reminders, and offline history.
- Use beginner-friendly language.
- Include ball python, corn snake, boa, hognose, kingsnake, and custom snake examples.
- Add clear CTA to download CareTrack.
- Keep all wording aligned with app functionality.

Do not:

- Mention snake genetics.
- Mention snake breeding prediction.
- Mention COI.
- Give veterinary diagnosis.
- Give treatment instructions.
- Use scary or aggressive snake imagery.
- Claim guaranteed health outcomes.
- Overclaim features that do not exist.

## 34. Acceptance Criteria

AC1:
A new page exists at /playground/snake.

AC2:
The page has the H1:
Snake Care Tracker Playground

AC3:
The page has SEO metadata and canonical URL.

AC4:
The page includes a Playground Switcher with Gecko, Snake, and future animal modes.

AC5:
Snake is the active selected mode.

AC6:
The page includes interactive controls for species, life stage, last feeding, feeding result, prey note, last shed, shed status, weight, behavior, and reminder interval.

AC7:
The page includes a live preview card that updates based on selected controls.

AC8:
The page includes a care status label using non-medical wording.

AC9:
The page includes a care timeline preview.

AC10:
The page includes cards explaining feeding history, refused meal notes, shed tracking, weight tracking, behavior notes, and care reminders.

AC11:
The page includes popular snake species cards.

AC12:
The page includes image placeholders for future generated snake visuals.

AC13:
The page includes FAQ content.

AC14:
The page includes Google Play CTA above the fold and at the bottom.

AC15:
The page does not mention snake genetics, breeding prediction, offspring probability, or COI.

AC16:
The page includes SoftwareApplication structured data.

AC17:
The page is added to sitemap.

AC18:
The page is linked from /playground or another relevant page.

AC19:
The page is responsive and accessible.

AC20:
The project builds successfully.