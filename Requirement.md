# Interactive Biology Learning Web

## 1. Overview

Build a modern **interactive Biology learning website for students**.

The website helps students learn Biology through:

* Short and easy-to-understand lessons.
* Visual explanations.
* Interactive 2D diagrams.
* Small quizzes.
* Animations and micro-interactions.
* Searchable textbook content.
* A clean and engaging learning experience.

The website should feel more like an **interactive digital Biology book** than a traditional LMS.

> **Core idea: Learn Biology by exploring, not just reading.**

---

# 2. Target Users

Primary users:

> **High-school students studying Biology.**

The current content is based on three scanned PDF textbooks:

```text
/books
├── sinh-11.pdf
├── sinh-12.pdf
└── sinh-13.pdf
```

The application should be designed primarily for students.

Teachers are not the primary users in the current version.

---

# 3. Important Content Rule

The three PDF books are the **source of truth**.

The AI must NOT invent Biology knowledge and present it as textbook content.

If the required information does not exist in the available PDFs:

* Do not fabricate it.
* Use placeholder/demo content if UI development requires it.
* Clearly mark demo content as demo/mock data.

When OCR is used, the original PDF page should remain accessible for verification.

---

# 4. Product Philosophy

The website should NOT feel like:

```text
Admin Dashboard
Course Management System
Enterprise LMS
```

Instead, it should feel like:

```text
Interactive Digital Textbook
+
Biology Exploration
+
Light Gamification
```

The student should be encouraged to:

```text
Discover
   ↓
Read
   ↓
Interact
   ↓
Answer
   ↓
Understand
```

rather than:

```text
Open course
→ read 30 pages
→ finish
```

---

# 5. Design Direction

Visual style:

> **Modern + Scientific + Friendly + Interactive**

The interface should feel appropriate for high-school students.

Avoid making it look childish.

Avoid making it look like an academic research website.

Target:

```text
Modern educational product
        +
Scientific visual language
        +
Playful interaction
```

---

# 6. 2D Interaction First

The website should use simple **2D interactions**.

Do NOT use:

* Three.js
* WebGL
* React Three Fiber
* 3D models

The project should primarily use:

* HTML
* CSS
* SVG
* Canvas when appropriate
* JavaScript / TypeScript
* CSS animations
* GSAP if necessary

---

# 7. Interaction Examples

Good examples:

### Interactive diagrams

Click an organelle:

```text
        CELL
   ┌─────────────┐
   │      ●      │
   │             │
   │   ◉     ○   │
   │             │
   └─────────────┘

       ↓ click

┌─────────────────────┐
│ Nucleus             │
│                     │
│ Information about   │
│ the nucleus...      │
└─────────────────────┘
```

---

### Hover interactions

Student moves over an object:

```text
DNA
 ↓
highlight
 ↓
small information panel
```

---

### Click-to-reveal

```text
What happens during this stage?

[ Reveal answer ]
```

Click:

```text
↓
Answer + small animation
```

---

### Interactive quiz

```text
Which structure contains genetic material?

○ Ribosome
○ Nucleus
○ Golgi apparatus
○ Lysosome
```

After answering:

```text
✓ Correct!

The nucleus contains...
```

---

### Matching

```text
Mitochondria       →  ?
Ribosome           →  ?
Nucleus             →  ?
```

Student drags or clicks matching concepts.

---

### Timeline

Useful for:

* Cell division
* Biological processes
* Developmental stages
* Evolution
* Life cycles

Example:

```text
① ───── ② ───── ③ ───── ④
     ↑
   Current
```

Click a stage to see its explanation.

---

# 8. Homepage

The homepage should immediately communicate:

> **This is a place where students can explore Biology.**

Possible hero:

```text
BIOLOGY

Sinh học không chỉ là
những trang sách.

Hãy khám phá nó.

[ Bắt đầu học ]
```

The hero can contain a simple animated 2D Biology illustration.

Examples:

* DNA
* Cell
* Neuron
* Leaf
* Chromosome
* Biological particles

The illustration can react subtly to mouse movement.

Keep it lightweight.

---

# 9. Learning Structure

The main navigation should be simple.

```text
Home
Explore
Books
Search
Progress
```

Students should be able to reach the content quickly.

---

# 10. Books

Show the available textbooks:

```text
┌──────────────────┐
│                  │
│     SINH 11      │
│                  │
│   Explore →      │
└──────────────────┘

┌──────────────────┐
│                  │
│     SINH 12      │
│                  │
│   Explore →      │
└──────────────────┘

┌──────────────────┐
│                  │
│     SINH 13      │
│                  │
│   Explore →      │
└──────────────────┘
```

Cards should have subtle interaction.

For example:

```text
hover
 ↓
card moves slightly
 ↓
illustration moves
 ↓
button appears/highlights
```

---

# 11. Chapter Navigation

After opening a book:

```text
Sinh 11

Chapter 01
Chapter 02
Chapter 03
Chapter 04
...
```

Each chapter can show:

```text
Chapter 01
──────────────

12 lessons
3 interactive activities
5 quizzes
```

Only show numbers that actually exist in the available data.

---

# 12. Lesson Page

The lesson page should be optimized for reading.

Example:

```text
┌────────────────────────────────────────────┐
│ Sinh 11 / Chapter 1                        │
│                                            │
│ Tên bài học                                │
│                                            │
│ ─────────────────────────────────────────  │
│                                            │
│ Nội dung bài học...                        │
│                                            │
│       [ Interactive Diagram ]              │
│                                            │
│ Nội dung tiếp theo...                      │
│                                            │
│       [ Quick Quiz ]                       │
│                                            │
└────────────────────────────────────────────┘
```

Avoid putting too much information on screen simultaneously.

---

# 13. Learning Experience

Each lesson should ideally follow:

```text
Introduction
      ↓
Concept
      ↓
Visual explanation
      ↓
Interaction
      ↓
Quick question
      ↓
Summary
```

However, do not force every lesson to follow this structure if the textbook content does not support it.

---

# 14. "Explore" Section

Create a section where students can explore Biology concepts independently.

Possible categories:

```text
🧬 Genetics
🧫 Cells
🌱 Plants
🫀 Human Biology
🦠 Microorganisms
🧠 Nervous System
🌎 Ecology
🧬 Evolution
```

Only activate categories supported by the available source content.

Do not create fake content just to fill the categories.

---

# 15. Search

Search should be extremely simple.

Example:

```text
Search Biology...

[ mitochondria ]
```

Results:

```text
3 results

Sinh 11
Chapter 1
Lesson ...

Sinh 12
Chapter 3
Lesson ...
```

Search should eventually cover:

* Book title
* Chapter
* Lesson
* Extracted PDF text
* Keywords

---

# 16. Progress

A lightweight progress system can be implemented.

Example:

```text
Sinh 11

████████████░░░░  72%

18 / 25 lessons explored
```

Do not build a complex account system initially.

For MVP, progress can be local to the browser.

If local storage is used, keep it simple.

---

# 17. Gamification

Gamification should be subtle.

Possible features:

```text
🔥 Learning streak
⭐ XP
🏆 Achievements
✓ Completed lessons
```

Example:

```text
Biology Explorer

★★★★★

You've explored:

12 lessons
4 diagrams
8 quizzes
```

Do NOT turn the website into a game.

Learning remains the primary goal.

---

# 18. Interactive Biology Components

The first interactive components should be reusable.

Suggested components:

```text
InteractiveDiagram
InteractiveQuiz
RevealAnswer
BiologyTimeline
MatchingExercise
ImageHotspot
ProgressBar
```

Example:

```text
InteractiveDiagram
        │
        ├── SVG
        ├── hotspots
        ├── labels
        └── information panel
```

This allows future lessons to reuse the same interaction system.

---

# 19. PDF / OCR Pipeline

Because the current PDFs are scanned documents, assume that they may contain images rather than selectable text.

Expected pipeline:

```text
PDF
 ↓
Page images
 ↓
OCR
 ↓
Extracted text
 ↓
Chapter detection
 ↓
Lesson detection
 ↓
Search index
```

The original PDF must remain available.

For each extracted section, store the source page.

Example:

```json
{
  "id": "sinh11-ch01-l01",
  "book": "sinh11",
  "chapter": "chapter-01",
  "title": "Example",
  "content": "...",
  "sourcePages": [12, 13, 14]
}
```

This allows the student to open the original textbook page.

---

# 20. Content Architecture

Recommended structure:

```text
src/
├── components/
│   ├── ui/
│   ├── biology/
│   └── learning/
│
├── pages/
│   ├── Home/
│   ├── Books/
│   ├── Chapter/
│   ├── Lesson/
│   ├── Explore/
│   └── Search/
│
├── data/
│   ├── books/
│   │   ├── sinh11.json
│   │   ├── sinh12.json
│   │   └── sinh13.json
│   │
│   └── interactions/
│
├── animations/
├── hooks/
├── utils/
└── assets/
```

---

# 21. Lesson Data

Do not hard-code lesson content directly inside React components.

Use structured data.

Example:

```json
{
  "id": "sinh11-ch01-l01",
  "title": "Lesson title",
  "bookId": "sinh11",
  "chapterId": "chapter-01",
  "content": [],
  "sourcePages": [10, 11],
  "interactive": [
    {
      "type": "diagram",
      "id": "cell-01"
    }
  ]
}
```

---

# 22. Responsive Design

Primary target:

```text
Desktop
```

But also support:

```text
Tablet
Mobile
```

The website should not depend on hover for essential functionality.

Everything important must work through:

```text
Click / Tap
```

---

# 23. Accessibility

Use semantic HTML.

Prefer:

```html
<button>
<a>
<nav>
<main>
<section>
```

instead of clickable `<div>` elements.

Interactive elements should have:

* keyboard focus
* visible focus state
* readable text
* sufficient contrast
* meaningful labels

---

# 24. Animation Rules

Animation should make the website feel alive, not distract students.

Preferred:

```text
150ms - 500ms
```

Use:

```text
opacity
transform
scale
translate
clip-path
```

Good:

```text
click
 ↓
diagram highlights
 ↓
information appears
```

Bad:

```text
Everything constantly moving
```

Avoid excessive:

* bouncing
* spinning
* flashing
* particle effects
* infinite animations

---

# 25. Visual Hierarchy

Use typography to distinguish:

```text
Book
 ↓
Chapter
 ↓
Lesson
 ↓
Concept
 ↓
Explanation
```

Students should always know:

> Where am I?

and:

> What am I learning?

---

# 26. MVP

## Phase 1 — Core

```text
[ ] Project setup
[ ] Home page
[ ] Books page
[ ] Sinh 11
[ ] Sinh 12
[ ] Sinh 13
[ ] Chapter navigation
[ ] Lesson page
[ ] PDF viewer
[ ] Responsive layout
```

## Phase 2 — Interaction

```text
[ ] Interactive SVG diagram
[ ] Quiz
[ ] Reveal answer
[ ] Timeline
[ ] Image hotspot
[ ] Micro animations
```

## Phase 3 — Learning Experience

```text
[ ] Search
[ ] Progress
[ ] Local learning state
[ ] XP
[ ] Achievements
[ ] Explore page
```

## Phase 4 — Content

```text
[ ] OCR
[ ] Chapter detection
[ ] Lesson detection
[ ] Search indexing
[ ] More interactive Biology components
```

---

# 27. Definition of Done

The MVP is successful when a student can:

```text
Open website
      ↓
Choose Sinh 11 / 12 / 13
      ↓
Choose a chapter
      ↓
Open a lesson
      ↓
Read the content
      ↓
Interact with a 2D visual
      ↓
Answer a small question
      ↓
See their progress
```

The website should feel:

> **"I want to click around and explore this."**

rather than:

> **"I have to read another online textbook."**

---

# 28. AI Coding Rules

## Rule 1 — Do not invent textbook content

The PDFs are the source of truth.

Never fabricate Biology facts and present them as textbook content.

---

## Rule 2 — Build the UI with mock data first

If PDF processing is not ready, use clearly marked mock data.

Do not block UI development waiting for OCR.

---

## Rule 3 — Keep the architecture simple

Do not create unnecessary:

* backend services
* databases
* authentication
* microservices
* complex state management

unless required.

---

## Rule 4 — Interaction over feature count

Prefer:

```text
1 excellent interactive diagram
```

over:

```text
10 boring CRUD features
```

---

## Rule 5 — Don't overuse gamification

This is an educational product, not a game.

Gamification should motivate learning rather than distract from it.

---

## Rule 6 — Don't overuse cards

Not every piece of content needs to be inside a rounded card.

Use whitespace, typography, sections and visual hierarchy.

---

## Rule 7 — Reusable interaction components

If the same interaction appears twice, extract it into a reusable component.

Example:

```text
InteractiveQuiz
```

should support multiple questions rather than creating:

```text
Quiz1
Quiz2
Quiz3
Quiz4
```

---

# 29. Core Goal

The project should ultimately become:

```text
              BIOLOGY
                 │
        ┌────────┴────────┐
        │                 │
     TEXTBOOK          INTERACTION
        │                 │
   ┌────┼────┐       ┌────┼────┐
   │    │    │       │    │    │
 Sinh11 Sinh12 Sinh13  Diagram Quiz Timeline
        │                 │
        └────────┬────────┘
                 │
           STUDENT LEARNS
```

The most important principle is:

> **Turn static Biology textbook content into a simple, beautiful, interactive learning experience.**
