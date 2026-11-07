import { randomUUID } from 'node:crypto'

import { validateBooking } from '../../../lib/booking.mjs'

// Where a booking request is actually judged.
//
// The page validates too, so that someone gets told about an empty box
// without a round trip - but that validation is a convenience for the
// visitor, not a control. Anything can POST here, so the same rules run
// again on this side, and the total is computed here rather than read from
// the request. A price that arrives in the body is a suggestion.
//
// Nothing is stored. There is no database behind this and pretending
// otherwise would be the same lie the old three-second timer told; what the
// README says about it is in "The gap worth knowing about".

export const runtime = 'nodejs'

function reference() {
  return `VR-${randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()}`
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Expected a JSON body.' }, { status: 400 })
  }

  const result = validateBooking(body)
  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 422 })
  }

  const confirmation = { reference: reference(), ...result.booking }

  // One line per booking, so a request that reached the server leaves a
  // trace even without storage. The guest's email stays out of it: logs are
  // the wrong place to keep someone's address, and nothing here reads it
  // back.
  console.log(
    `[booking] ${confirmation.reference} ${confirmation.arrival} to ${confirmation.departure} ` +
      `(${confirmation.nights} nights, ${confirmation.total} ${confirmation.currency})`,
  )

  return Response.json(confirmation, { status: 201 })
}

// Without this, a GET to the route 405s with an empty body and looks broken.
export function GET() {
  return Response.json(
    { error: 'Send a POST with fullName, email, arrival and departure.' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
