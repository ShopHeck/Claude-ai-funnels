# AGENT.md — NeuroFunnel AI / Builder Mode

## Objective
Build a **production-quality SaaS frontend** called **NeuroFunnel AI**.

Product: AI experience builder for creating immersive, conversion-focused funnels.

Business outcome: a believable SaaS asset that can be shown to prospects, investors, or early users and converted into a paid product fast.

## Build Standard
Output must feel:
- premium
- modern
- fast
- dark-mode first
- studio-quality
- monetizable

Do **not** build a prototype toy, generic AI wrapper, or template-heavy startup UI.

## Non-Negotiables
- Ship the **best MVP**, not the biggest MVP.
- Prefer a complete, polished screen over extra features.
- Prefer simple reliable interactions over complex fragile ones.
- Use **strict TypeScript**.
- Use **server components by default**.
- Use client components only for interactivity.
- No `any` unless unavoidable.
- No dead code.
- No giant page files.
- No half-finished states.
- No placeholder slop.

If a feature adds complexity without immediate revenue or demo value, cut it.

## Stack
Use this stack unless blocked:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- shadcn/ui style patterns
- Recharts
- Supabase
- Stripe
- Vercel

## Visual System
### Colors
- background: `#0A0F1C`
- panel: `#12182A`
- panel-alt: `#0F1526`
- accent-cyan: `#00D4FF`
- accent-violet: `#7B61FF`
- text: `#FFFFFF`
- text-muted: `#AAB3C5`

### Typography
- headings: Space Grotesk
- body: Inter

### Style Rules
- premium rounded panels
- subtle borders
- restrained glow
- sparse glassmorphism only where it adds depth
- clean spacing and hierarchy
- motion should feel expensive, not noisy

### Avoid
- bright startup UI
- childish styling
- cluttered dashboards
- loud gradients everywhere
- generic AI SaaS look
- distracting animations

## Routes
### Marketing
- `/`
- `/demo`
- `/pricing`

### Auth
- `/sign-in`
- `/sign-up`

### App
- `/dashboard`
- `/experiences`
- `/experiences/new`
- `/experiences/[id]`
- `/builder/[id]`
- `/preview/[id]`
- `/templates`
- `/analytics`
- `/settings`
- `/billing`

## App Areas
Build these areas only:
1. marketing site
2. auth
3. dashboard
4. experience creator
5. funnel builder
6. immersive preview
7. template library
8. analytics
9. settings
10. billing

Do **not** build in MVP:
- real-time collaboration
- advanced permissions
- fragile drag-and-drop systems
- marketplace logic
- white-label systems
- video generation
- voice layers

## App Store Addendum (Expo rewrite)
This codebase is an Expo (React Native) + Expo Router rewrite of the above spec so it can ship to the Apple App Store from a single source that also builds for web. The visual system, UX rules, and monetization goals are unchanged; the stack maps as follows:

- Next.js App Router → Expo Router v4
- Tailwind CSS → NativeWind v4
- Framer Motion → react-native-reanimated 3 + Moti
- Lucide React → lucide-react-native
- Recharts → victory-native XL (Skia)
- Stripe subscriptions on iOS → RevenueCat + StoreKit (Apple 3.1.1)
- Auth adds Sign in with Apple (Apple 4.8)
- Mandatory in-app account deletion (Apple 5.1.1(v))

## Core UX Rules
### Dashboard
Must include:
- page heading
- primary CTA: **Create New Experience**
- KPI cards
- recent experiences
- quick template actions

KPIs:
- Views
- Conversions
- Revenue
- Perception Score

### Experience Creator
This is the core money screen.

Layout:
- left config rail
- right generated content canvas
- sticky action bar

Inputs:
- niche
- offer type
- emotional trigger
- tone
- intensity
- CTA goal

Generated output blocks:
- Hook
- Pattern Interrupt
- Reality Shift
- Identity Trigger
- Offer Reveal
- CTA

Required states:
- empty
- generating
- generated
- save success
- error

### Funnel Builder
Use a simple reliable MVP interaction model.

Layout:
- left block library
- center canvas
- right property editor

Blocks:
- Hero Hook
- Story Section
- Email Capture
- Offer Reveal
- Testimonials
- CTA
- Checkout Prompt

Interaction rules:
- click to add
- select to edit
- reorder blocks
- save state

Do **not** block launch with advanced drag-and-drop edge cases.

### Immersive Preview
Must feel like the emotional payoff.

Rules:
- fullscreen
- atmospheric dark backdrop
- centered narrative copy
- staggered text reveal
- CTA reveal at the end
- mobile-friendly

Sequence:
1. line 1
2. line 2
3. line 3
4. CTA

### Template Library
Categories:
- Lead Gen
- Ecommerce
- Affiliate
- High Ticket

Each template card must include:
- title
- category
- thumbnail
- short value proposition
- use template button

### Analytics
Must include:
- KPI row
- engagement trend chart
- conversion chart
- funnel drop-off visualization
- top-performing experiences

Metrics:
- views
- clicks
- conversions
- revenue
- avg engagement time
- perception score

### Billing
Must include:
- plan cards
- current plan state
- Stripe integration scaffolding (web) / RevenueCat on iOS

Plans:
- Free
- Starter
- Pro
- Agency

## Data Models
Use typed models.

### Experience
- id
- user_id
- name
- niche
- offer_type
- emotion
- tone
- intensity
- status
- created_at
- updated_at

### ExperienceStep
- id
- experience_id
- type
- title
- content
- order_index

### AnalyticsSummary
- experience_id
- views
- clicks
- conversions
- revenue
- avg_engagement_time
- perception_score

## Required Components
Build reusable components from the start.

### UI
- Button
- Input
- Select
- Textarea
- Tabs
- Dialog
- Badge
- Card
- MetricCard
- TemplateCard
- ChartCard
- PlanCard

### Shell
- AppShell
- Sidebar
- Topbar
- MobileNav
- PageContainer
- PageHeader

## Code Rules
- Keep components small.
- Extract repeated UI patterns.
- Keep data access in `lib/`.
- Avoid scattered backend calls across pages.
- Use realistic seed data so the app looks alive in development.
- Include loading, success, and error states for async actions.
- Mobile-first always.
- Keyboard accessible always.
- Focus states visible always.

## Build Order
Execute in this order:
1. app shell
2. landing page
3. dashboard
4. templates
5. experience creator
6. immersive preview
7. analytics
8. builder
9. settings and billing
10. backend wiring polish

Do not jump around unless blocked.

## Definition of Done
A screen is only done if it:
- looks polished on desktop and mobile
- has strong spacing and hierarchy
- has hover and focus states
- has empty, loading, and error states where relevant
- feels cohesive with the rest of the product
- is believable in a real paid SaaS

The app is only done if it:
- looks investor-ready
- feels premium
- demonstrates clear monetization potential
- is easy to continue into a real product

## Final Instruction
Make decisions that increase:
1. perceived value
2. conversion potential
3. demo quality
4. implementation speed

When forced to choose, choose **polish over breadth** and **revenue utility over novelty**.
