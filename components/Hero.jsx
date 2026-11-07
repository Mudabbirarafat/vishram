'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { earliestStayDate, formatRupees, NIGHTLY_RATE, quote, validateBooking } from '../lib/booking.mjs'

const EMPTY = { fullName: '', email: '', arrival: '', departure: '' }


// A decorative glow sits over each field to light it up on focus. It used to
// be a plain absolutely-positioned sibling, which made it an invisible lid:
// opacity-0 hides a layer but does not stop it collecting clicks, so every
// click meant for an input landed on the overlay instead and none of the
// four fields could be typed into at all. Two things fix it - the layer
// stops taking pointer events, and the glow is driven by the wrapper's
// focus rather than its own, which it could never have had.
function Field({ label, glow, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-3">{label}</label>
      <div className="relative group">
        {children}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r ${glow} opacity-0 transition-opacity duration-300 group-focus-within:opacity-100`}
        />
      </div>
    </div>
  )
}

const INPUT =
  'relative z-10 w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300'

function Problem({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="mt-2 text-sm text-red-200">
      {children}
    </p>
  )
}

export default function Hero() {
  const [formData, setFormData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [failure, setFailure] = useState(null)

  const update = (field) => (event) => {
    const { value } = event.target
    setFormData((current) => ({ ...current, [field]: value }))
    // Cleared as they type, so a message does not sit under a box they have
    // already corrected.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  // The live total, from the same module the server prices with. Null until
  // the two dates describe a real stay, which is why the box falls back to
  // the nightly rate instead of showing a confident zero.
  const stay = quote(formData.arrival, formData.departure)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFailure(null)
    setConfirmation(null)

    // Checked here first only to save a round trip on an obviously empty
    // form. The server checks again regardless; this is politeness, not a
    // control.
    const local = validateBooking(formData)
    if (!local.ok) {
      setErrors(local.errors)
      return
    }

    setSending(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const payload = await response.json().catch(() => ({}))

      if (response.status === 201) {
        setConfirmation(payload)
        setErrors({})
        setFormData(EMPTY)
      } else if (payload.errors) {
        setErrors(payload.errors)
      } else {
        setFailure(payload.error || `The server answered ${response.status}.`)
      }
    } catch {
      // A failed fetch is a different problem from a rejected booking, and
      // saying so is the difference between "try again" and "fix the date".
      setFailure('Could not reach the server. Check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  const bookLabel = () => {
    if (sending) return 'Sending...'
    if (!stay) return 'Book now'
    return stay.nights === 1 ? 'Book 1 night' : `Book ${stay.nights} nights`
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent"></div>

      {/* Animated background elements. pointer-events-none because a
          decoration that sits over the page must not collect its clicks. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Vishram
                  </span>
                </h1>
                <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl opacity-50"></div>
              </div>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl sm:text-2xl text-blue-100 font-light">Cabin located in</p>
                <p className="text-2xl sm:text-3xl text-white font-semibold">
                  Tirthan Valley, Himachal Pradesh
                </p>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              A deodar-and-stone cabin above the Tirthan river, built to be lived in slowly.
              Solar-heated water, a wood stove, no television, and a valley that goes quiet
              after dark. Vishram means rest, and that is the whole offer: not another stay,
              a pause.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#gallery"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full"></div>
                <span className="relative z-10">See the cabin</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </motion.a>
            </motion.div>

            <motion.div
              className="flex gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10 text-center">
                  <span className="block text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    25min
                  </span>
                  <span className="text-sm text-slate-300">From Banjar</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              <motion.div
                className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10 text-center">
                  <span className="block text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    42m&sup2;
                  </span>
                  <span className="text-sm text-slate-300">Interior space</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: the booking form */}
          <motion.div
            id="booking"
            className="relative rounded-3xl p-8 lg:p-10 overflow-hidden scroll-mt-24"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Glass panel behind the form, and three more reasons to write
                pointer-events-none on a decoration. */}
            <div className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"></div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl"></div>
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>

            <div className="relative z-10">
              <motion.h2
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Book your
                  <br />
                  stay today
                </span>
              </motion.h2>
              <motion.p
                className="text-slate-300 mb-8 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {formatRupees(NIGHTLY_RATE)} a night for the whole cabin, up to four guests.
                Longer stays and off-season weeks are priced differently, so do ask.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <Field label="Full name" glow="from-blue-500/10 to-purple-500/10">
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={update('fullName')}
                      aria-invalid={Boolean(errors.fullName)}
                      className={INPUT}
                      placeholder="Enter your full name"
                    />
                  </Field>
                  <Problem>{errors.fullName}</Problem>
                </div>

                <div>
                  <Field label="Email" glow="from-purple-500/10 to-pink-500/10">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(errors.email)}
                      className={INPUT}
                      placeholder="Enter your email"
                    />
                  </Field>
                  <Problem>{errors.email}</Problem>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Field label="Arrival" glow="from-green-500/10 to-blue-500/10">
                      <input
                        type="date"
                        name="arrival"
                        // The pickers refuse what the server refuses, so
                        // nobody is told off for a date the calendar offered.
                        min={earliestStayDate()}
                        value={formData.arrival}
                        onChange={update('arrival')}
                        aria-invalid={Boolean(errors.arrival)}
                        className={INPUT}
                      />
                    </Field>
                    <Problem>{errors.arrival}</Problem>
                  </div>
                  <div>
                    <Field label="Departure" glow="from-orange-500/10 to-red-500/10">
                      <input
                        type="date"
                        name="departure"
                        min={formData.arrival || earliestStayDate()}
                        value={formData.departure}
                        onChange={update('departure')}
                        aria-invalid={Boolean(errors.departure)}
                        className={INPUT}
                      />
                    </Field>
                    <Problem>{errors.departure}</Problem>
                  </div>
                </div>

                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-slate-300 font-medium">
                        {stay
                          ? `${stay.nights} ${stay.nights === 1 ? 'night' : 'nights'} at ${formatRupees(stay.nightlyRate)}`
                          : 'Price'}
                      </span>
                      <span className="text-2xl font-bold text-white whitespace-nowrap">
                        {stay ? formatRupees(stay.total) : `${formatRupees(NIGHTLY_RATE)}/night`}
                      </span>
                    </div>
                    {!stay && (
                      <p className="mt-2 text-sm text-slate-400">Pick both dates to see the total.</p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="group relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={sending ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={sending ? undefined : { scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl"></div>
                  <span className="relative z-10 text-lg">{bookLabel()}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </motion.button>
              </form>

              {confirmation && (
                <motion.div
                  role="status"
                  className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-green-100 text-sm font-medium">
                    Request received &mdash; reference {confirmation.reference}.
                  </p>
                  <p className="mt-1 text-green-100/80 text-sm">
                    {confirmation.nights} {confirmation.nights === 1 ? 'night' : 'nights'},{' '}
                    {confirmation.arrival} to {confirmation.departure},{' '}
                    {formatRupees(confirmation.total)} in total. We will write to{' '}
                    {confirmation.email} to confirm.
                  </p>
                </motion.div>
              )}

              {failure && (
                <motion.div
                  role="alert"
                  className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-100 text-sm font-medium">{failure}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* The cabin itself */}
        <motion.div
          id="gallery"
          className="mt-20 lg:mt-24 scroll-mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80"
                alt="A timber cabin on a forested mountain slope, high ridges behind it"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            <motion.div
              className="absolute -bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-72 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
              <div className="relative z-10">
                <p className="text-lg font-semibold text-white mb-1">The cabin</p>
                <p className="text-sm text-slate-300">
                  Two rooms, a wood stove, and the river below
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
