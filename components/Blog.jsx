'use client'
import { motion } from 'framer-motion'

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Make the Most of Your Stay at Canoply Chalet",
      year: "2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      excerpt: "Discover insider tips and recommendations for an unforgettable experience at our mountain retreat."
    },
    {
      id: 2,
      title: "Your Guide to the Best Local Dining Near Canoply",
      year: "2025",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      excerpt: "Explore the finest restaurants and hidden culinary gems in the surrounding mountain area."
    },
    {
      id: 3,
      title: "Top Family-Friendly Attractions Around Canoply",
      year: "2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      excerpt: "Plan the perfect family adventure with our curated list of kid-friendly activities and attractions."
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
            Discover local adventures
          </motion.h2>
          <motion.a 
            href="#" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            View all
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id} 
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-[4/3]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{post.year}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  View
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
