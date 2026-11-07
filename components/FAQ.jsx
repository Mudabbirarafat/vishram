'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('Chalet Amenities')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const faqData = {
    'Chalet Amenities': [
      {
        id: 'amenities-1',
        question: 'Are there laundry facilities at the chalet?',
        answer: 'Yes, we have a washer and dryer available for guest use, along with laundry detergent.'
      },
      {
        id: 'amenities-2',
        question: 'Is the chalet pet-friendly?',
        answer: 'Unfortunately, we do not allow pets to ensure the cleanliness and comfort of all our guests.'
      },
      {
        id: 'amenities-3',
        question: 'Do you provide linens and towels?',
        answer: 'Yes, we provide fresh linens, bath towels, and extra blankets for your comfort.'
      },
      {
        id: 'amenities-4',
        question: 'What kitchen appliances and essentials are provided?',
        answer: 'The kitchen is fully equipped with modern appliances, including a refrigerator, stove, oven, microwave, coffee maker, toaster, and dishwasher. We also provide cooking utensils, pots and pans, and basic spices.'
      },
      {
        id: 'amenities-5',
        question: 'Is there Wi-Fi available at the chalet?',
        answer: 'Yes, we provide high-speed Wi-Fi throughout the chalet to keep you connected during your stay.'
      }
    ],
    'Nearby Activities': [
      {
        id: 'activities-1',
        question: 'Are there any restaurants within walking distance?',
        answer: 'Yes, there are several fantastic dining options just a short drive away. From cozy cafes to fine dining, you\'ll find plenty of variety to satisfy your cravings.'
      },
      {
        id: 'activities-2',
        question: 'Is there a grocery store nearby?',
        answer: 'Yes, there are several grocery stores and convenience shops within a 10-15 minute drive where you can stock up on essentials for your stay.'
      },
      {
        id: 'activities-3',
        question: 'Can you recommend any family-friendly attractions?',
        answer: 'Absolutely! Families can enjoy the nearby adventure park with zip-lining and rock climbing, as well as scenic nature walks and a local wildlife sanctuary.'
      }
    ],
    'Booking & Policies': [
      {
        id: 'booking-1',
        question: 'What are the check-in and check-out times?',
        answer: 'Check-in begins at 3 PM, and check-out is by 11 AM. Early check-ins or late check-outs may be arranged upon request, depending on availability.'
      },
      {
        id: 'booking-2',
        question: 'How do I check the availability and book a stay?',
        answer: 'You can check availability and make a reservation through our \'Book Now\' page. Simply select your dates, number of guests, and submit your booking request.'
      },
      {
        id: 'booking-3',
        question: 'Do you require a security deposit?',
        answer: 'Yes, we require a security deposit which will be fully refunded after your stay, provided there are no damages or policy violations.'
      },
      {
        id: 'booking-4',
        question: 'What is your cancellation policy?',
        answer: 'We offer a full refund if you cancel at least 7 days before your scheduled arrival. If you cancel within 7 days of your stay, you\'ll receive a 50% refund.'
      }
    ]
  }

  const tabs = Object.keys(faqData)

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find answers to your questions
          </h2>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        {/* mode="wait" is a single-child mode: it holds the incoming child
            back until the outgoing one has finished leaving. It was wrapped
            around a .map() of five answers, which is what the console
            warning about animating multiple children inside it meant, and
            why switching tabs flickered. One keyed wrapper per tab is the
            shape the mode expects - the whole list leaves, then the whole
            next list arrives. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {faqData[activeTab].map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
              >
                <motion.button
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={Boolean(openItems[item.id])}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                  <motion.span
                    aria-hidden="true"
                    className="text-gray-500"
                    animate={{ rotate: openItems[item.id] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>
                {/* initial={false} so an answer already open when the tab
                    mounts does not replay its own opening animation. */}
                <AnimatePresence initial={false}>
                  {openItems[item.id] && (
                    <motion.div
                      className="px-6 pb-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
