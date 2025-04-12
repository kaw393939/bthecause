# Bthecause - Typography Guide (v2.0 - Educational Transformation & Archetypal Alignment)

## 1. Philosophy & Psychological Strategy: Typography as Transformative Framework

Typography serves as the **transformative framework** of Bthecause's educational vision. As the embodiment of **The Magician, Sage, and Creator**, our typographic system is meticulously crafted to:

*   **Inspire Transformation & Possibility (Magician):** Use typography that creates a sense of potential and transformation, inviting users to see education in new ways.
*   **Maximize Clarity & Cognitive Ease (Sage):** Ensure effortless information processing through optimal legibility, clear hierarchy, and reduced cognitive load, allowing complex educational concepts to be absorbed fluidly.
*   **Encourage Creative Exploration (Creator):** Establish a typographic foundation that supports innovative thinking and learning exploration while maintaining structural integrity.
*   **Convey Authority & Trustworthiness (Sage):** Utilize typographic signals research-proven to correlate with educational expertise, stability, and reliable innovation.
*   **Signal Educational Rigor with Accessible Warmth (Sage/Creator):** Employ measured rhythm, clear alignments, and structured layouts that feel both expert and approachable.
*   **Ensure Universal Accessibility (Educational Ethics):** Exceed WCAG AA standards, embodying our commitment to accessible knowledge for all learners regardless of ability.

## 2. Core Typefaces: Psychological Intent & Configuration

Our typeface selections are deliberate choices grounded in educational research and their capacity to evoke the desired **Magician/Sage/Creator** attributes. They are configured in `tailwind.config.js` under `theme.extend.fontFamily`.

*   **Headings: Montserrat:** A balanced geometric sans-serif that projects both **transformative vision (Magician)** and **educational authority (Sage)** while maintaining a contemporary feel. Its excellent legibility and variety of weights enable precise hierarchy control with a distinctive personality that stands out.
    *   *Implementation:* Use CSS variable `var(--font-montserrat)` or Tailwind class `font-heading`.
    *   *Available Weights:* 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold). Apply via `font-medium`, `font-semibold`, `font-bold`.
*   **Body & UI: Open Sans:** An extremely legible, neutral humanist sans-serif designed for digital interfaces. Its open forms and excellent readability make it perfect for educational content, fostering **clarity of understanding (Sage)** with a **warm, approachable feel (Creator)**.
    *   *Implementation:* Use CSS variable `var(--font-open-sans)` or Tailwind class `font-sans` (default).
    *   *Available Weights:* 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold). Apply via `font-normal`, `font-medium`, `font-semibold`, `font-bold`. **Use semibold or bold sparingly** in body text; reserve for emphasis or UI states.
*   **(Optional) Accent/Code: Fira Code:** For code snippets or specific educational data, this monospace font with programming ligatures signals **technical precision (Sage)** and **innovative approach (Magician)**, differentiating specialized learning content.
    *   *Implementation:* Use `var(--font-mono)` or `font-mono`.

**Tailwind Configuration Example:**

```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'var(--font-open-sans)', ...fontFamily.sans], // Body & Default UI
        heading: ['Montserrat', 'var(--font-montserrat)', ...fontFamily.sans], // Headings
        mono: ['Fira Code', 'var(--font-mono)', ...fontFamily.mono], // Optional: Code / Data
      },
      // fontSize & other scales defined below
    },
  },
  plugins: [],
};
```
*Rationale:* Montserrat provides a stronger sense of transformation and educational vision that aligns with the Magician and Sage archetypes. Open Sans offers excellent readability for educational content with a friendlier, more approachable feel than purely neutral fonts. Fira Code supports technical education with clear readability and innovative programming ligatures.

## 3. Typographic Scale & Vertical Rhythm: Structuring Educational Experience

A meticulously defined scale creates a learning environment that guides attention and establishes a balanced rhythm, reinforcing **Magician transformation, Sage clarity, and Creator exploration**. Configured in `theme.extend.fontSize`. Values should be tested with actual educational content.

| Use Case          | Font Family | Weight        | Config (`fontSize` array: [size, { lineHeight }]) | Semantic Element | Psychological Intent & Notes                                                                      |
| :---------------- | :---------- | :------------ | :--------------------------------------------- | :--------------- | :---------------------------------------------------------------------------------------------- |
| Page Title (H1)   | Montserrat  | `font-bold`   | `'4xl': ['2.5rem', { lineHeight: '1.2' }]`       | `<h1>`           | ~40px. Bold vision, clear educational entry point.                                              |
| Section Title (H2)| Montserrat  | `font-semibold` | `'3xl': ['2rem', { lineHeight: '1.25' }]`      | `<h2>`           | ~32px. Major content division, confident educational guidance.                                  |
| Sub-Section (H3)  | Montserrat  | `font-semibold` | `'2xl': ['1.5rem', { lineHeight: '1.3' }]`       | `<h3>`           | ~24px. Clear learning segment, structured educational flow.                                      |
| Component Title(H4)| Montserrat  | `font-semibold` | `'xl': ['1.25rem', { lineHeight: '1.4' }]`       | `<h4>`           | ~20px. E.g., Learning module titles. Focused educational content.                               |
| Label/Small Head(H5)| Montserrat  | `font-medium`   | `'lg': ['1.125rem', { lineHeight: '1.5' }]`      | `<h5>`           | ~18px. Clear educational labeling, organized learning detail.                                    |
| Subtle Heading (H6)| Montserrat  | `font-medium`   | `'base': ['1rem', { lineHeight: '1.5' }]`        | `<h6>`           | ~16px. Use for minor divisions; ensure distinction from body. Consider `font-semibold`.          |
| Body Text 1       | Open Sans   | `font-normal` | `'base': ['1rem', { lineHeight: '1.7' }]`        | `<p>`            | ~16px. **Optimal Learning Readability.** Generous line height (~27px) for educational content.   |
| Body Text 2       | Open Sans   | `font-normal` | `'sm': ['0.875rem', { lineHeight: '1.6' }]`      | `<p class="text-sm">` | ~14px. Secondary educational info, explainers. Maintain generous line height.                    |
| Button Text (Std) | Open Sans   | `font-medium`   | `'sm': ['0.875rem', { lineHeight: '1.25' }]`     | `<button>`       | ~14px. Clear action prompts for learning interactions.                                           |
| Microcopy/Caption | Open Sans   | `font-normal` | `'xs': ['0.75rem', { lineHeight: '1.5' }]`       | `<small>`/`<span>`| ~12px. Tertiary info, educational footnotes. Ensure AA contrast.                                 |
| Code/Data         | Fira Code   | `font-normal` | `'sm': ['0.875rem', { lineHeight: '1.6' }]`      | `<code>`/`<pre>`  | ~14px. Clear technical learning content, precision signal.                                      |

**Configuration Example (`theme.extend.fontSize`):**

```javascript
// tailwind.config.js -> theme.extend
fontSize: {
  // Using rem for scalability, comments show approx px at 16px base
  '4xl': ['2.5rem', { lineHeight: '1.2' }],      // ~40px
  '3xl': ['2rem', { lineHeight: '1.25' }],     // ~32px
  '2xl': ['1.5rem', { lineHeight: '1.3' }],      // ~24px
  'xl':  ['1.25rem', { lineHeight: '1.4' }],     // ~20px
  'lg':  ['1.125rem', { lineHeight: '1.5' }],    // ~18px
  'base': ['1rem', { lineHeight: '1.7' }],       // ~16px, Body text focus
  'sm':  ['0.875rem', { lineHeight: '1.6' }],    // ~14px, Secondary text
  'xs':  ['0.75rem', { lineHeight: '1.5' }],     // ~12px, Microcopy
}
```
*Rationale:* Generous body text line height (`1.7`) significantly enhances readability for educational content. The scale is designed to create clear hierarchy and distinction between educational content levels, with appropriate line heights for optimal learning experience.

## 4. Color & Contrast (Reinforced - Link to Color Guide)

Strictly adhere to the **[Color Guide](./color_guide.md)**.

*   **Primary Text:** `text-neutral-900` or `text-neutral-800` on light backgrounds for maximum legibility (Sage clarity, educational focus).
*   **Secondary Text:** `text-neutral-700` for de-emphasis, ensuring AA+ contrast.
*   **Emphasis:** Use `font-semibold` or `font-bold` within body text *very sparingly*. Use `text-purple-500` (primary) for inline links or main emphasis, `text-turquoise-500` (secondary) for innovation-related content, and `text-amber-500` (accent) for attention-grabbing highlights or calls to action.
*   **Accessibility:** **AAA target** for body text (`neutral-800` on `white`/`neutral-50`) is essential for educational content. Mandatory AA for all other text.

## 5. Responsive Typography & Measure

*   Use Tailwind responsive variants (`md:text-lg`) consistently to scale typography appropriately across devices.
*   **Crucially, enforce optimal line length (measure)** for body text using `max-w-prose` or equivalent container constraints (typically 45-75 characters). This is non-negotiable for sustained reading comfort and educational content absorption (*Sage*). Test across all breakpoints.

## 6. Implementation & Governance (Components First)

*   **Single Source of Truth:** `tailwind.config.js`.
*   **Component Abstraction (Primary Method):** This is the **preferred and recommended** approach. Create semantic components `<Heading level={1-6}>`, `<Paragraph variant="body1"|"body2"|"caption">`, `<Button size="md">`, `<CodeBlock>` etc. These components encapsulate all typographic logic (family, size, weight, line height, responsive variants, color defaults).
    *   *Educational Benefit:* Enforces consistency system-wide, reduces developer cognitive load, ensures educational intent is preserved, makes updates trivial. Directly reflects our value for structured, transformative learning systems.
*   **Utility Classes (Secondary/Internal):** Use utilities primarily *within* the abstract components or for highly specific, non-reusable layout adjustments.

## 7. Spacing & Vertical Rhythm (Link to Spacing Guide)

Refer to the **[Spacing Guide](./spacing_guide.md)**.

*   **Apply rigorously:** Use the 8pt-based scale for all margins (especially `mb-*` after headings/paragraphs) and padding.
*   **Establish Clear Educational Flow:** Consistent vertical spacing creates predictability and guides the eye smoothly through educational content, reinforcing structured learning progression. Test paragraph and heading margins carefully with the defined line heights.

---
*Version 2.0 - Revised for Bthecause. Aligned with Magician, Sage, and Creator archetypes to support educational transformation. Recommended Montserrat and Open Sans for stronger alignment with educational vision. Refined typographic scale with emphasis on learning readability and educational hierarchy. Updated color references to match Bthecause color scheme (purple, turquoise, amber).*