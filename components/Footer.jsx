import Link from 'next/link'

// Every link down here used to be href="#" - thirteen of them - and the
// bottom strip still carried the original template's credits: "Powered by
// Webflow", "By Helium Agency", "Buy this template". On a portfolio piece
// that is somebody else's byline on your work, so it is gone, and the two
// columns of Webflow boilerplate ("Style Guide", "Changelog", "GSAP Guide")
// went with it. What is left points at parts of the site that exist.

const NAVIGATION = [
  { href: '/#home', label: 'Home' },
  { href: '/#gallery', label: 'The cabin' },
  { href: '/#location', label: 'Location' },
  { href: '/#reviews', label: 'Reviews' },
]

const MORE = [
  { href: '/blog', label: 'Journal' },
  { href: '/#faq', label: 'Questions' },
  { href: '/#booking', label: 'Book a stay' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Vishram</h3>
            <div className="space-y-1 text-gray-300">
              <p>Gushaini, Tirthan Valley</p>
              <p>Banjar, Himachal Pradesh 175123</p>
            </div>
            <Link
              href="/#booking"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Book now
            </Link>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Navigation</h4>
            <div className="space-y-2 text-gray-300">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">More</h4>
            <div className="space-y-2 text-gray-300">
              {MORE.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-bold text-xl">Vishram</span>
            <div className="text-center md:text-right text-gray-400 text-sm space-y-1">
              <p>A demonstration project, not a real rental.</p>
              <p>
                Built by Mohd Mudabbir Arafat &middot;{' '}
                <a
                  href="https://github.com/Mudabbirarafat/vishram"
                  className="underline hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
