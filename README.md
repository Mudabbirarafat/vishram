# Vishram

[![CI](https://github.com/Mudabbirarafat/vishram/actions/workflows/ci.yml/badge.svg)](https://github.com/Mudabbirarafat/vishram/actions/workflows/ci.yml)

A booking site for a cabin in Tirthan Valley, Himachal Pradesh. Next.js 15 App
Router, Tailwind, Framer Motion, and an API that actually decides whether a
booking is valid.

**Live: [vishram-tirthan.vercel.app](https://vishram-tirthan.vercel.app)**

It is a demonstration project. The cabin is not real and nothing is for sale.

## The bug that started this

Nobody could type their name.

Each field on the booking form had a decorative glow behind it — an absolutely
positioned sibling, `inset-0`, `opacity-0`, lighting up on focus. `opacity: 0`
hides a layer. It does not stop it collecting clicks. So the glow sat over the
input as an invisible lid, every click meant for the field landed on the lid
instead, and all four fields — name, email, both dates — were impossible to
type into. The form could not be filled in at all.

It is easy to miss because the page looks correct in a screenshot and the
inputs have no `disabled` or `readonly` to find. What it shows up in is a hit
test:

```js
const r = input.getBoundingClientRect()
document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === input
// false, four times over
```

Two things fix it: the decoration stops taking pointer events, and the glow is
driven from the wrapper's `focus-within` rather than its own — which, having no
focusable children, it could never have had, so the effect had never worked
either. Every other decorative overlay in the project got the same treatment,
because the same pattern appears about a dozen times.

## What else was wrong

Found by reading every component and hit-testing every interactive element on
the deployed page:

| | |
|---|---|
| Four booking inputs unclickable | the invisible-lid bug above |
| The review form did nothing | no `onSubmit`, no state, no `name` attributes — "Submit Review" fired a native submit, the page reloaded, and whatever had been written was gone |
| 20 dead links | every `href="#"`: both header buttons, "View gallery", "View all", three "View"s, thirteen in the footer |
| Three menu items went nowhere | About, Gallery and Contact scrolled to `getElementById` of sections that were never built, so a third of the menu waited 800ms and closed again |
| Booking was theatre | `// Simulate form submission`, a 3-second timer, no server, nothing sent |
| The price never changed | `290$/night` hardcoded in the markup; picking four nights still showed one night's rate and no total |
| No date checks | departure before arrival was accepted, and so were dates in the past |
| Somebody else's byline | the footer carried "Powered by Webflow", "By Helium Agency" and "Buy this template", plus two columns of template boilerplate |
| The tab said "Canoply Clone" | and the description, shown to people looking for somewhere to stay, read "Pixel-focused clone built with Next.js + Tailwind" |
| A console warning on every FAQ tab switch | `AnimatePresence mode="wait"` — a single-child mode — wrapped around a `.map()` of five answers, which is also why the list flickered |
| Config describing a design that did not exist | a brown palette and two font families in `tailwind.config.js`, none of them used, neither font ever loaded |

## The booking API

`POST /api/bookings` is where a request is judged. The page validates too, so
an empty box gets mentioned without a round trip, but that is a courtesy to
the visitor rather than a control — anything can post here, so the same rules
run again on the server.

```
POST /api/bookings
{ "fullName": "...", "email": "...", "arrival": "2026-11-20", "departure": "2026-11-24" }

201 { "reference": "VR-1E1ECE", "nights": 4, "nightlyRate": 8500,
      "total": 34000, "currency": "INR", ... }
422 { "errors": { "departure": "Departure has to be after arrival." } }
400   body was not JSON
405   anything other than POST
```

The total is computed on the server and never read from the request. A body
claiming `"total": 1` comes back priced at ₹17,000 for two nights like any
other.

Both sides import `lib/booking.mjs`, which is the only reason the running
total on the page and the price in the response cannot disagree. `.mjs`
because the package is CommonJS — `next.config.js` and the postcss and
tailwind configs all use `module.exports` — and this way `node --test` imports
the same file the bundler does instead of a second copy of the rules.

## What "today" means

The date pickers and the server both ask `lib/booking.mjs` for today's date at
the cabin, in `Asia/Kolkata`.

This started as UTC, and the live page caught it: at 02:50 in Himachal the
picker was offering the 7th on the morning of the 8th, because in UTC it was
still the 7th — so for five and a half hours of every day the form invited an
arrival date that had already passed there, and the server, also running in
UTC, agreed with it. Reading both from the property's timezone makes a Vercel
function in Virginia and a guest in Delhi reach the same answer. Nights are
counted on the calendar rather than over elapsed hours, so a stay spanning a
daylight-saving change is still the number of nights you booked.

## The gap worth knowing about

**Nothing is stored.** Both routes validate properly and return a real
response, and then the booking exists only as a line in the server log and the
review only in the browser tab that submitted it. There is no database.

That is a deliberate stopping point, not an oversight — the deployment owns no
Postgres — and it is written here rather than hidden behind a success message,
which is the same mistake the three-second timer was making. The form under
the review box says so too. Wiring one in means a `DATABASE_URL`, an `INSERT`
in each route where the log line is now, and a `SELECT` in the reviews
section; nothing else has to move.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # 19 tests, no test framework installed
npm run build
```

The tests are `node --test` against `lib/booking.mjs`: nights counted on the
calendar, the 31st of February refused, ordering, the past, the stay cap,
emails, timezone invariants. They cover the money and the dates, because those
are the parts where being wrong is expensive. CI already ran
`npm test --if-present` and found nothing, so the badge only ever meant the
project compiled.

## Layout

```
app/
  layout.jsx            metadata, including the social tags it never had
  page.jsx              the one-page site
  api/bookings/route.js validation, pricing, a reference
  api/reviews/route.js  validation
  blog/page.jsx         the journal index
  blog/[slug]/page.jsx  a post, statically generated, 404 on an unknown slug
components/             Header, Hero, Location, Reviews, FAQ, Blog, Footer, AdvancedMenu
lib/booking.mjs         nights, money, and what counts as a bookable stay
lib/posts.mjs           the journal entries
tests/booking.test.mjs
```

The three journal cards used to be hardcoded with `href="#"` on every link. A
card that looks clickable and is not is worse than no card, so the posts are
real pages now and the section reads the same list they do.

## Built with

Next.js 15 (App Router) · React 19 · Tailwind CSS · Framer Motion · deployed on
Vercel.

## Author

Mohd Mudabbir Arafat
