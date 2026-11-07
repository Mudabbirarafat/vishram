import Link from 'next/link'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { posts } from '../../lib/posts.mjs'

export const metadata = {
  title: 'Journal — Vishram',
  description: 'Notes on Tirthan Valley: what to walk, where to eat, and what to know before you arrive.',
}

export default function Journal() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-gray-500">Journal</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-gray-900">
            Notes from the valley
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Written for people who have already booked and want to know what to do once they are
            here.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-sm text-gray-500">{post.year}</span>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>

          <Link
            href="/#blog"
            className="mt-12 inline-flex items-center text-gray-900 font-medium hover:text-gray-600 transition-colors"
          >
            &larr; Back to the cabin
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
