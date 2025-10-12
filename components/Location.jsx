'use client'
import { motion } from 'framer-motion'

export default function Location() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Location
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Nestled in the heart of Canada's mountain hills, Canoply offers the perfect escape from city life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">📍 Mountain Hills, Canada</h3>
                <p className="text-slate-300 leading-relaxed">
                  Located in the pristine mountain hills of Canada, our cabins offer breathtaking views and 
                  unparalleled access to nature. Just 20 minutes from the nearest town, you'll have the perfect 
                  balance of seclusion and convenience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl mb-3">🚗</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Easy Access</h4>
                  <p className="text-slate-300 text-sm">20 minutes from town center</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl mb-3">🏔️</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Mountain Views</h4>
                  <p className="text-slate-300 text-sm">360° panoramic views</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl mb-3">🌲</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Nature Trails</h4>
                  <p className="text-slate-300 text-sm">Direct access to hiking trails</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl mb-3">🛒</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Nearby Amenities</h4>
                  <p className="text-slate-300 text-sm">Grocery stores and restaurants</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Mountain landscape view from Canoply location"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-64"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <p className="text-lg font-semibold text-white mb-1">Perfect Location</p>
              <p className="text-sm text-slate-300">Secluded yet accessible</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
