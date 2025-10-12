'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Reviews() {
  const [showWriteReview, setShowWriteReview] = useState(false)
  
  const reviews = [
    {
      id: 1,
      text: "I highly recommend Canoply Chalet to anyone looking for a getaway. The combination of comfort, adventure, and stunning scenery is unbeatable. The hosts were friendly and attentive, ensuring we had everything we needed for a wonderful stay. We can't wait to visit again!",
      title: "Highly Recommend",
      author: "Justine Feyer"
    },
    {
      id: 2,
      text: "Our stay at Canoply created unforgettable memories. From the moment we arrived, we felt welcomed and at home. The chalet was equipped with everything we needed, and the location was perfect for exploring the area. We left with our hearts full and plans to return soon!",
      title: "Unforgettable Memories",
      author: "Max Jervais"
    },
    {
      id: 3,
      text: "For nature lovers, Canoply Chalet is a paradise! The surrounding wilderness is breathtaking, and we loved every moment spent outdoors. The chalet itself is a perfect blend of rustic charm and modern comfort. We can't wait to come back and explore more of the beautiful trails nearby.",
      title: "Nature Lover's Paradise",
      author: "Dave Chambers"
    },
    {
      id: 4,
      text: "Canoply was the perfect romantic retreat for us. The ambiance was cozy and intimate, making it an ideal spot for couples. We enjoyed candlelit dinners and long walks in the surrounding nature. The privacy of the chalet allowed us to reconnect and enjoy each other's company. Highly recommend for couples!",
      title: "Romantic Retreat",
      author: "Anne Corner"
    },
    {
      id: 5,
      text: "Canoply Chalet is incredibly family-friendly! We brought our kids along, and they loved exploring the outdoors. The spacious layout of the chalet allowed us to enjoy family time together while also having our own space. The hosts provided games and activities that kept the kids entertained. A wonderful experience!",
      title: "Family Friendly",
      author: "Jay Lee"
    },
    {
      id: 6,
      text: "Our stay at Canoply was serene and beautiful. The location is perfect for those who want to escape the noise of everyday life. We spent our days hiking and our evenings stargazing from the deck. The chalet was clean, comfortable, and had everything we needed for a relaxing stay.",
      title: "Serene and Beautiful",
      author: "Anna Bellot"
    },
    {
      id: 7,
      text: "Canoply felt like a home away from home. The amenities were top-notch, and the decor was warm and inviting. We appreciated the attention to detail, from the cozy blankets to the well-stocked kitchen. It was the perfect place to unwind and recharge. Can't wait to return!",
      title: "Home Away From Home",
      author: "Sabrina Bootleg"
    },
    {
      id: 8,
      text: "If you're looking for adventure, Canoply Chalet is the place to be! We had a fantastic time exploring the nearby trails and enjoying outdoor activities. The chalet itself was a comfortable base to return to after a day of adventure. The hosts were incredibly welcoming and provided great recommendations for local attractions.",
      title: "Adventure Awaits",
      author: "Gab Vettel"
    },
    {
      id: 9,
      text: "Our stay at Canoply was nothing short of amazing. The chalet is beautifully designed and equipped with everything we needed. We loved the peaceful retreat it provided, away from the hustle and bustle of city life. The views from the balcony were breathtaking, especially at sunrise. We will definitely be back!",
      title: "Amazing Experience",
      author: "Sam Jones"
    },
    {
      id: 10,
      text: "Canoply is a hidden gem! Nestled in the breathtaking wilderness, it offers a perfect blend of comfort and adventure. The cozy atmosphere made us feel right at home, and the surrounding nature was simply stunning. We enjoyed hiking during the day and relaxing by the fireplace at night. Highly recommend!",
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
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"></textarea>
              </div>
              <motion.button 
                type="submit" 
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Review
              </motion.button>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
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
                  <img 
                    src={`https://images.unsplash.com/photo-${['1472099645785-5658abf4ff4e', '1494790108755-2616b612b786', '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1517841905240-472988babdf9', '1534528741775-53994a69daeb', '1506794778202-cad84cf45f1d', '1519345182560-3f2917c472ef', '1508214751196-bcfd4ca60f91', '1494790108755-2616b612b786'][review.id - 1]}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80`}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
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
