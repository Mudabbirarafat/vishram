'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    arrival: '',
    departure: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    if (formData.fullName && formData.email && formData.arrival && formData.departure) {
      setShowSuccess(true)
      setShowError(false)
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Advanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                    Canoply
                  </span>
            </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl opacity-50"></div>
              </div>
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl sm:text-2xl text-blue-100 font-light">
                  Cabin located in
                </p>
                <p className="text-2xl sm:text-3xl text-white font-semibold">
                  Mountain hills, Canada
                </p>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Stylish and comfortable short-term rental in the heart of nature. Eco-conscious properties built to help you disconnect and recharge. Nestled in the scenic mountain hills of Canada, our cabins offer more than just a stay, they offer a pause.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a 
                href="#" 
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full"></div>
                <span className="relative z-10">View gallery</span>
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
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">20min</span>
                  <span className="text-sm text-slate-300">From town</span>
            </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              <motion.div
                className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">30m²</span>
                  <span className="text-sm text-slate-300">Interior space</span>
            </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Booking Form */}
          <motion.div
            className="relative rounded-3xl p-8 lg:p-10 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Book your<br />
                stay today
              </span>
            </motion.h2>
            <motion.p 
              className="text-slate-300 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Starting at $290 per night, with special rates for extended stays. Please check our calendar for seasonal pricing and exclusive offers.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Full name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Arrival</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.arrival}
                      onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Departure</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.departure}
                      onChange={(e) => setFormData({...formData, departure: e.target.value})}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Price</span>
                  <span className="text-2xl font-bold text-white">290$/night</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl"></div>
            </div>

              <motion.button
                type="submit"
                className="group relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl"></div>
                <span className="relative z-10 text-lg">Book Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </motion.button>
            </form>

            {showSuccess && (
              <motion.div 
                className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-green-100 text-sm font-medium">Thank you! Your reservation has been received!</p>
              </motion.div>
            )}

            {showError && (
              <motion.div 
                className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-red-100 text-sm font-medium">Oops! Something went wrong while submitting the form.</p>
              </motion.div>
            )}
            </div>
          </motion.div>
        </div>
        
        {/* Hero Image Section */}
        <motion.div 
          className="mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Beautiful cabin nestled in mountain hills with stunning natural scenery" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            <motion.div 
              className="absolute -bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-72"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <p className="text-lg font-semibold text-white mb-1">Featured cabin</p>
              <p className="text-sm text-slate-300">Mountain view with modern amenities</p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
