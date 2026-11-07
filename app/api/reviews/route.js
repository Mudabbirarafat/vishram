import { randomUUID } from 'node:crypto'

// Submitting a review.
//
// Same arrangement as the bookings route: real validation on this side,
// nothing stored. The page shows a new review immediately and says plainly
// that it is only there for this visit, because a review that silently
// vanishes on refresh is worse than one that never appeared.

export const runtime = 'nodejs'

// Per field, because one generic message ends up wrong somewhere: telling
// someone with a one-letter name to "write a few more words" is not advice,
// it is a template showing through.
const FIELDS = {
  author: {
    min: 2,
    max: 60,
    missing: 'Please add your name.',
    short: 'That looks too short to be a name.',
  },
  title: {
    min: 3,
    max: 80,
    missing: 'Please add a title.',
    short: 'A title needs at least three characters.',
  },
  text: {
    min: 20,
    max: 1500,
    missing: 'Please write your review.',
    short: 'A few more words, please - at least 20 characters.',
  },
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Expected a JSON body.' }, { status: 400 })
  }

  const errors = {}
  const clean = {}

  for (const [field, rule] of Object.entries(FIELDS)) {
    const value = typeof body?.[field] === 'string' ? body[field].trim() : ''
    if (!value) {
      errors[field] = rule.missing
    } else if (value.length < rule.min) {
      errors[field] = rule.short
    } else if (value.length > rule.max) {
      errors[field] = `Please keep this under ${rule.max} characters.`
    } else {
      clean[field] = value
    }
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 })
  }

  return Response.json(
    { id: randomUUID(), ...clean, submittedAt: new Date().toISOString() },
    { status: 201 },
  )
}

export function GET() {
  return Response.json(
    { error: 'Send a POST with author, title and text.' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
