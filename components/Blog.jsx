'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { posts } from '../lib/posts.mjs'

// The three cards here, and the pages behind them, read the same list from
// lib/posts.mjs. Before that they were hardcoded with href="#" on every
// link: a heading, an excerpt, and a "View" that did nothing.

export default function Blog() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Notes from the valley
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              View all
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-sm text-gray-500">{post.year}</span>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center text-gray-900 font-medium transition-transform duration-200 group-hover:translate-x-1">
                    Read it
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
