'use client'
import { useState } from 'react'
import AdvancedMenu from './AdvancedMenu'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <header className="w-full bg-slate-900/80 backdrop-blur-xl fixed top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-bold text-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-white transition-all duration-300">
              Canoply
            </span>
          </a>
          <nav className="hidden lg:flex gap-8 items-center text-sm font-medium">
            <button 
              onClick={() => setMenuOpen(true)}
              className="text-slate-300 hover:text-white transition-colors relative group"
            >
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            <a href="#" className="group relative px-6 py-2 rounded-full font-semibold text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Book now</span>
            </a>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <a href="#" className="group relative px-4 py-2 rounded-full font-semibold text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <span className="relative z-10 text-sm">Book now</span>
            </a>
            <button onClick={() => setMenuOpen(true)} aria-label="menu" className="p-2 text-white hover:text-blue-300 transition-colors">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
    
    {/* Advanced Menu */}
    <AdvancedMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
