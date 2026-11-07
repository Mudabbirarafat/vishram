import Link from 'next/link'
import { notFound } from 'next/navigation'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import { findPost, posts } from '../../../lib/posts.mjs'

// Next 15 hands `params` over as a promise, so every one of these awaits it.
// Reading it synchronously typechecks and then logs a warning at runtime
// while quietly giving you undefined.

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) return { title: 'Not found — Vishram' }
  return {
    title: `${post.title} — Vishram`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
  }
}

export default async function Post({ params }) {
  const { slug } = await params
  const post = findPost(slug)
  // A URL that was typed or guessed gets the 404 page rather than a page
  // rendering "undefined" in the heading.
  if (!post) notFound()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-28 pb-20">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            &larr; Journal
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{post.year}</p>

          <div className="mt-8 bg-gray-100 rounded-2xl overflow-hidden aspect-[16/9]">
            <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
          </div>

          <div className="mt-8 space-y-5">
            {post.body.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link
              href="/#booking"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Book a stay
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
