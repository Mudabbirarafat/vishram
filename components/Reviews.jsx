'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

// The seeded reviews each carry a stock portrait. One written in the browser
// has no photo, so it gets initials instead of borrowing a stranger's face.
const PORTRAITS = [
  '1472099645785-5658abf4ff4e',
  '1494790108755-2616b612b786',
  '1507003211169-0a1dd7228f2d',
  '1500648767791-00dcc994a43e',
  '1517841905240-472988babdf9',
  '1534528741775-53994a69daeb',
  '1506794778202-cad84cf45f1d',
  '1519345182560-3f2917c472ef',
  '1508214751196-bcfd4ca60f91',
  '1494790108755-2616b612b786',
]

function portrait(review) {
  if (typeof review.id !== 'number') return null
  return `https://images.unsplash.com/photo-${PORTRAITS[(review.id - 1) % PORTRAITS.length]}?auto=format&fit=crop&w=150&q=80`
}

function initials(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

const FIELD =
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'

function Problem({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="mt-2 text-sm text-red-600">
      {children}
    </p>
  )
}

export default function Reviews() {
  const [showWriteReview, setShowWriteReview] = useState(false)

  // Reviews written during this visit. They sit in front of the seeded ones
  // and vanish on refresh, because there is no database behind the route
  // that accepts them. The note under the form says so, rather than letting
  // someone believe their words were kept.
  const [submitted, setSubmitted] = useState([])
  const [draft, setDraft] = useState({ author: '', title: '', text: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState(null)

  const editDraft = (field) => (event) => {
    const { value } = event.target
    setDraft((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const submitReview = async (event) => {
    event.preventDefault()
    setFailure(null)
    setSending(true)
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      const payload = await response.json().catch(() => ({}))

      if (response.status === 201) {
        setSubmitted((current) => [payload, ...current])
        setDraft({ author: '', title: '', text: '' })
        setErrors({})
      } else if (payload.errors) {
        setErrors(payload.errors)
      } else {
        setFailure(payload.error || `The server answered ${response.status}.`)
      }
    } catch {
      setFailure('Could not reach the server. Check your connection and try again.')
    } finally {
      setSending(false)
    }
  }
  
  const reviews = [
    {
      id: 1,
      text: "I highly recommend Vishram to anyone looking for a getaway. The combination of comfort, adventure, and stunning scenery is unbeatable. The hosts were friendly and attentive, ensuring we had everything we needed for a wonderful stay. We can't wait to visit again!",
      title: "Highly Recommend",
      author: "Justine Feyer"
    },
    {
      id: 2,
      text: "Our stay at Vishram created unforgettable memories. From the moment we arrived, we felt welcomed and at home. The chalet was equipped with everything we needed, and the location was perfect for exploring the area. We left with our hearts full and plans to return soon!",
      title: "Unforgettable Memories",
      author: "Max Jervais"
    },
    {
      id: 3,
      text: "For nature lovers, Vishram is a paradise! The surrounding wilderness is breathtaking, and we loved every moment spent outdoors. The chalet itself is a perfect blend of rustic charm and modern comfort. We can't wait to come back and explore more of the beautiful trails nearby.",
      title: "Nature Lover's Paradise",
      author: "Dave Chambers"
    },
    {
      id: 4,
      text: "Vishram was the perfect romantic retreat for us. The ambiance was cozy and intimate, making it an ideal spot for couples. We enjoyed candlelit dinners and long walks in the surrounding nature. The privacy of the chalet allowed us to reconnect and enjoy each other's company. Highly recommend for couples!",
      title: "Romantic Retreat",
      author: "Anne Corner"
    },
    {
      id: 5,
      text: "Vishram is incredibly family-friendly! We brought our kids along, and they loved exploring the outdoors. The spacious layout of the chalet allowed us to enjoy family time together while also having our own space. The hosts provided games and activities that kept the kids entertained. A wonderful experience!",
      title: "Family Friendly",
      author: "Jay Lee"
    },
    {
      id: 6,
      text: "Our stay at Vishram was serene and beautiful. The location is perfect for those who want to escape the noise of everyday life. We spent our days hiking and our evenings stargazing from the deck. The chalet was clean, comfortable, and had everything we needed for a relaxing stay.",
      title: "Serene and Beautiful",
      author: "Anna Bellot"
    },
    {
      id: 7,
      text: "Vishram felt like a home away from home. The amenities were top-notch, and the decor was warm and inviting. We appreciated the attention to detail, from the cozy blankets to the well-stocked kitchen. It was the perfect place to unwind and recharge. Can't wait to return!",
      title: "Home Away From Home",
      author: "Sabrina Bootleg"
    },
    {
      id: 8,
      text: "If you're looking for adventure, Vishram is the place to be! We had a fantastic time exploring the nearby trails and enjoying outdoor activities. The chalet itself was a comfortable base to return to after a day of adventure. The hosts were incredibly welcoming and provided great recommendations for local attractions.",
      title: "Adventure Awaits",
      author: "Gab Vettel"
    },
    {
      id: 9,
      text: "Our stay at Vishram was nothing short of amazing. The chalet is beautifully designed and equipped with everything we needed. We loved the peaceful retreat it provided, away from the hustle and bustle of city life. The views from the balcony were breathtaking, especially at sunrise. We will definitely be back!",
      title: "Amazing Experience",
      author: "Sam Jones"
    },
    {
      id: 10,
      text: "Vishram is a hidden gem! Nestled in the breathtaking wilderness, it offers a perfect blend of comfort and adventure. The cozy atmosphere made us feel right at home, and the surrounding nature was simply stunning. We enjoyed hiking during the day and relaxing by the fireplace at night. Highly recommend!",
      title: "A Perfect Getaway",
      author: "David Letourneau"
    }
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What people say<br />
            about our place...
          </motion.h2>
          <motion.button 
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Write a review
          </motion.button>
        </motion.div>

        {showWriteReview && (
          <motion.div 
            className="max-w-2xl mx-auto mb-12 p-8 bg-gray-50 rounded-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h3>
            {/* This form used to have no onSubmit, no state and no field
                names, so "Submit Review" triggered a native submit: the page
                reloaded and whatever had been written was gone. */}
            <form className="space-y-4" onSubmit={submitReview} noValidate>
              <div>
                <label htmlFor="review-author" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="review-author"
                  name="author"
                  type="text"
                  autoComplete="name"
                  value={draft.author}
                  onChange={editDraft('author')}
                  aria-invalid={Boolean(errors.author)}
                  className={FIELD}
                />
                <Problem>{errors.author}</Problem>
              </div>
              <div>
                <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  id="review-title"
                  name="title"
                  type="text"
                  value={draft.title}
                  onChange={editDraft('title')}
                  aria-invalid={Boolean(errors.title)}
                  className={FIELD}
                />
                <Problem>{errors.title}</Problem>
              </div>
              <div>
                <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review-text"
                  name="text"
                  rows="4"
                  value={draft.text}
                  onChange={editDraft('text')}
                  aria-invalid={Boolean(errors.text)}
                  className={FIELD}
                />
                <Problem>{errors.text}</Problem>
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={sending ? undefined : { scale: 1.02 }}
                whileTap={sending ? undefined : { scale: 0.98 }}
              >
                {sending ? 'Sending...' : 'Submit Review'}
              </motion.button>
              {failure && (
                <p role="alert" className="text-sm text-red-600">
                  {failure}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Checked by the server, then shown at the top of this page for this visit only.
                Nothing is stored yet.
              </p>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...submitted, ...reviews].map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <p className="text-gray-600 mb-4 leading-relaxed">{review.text}</p>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  {portrait(review) ? (
                    <img
                      src={portrait(review)}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
                    >
                      {initials(review.author)}
                    </span>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                    <p className="text-sm text-gray-500">— {review.author}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
