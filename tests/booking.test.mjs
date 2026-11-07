// The booking rules, tested where they live.
//
// The CI workflow already ran `npm test --if-present` and found nothing to
// run, so the green badge meant only that the project compiled. These are
// the parts where being wrong is expensive: money, and the dates money is
// counted from.

import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  MAX_NIGHTS,
  NIGHTLY_RATE,
  nightsBetween,
  earliestStayDate,
  parseStayDate,
  quote,
  todayAt,
  validateBooking,
} from '../lib/booking.mjs'

// A fixed "today" so none of this changes meaning overnight.
const NOW = Date.UTC(2026, 10, 8) // 2026-11-08
const valid = {
  fullName: 'Mohd Mudabbir Arafat',
  email: 'hello@example.com',
  arrival: '2026-11-20',
  departure: '2026-11-24',
}

test('a complete booking prices nights, not days', () => {
  const result = validateBooking(valid, { now: NOW })
  assert.equal(result.ok, true)
  // Four nights between the 20th and the 24th, not five days.
  assert.equal(result.booking.nights, 4)
  assert.equal(result.booking.total, 4 * NIGHTLY_RATE)
})

test('the name is trimmed before it is stored', () => {
  const result = validateBooking({ ...valid, fullName: '  Asha Mehta  ' }, { now: NOW })
  assert.equal(result.booking.fullName, 'Asha Mehta')
})

test('a blank form blames every empty box, not just the first', () => {
  const { ok, errors } = validateBooking({}, { now: NOW })
  assert.equal(ok, false)
  assert.deepEqual(Object.keys(errors).sort(), ['arrival', 'departure', 'email', 'fullName'])
})

test('departure before arrival is refused', () => {
  const { ok, errors } = validateBooking(
    { ...valid, arrival: '2026-11-24', departure: '2026-11-20' },
    { now: NOW },
  )
  assert.equal(ok, false)
  assert.match(errors.departure, /after arrival/)
})

test('a same-day in and out is not a night', () => {
  const { ok, errors } = validateBooking(
    { ...valid, arrival: '2026-11-20', departure: '2026-11-20' },
    { now: NOW },
  )
  assert.equal(ok, false)
  assert.ok(errors.departure)
})

test('arrival in the past is refused', () => {
  const { ok, errors } = validateBooking(
    { ...valid, arrival: '2026-11-07', departure: '2026-11-09' },
    { now: NOW },
  )
  assert.equal(ok, false)
  assert.match(errors.arrival, /past/)
})

test('arriving today is fine', () => {
  const result = validateBooking(
    { ...valid, arrival: '2026-11-08', departure: '2026-11-09' },
    { now: NOW },
  )
  assert.equal(result.ok, true)
  assert.equal(result.booking.nights, 1)
})

test('a stay longer than the cap is refused', () => {
  const { ok, errors } = validateBooking(
    { ...valid, arrival: '2026-11-20', departure: '2027-02-20' },
    { now: NOW },
  )
  assert.equal(ok, false)
  assert.match(errors.departure, new RegExp(String(MAX_NIGHTS)))
})

test('an ordering error does not also blame the arrival date', () => {
  // Both dates are real and in the future; only their order is wrong, so
  // arrival should be left alone.
  const { errors } = validateBooking(
    { ...valid, arrival: '2026-12-10', departure: '2026-12-01' },
    { now: NOW },
  )
  assert.equal(errors.arrival, undefined)
  assert.ok(errors.departure)
})

test('a date that passes the regex but is not a real day is rejected', () => {
  assert.equal(parseStayDate('2026-02-31'), null)
  assert.equal(parseStayDate('2026-13-01'), null)
  assert.equal(parseStayDate('20-11-2026'), null)
  assert.equal(parseStayDate(''), null)
  assert.equal(parseStayDate(null), null)
})

test('nights are counted on the calendar, not over elapsed hours', () => {
  // The clocks go back in much of the world inside this range. Reading the
  // dates in local time makes this 1 night or 3; on the calendar it is 2.
  assert.equal(nightsBetween('2026-10-31', '2026-11-02'), 2)
})

test('obviously wrong emails are refused and ordinary ones are not', () => {
  for (const email of ['nope', 'no@', '@no.com', 'a b@c.com', 'a@b', 'a@b.c']) {
    const { ok } = validateBooking({ ...valid, email }, { now: NOW })
    assert.equal(ok, false, `${email} should not pass`)
  }
  for (const email of ['a@b.co', 'first.last+tag@sub.domain.in']) {
    const { ok } = validateBooking({ ...valid, email }, { now: NOW })
    assert.equal(ok, true, `${email} should pass`)
  }
})

test('quote stays quiet about a half-filled form', () => {
  assert.equal(quote('', ''), null)
  assert.equal(quote('2026-11-20', ''), null)
  assert.equal(quote('2026-11-24', '2026-11-20'), null)
  assert.deepEqual(quote('2026-11-20', '2026-11-21'), {
    nights: 1,
    nightlyRate: NIGHTLY_RATE,
    total: NIGHTLY_RATE,
    currency: 'INR',
  })
})

test('a non-object body does not throw', () => {
  for (const body of [null, undefined, 'string', 42, []]) {
    assert.equal(validateBooking(body, { now: NOW }).ok, false)
  }
})

// The timezone group. These deliberately use the real clock rather than an
// injected one, because the bug they exist for was precisely that the real
// clock was read from the wrong place: "today" came off UTC, so between
// midnight and 05:30 in Himachal the date picker offered an arrival that
// had already passed there, and the server agreed with it.

const DAY = 86_400_000
const isoOf = (stamp) => new Date(stamp).toISOString().slice(0, 10)
const guest = { fullName: 'Asha Mehta', email: 'asha@example.com' }

test('today is read at the cabin, which is never behind UTC', () => {
  const atCabin = todayAt('Asia/Kolkata')
  const atUtc = todayAt('UTC')
  assert.ok(atCabin >= atUtc, 'India is ahead of UTC, so its date cannot be earlier')
  assert.ok(atCabin - atUtc <= DAY, 'and it can only ever be one day ahead')
})

test('the furthest-ahead zone is never behind the furthest-behind one', () => {
  assert.ok(todayAt('Pacific/Kiritimati') >= todayAt('Etc/GMT+12'))
})

test("the pickers' minimum is the cabin's today", () => {
  assert.equal(parseStayDate(earliestStayDate()), todayAt())
})

test('arriving today at the cabin is accepted against the real clock', () => {
  const result = validateBooking({
    ...guest,
    arrival: earliestStayDate(),
    departure: isoOf(todayAt() + DAY),
  })
  assert.equal(result.ok, true)
  assert.equal(result.booking.nights, 1)
})

test('arriving yesterday at the cabin is refused against the real clock', () => {
  const { ok, errors } = validateBooking({
    ...guest,
    arrival: isoOf(todayAt() - DAY),
    departure: earliestStayDate(),
  })
  assert.equal(ok, false)
  assert.match(errors.arrival, /past/)
})
