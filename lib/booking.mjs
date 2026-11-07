// What a stay costs, and what counts as a bookable one.
//
// Both the server and the browser import this. The page needs it to show a
// running total as someone picks dates; the API needs it because a total
// that arrives from the browser is a suggestion, not a price. Keeping one
// copy is the only reason the two can never disagree - an earlier version of
// this page hardcoded "290$/night" in the markup and computed nothing, so
// there was nothing to disagree with.
//
// `.mjs` on purpose: the package is CommonJS (next.config.js, the postcss and
// tailwind configs all use module.exports), and this way `node --test` can
// import the same file the bundler does instead of a second copy.

export const NIGHTLY_RATE = 8500 // whole rupees; no fractional currency to round
export const CURRENCY = 'INR'
export const MIN_NIGHTS = 1
export const MAX_NIGHTS = 30 // a short-term rental, not a tenancy

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const DAY_MS = 86_400_000

// Where the cabin is, which is the only place whose clock decides what
// "today" means for an arrival.
//
// Found while checking the live page: the date picker was offering the 7th
// on the morning of the 8th. "Today" had been read off UTC, and at 02:50 in
// Himachal it is still the previous day in UTC - so for five and a half
// hours of every day the form invited an arrival date that had already
// passed, and the server, also running in UTC, agreed with it. Pinning both
// sides to the property's own timezone makes a Vercel function in Virginia
// and a guest in Delhi reach the same answer.
export const PROPERTY_TIMEZONE = 'Asia/Kolkata'

export function formatRupees(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount)
}

// A calendar date, read at UTC midnight rather than in local time.
//
// "2026-11-20" is the twentieth wherever you are: a stay is a count of
// nights on a calendar, not an interval of elapsed hours. Reading these as
// local dates makes a booking one night longer or shorter depending on which
// side of UTC the browser sits, which is a bug you only see from Asia.
export function parseStayDate(value) {
  if (typeof value !== 'string' || !ISO_DATE.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const stamp = Date.UTC(year, month - 1, day)
  const date = new Date(stamp)
  // Rejects the 31st of February, which passes the regex happily.
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }
  return stamp
}

// Today's date at the cabin, as the same UTC-midnight stamp parseStayDate
// produces, so the two are comparable. en-CA is the shortest way to ask
// Intl for yyyy-mm-dd, and it is stable in both Node and the browser.
export function todayAt(timeZone = PROPERTY_TIMEZONE) {
  const formatted = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  return parseStayDate(formatted)
}

export function today() {
  return todayAt()
}

// yyyy-mm-dd for today at the cabin - what the date pickers use as `min`,
// so the calendar cannot offer a day the server will call past.
export function earliestStayDate() {
  return new Date(todayAt()).toISOString().slice(0, 10)
}

export function nightsBetween(arrival, departure) {
  const from = parseStayDate(arrival)
  const to = parseStayDate(departure)
  if (from === null || to === null) return null
  return Math.round((to - from) / DAY_MS)
}

// What the stay costs, or null when the dates cannot price one. Used for the
// live total on the page, so it has to stay quiet about half-filled forms.
export function quote(arrival, departure) {
  const nights = nightsBetween(arrival, departure)
  if (nights === null || nights < MIN_NIGHTS || nights > MAX_NIGHTS) return null
  return {
    nights,
    nightlyRate: NIGHTLY_RATE,
    total: nights * NIGHTLY_RATE,
    currency: CURRENCY,
  }
}

// Field-by-field, because a form that says only "something went wrong" makes
// the person guess which box is at fault. `now` is injectable so the tests do
// not go red the morning after they are written.
export function validateBooking(input, { now = today() } = {}) {
  const errors = {}
  const data = input && typeof input === 'object' ? input : {}

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : ''
  if (!fullName) errors.fullName = 'Tell us who the stay is for.'
  else if (fullName.length < 2) errors.fullName = 'That looks too short to be a name.'
  else if (fullName.length > 80) errors.fullName = 'Please keep this under 80 characters.'

  const email = typeof data.email === 'string' ? data.email.trim() : ''
  if (!email) errors.email = 'We need an email to send the confirmation to.'
  else if (!EMAIL.test(email)) errors.email = "That does not look like an email address."

  const arrival = parseStayDate(data.arrival)
  const departure = parseStayDate(data.departure)

  if (arrival === null) errors.arrival = 'Pick an arrival date.'
  else if (arrival < now) errors.arrival = 'Arrival cannot be in the past.'

  if (departure === null) errors.departure = 'Pick a departure date.'

  // Only worth comparing once both dates are real; otherwise the message
  // would blame the ordering for a date that was never entered.
  if (arrival !== null && departure !== null && !errors.arrival) {
    const nights = Math.round((departure - arrival) / DAY_MS)
    if (nights < MIN_NIGHTS) errors.departure = 'Departure has to be after arrival.'
    else if (nights > MAX_NIGHTS) errors.departure = `We can take bookings up to ${MAX_NIGHTS} nights.`
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    errors: {},
    booking: {
      fullName,
      email,
      arrival: data.arrival,
      departure: data.departure,
      ...quote(data.arrival, data.departure),
    },
  }
}
