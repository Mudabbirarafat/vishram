'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdvancedMenu({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState(null)

  const menuItems = [
    { id: 'home', title: 'Home', subtitle: 'Welcome to Canoply', icon: '🏠' },
    { id: 'location', title: 'Location', subtitle: 'Mountain Hills, Canada', icon: '📍' },
    { id: 'reviews', title: 'Reviews', subtitle: 'What guests say', icon: '⭐' },
    { id: 'about', title: 'About', subtitle: 'Our story', icon: '🏔️' },
    { id: 'gallery', title: 'Gallery', subtitle: 'See our cabins', icon: '📸' },
    { id: 'blog', title: 'Blog', subtitle: 'Local adventures', icon: '📝' },
    { id: 'contact', title: 'Contact', subtitle: 'Get in touch', icon: '💬' },
  ]

  const handleItemClick = (itemId) => {
    setActiveSection(itemId)
    
    // Scroll to section
    const element = document.getElementById(itemId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    // Close menu after scroll
    setTimeout(() => {
      onClose()
    }, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Menu Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Menu Background */}
            <motion.div
              className="relative w-full max-w-4xl mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 lg:p-12">
                {/* Header */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-4xl lg:text-6xl font-black mb-4">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                      Canoply
                    </span>
                  </h2>
                  <p className="text-slate-300 text-lg">Choose your destination</p>
                </motion.div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className="group relative p-6 rounded-2xl overflow-hidden text-left"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Background Layers */}
                      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </motion.button>
                  ))}
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xl">✕</span>
                </motion.button>

                {/* Book Now Button */}
                <motion.div
                  className="text-center mt-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.button
                    className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 text-lg">Book Your Stay</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
