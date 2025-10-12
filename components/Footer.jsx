export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Canoply</h3>
            <div className="space-y-2 text-gray-300">
              <p>Mountain Hills, 53901</p>
              <p>Hike Valley, Canada</p>
            </div>
            <a href="#" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Book now
            </a>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Navigation</h4>
            <div className="space-y-2 text-gray-300">
              <a href="#" className="block hover:text-white transition-colors">Home</a>
              <a href="#" className="block hover:text-white transition-colors">About</a>
              <a href="#" className="block hover:text-white transition-colors">Location</a>
              <a href="#" className="block hover:text-white transition-colors">Our policies</a>
            </div>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">More</h4>
            <div className="space-y-2 text-gray-300">
              <a href="#" className="block hover:text-white transition-colors">Blog</a>
              <a href="#" className="block hover:text-white transition-colors">Gallery</a>
              <a href="#" className="block hover:text-white transition-colors">Reviews</a>
              <a href="#" className="block hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Template Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Template</h4>
            <div className="space-y-2 text-gray-300">
              <a href="#" className="block hover:text-white transition-colors">Style Guide</a>
              <a href="#" className="block hover:text-white transition-colors">Changelog</a>
              <a href="#" className="block hover:text-white transition-colors">How to use</a>
              <a href="#" className="block hover:text-white transition-colors">GSAP Guide</a>
              <a href="#" className="block hover:text-white transition-colors">Licenses</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">Canoply</span>
            </div>
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>Powered by Webflow</p>
              <p>By Helium Agency</p>
              <p>Buy this template</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
