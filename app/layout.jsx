import './globals.css'

export const metadata = {
  title: 'Canoply Clone',
  description: 'Pixel-focused clone built with Next.js + Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased text-slate-900 bg-white">
        {children}
      </body>
    </html>
  )
}
