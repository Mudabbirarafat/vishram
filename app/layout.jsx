import './globals.css'

// The tab used to read "Canoply Clone" and the description said "Pixel-focused
// clone built with Next.js + Tailwind" - which is a note about how the page was
// made, shown to people looking for somewhere to stay. There were also no
// social tags, so the link pasted into a message as a bare URL.
export const metadata = {
  metadataBase: new URL('https://vishram.vercel.app'),
  title: {
    default: 'Vishram — a cabin in Tirthan Valley',
    template: '%s',
  },
  description:
    'A deodar-and-stone cabin above the Tirthan river in Himachal Pradesh. Two rooms, a wood stove, and a valley that goes quiet after dark.',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Vishram',
    title: 'Vishram — a cabin in Tirthan Valley',
    description:
      'Solar-heated water, a wood stove, no television. Vishram means rest, and that is the whole offer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishram — a cabin in Tirthan Valley',
    description: 'A cabin above the Tirthan river in Himachal Pradesh. Not another stay, a pause.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-white">{children}</body>
    </html>
  )
}
