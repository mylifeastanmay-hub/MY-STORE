'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCart } from '../lib/store'

const products = [
  {
    id: 1, name: "Banarasi Saree", price: 1299, desc: "Pure silk with golden zari work", tag: "Bestseller",
    
    category: "Women"
  },
  {
    id: 2, name: "Royal Sherwani", price: 2499, desc: "Embroidered sherwani for groom & occasions", tag: "Premium",
    category: "Men"
  },
  {
    id: 3, name: "Bridal Lehenga", price: 3899, desc: "Heavy embroidery bridal lehenga choli", tag: "Bridal",
    category: "Women"
  },
  {
    id: 4, name: "Silk Kurta Set", price: 799, desc: "Premium cotton-silk kurta pajama", tag: "Daily Wear",
    category: "Men"
  },
  {
    id: 5, name: "Anarkali Suit", price: 1499, desc: "Elegant floral anarkali with dupatta", tag: "Trending",
    category: "Women"
  },
  {
    id: 6, name: "Dhoti Kurta", price: 699, desc: "Traditional festive dhoti kurta set", tag: "Classic",
    category: "Men"
  },
  {
    id: 7, name: "Chanderi Saree", price: 1099, desc: "Lightweight chanderi silk with border", tag: "New",
    category: "Women"
  },
  {
    id: 8, name: "Indo-Western Suit", price: 1799, desc: "Modern fusion with traditional touch", tag: "Fusion",
    category: "Men"
  },
  {
    id: 9, name: "Patola Saree", price: 2199, desc: "Authentic Gujarati patola weave", tag: "Heritage",
    category: "Women"
  },{ id: 10, name: "Kanjivaram Saree", price: 2799, desc: "Pure silk from Tamil Nadu with rich zari", tag: "Heritage", category: "Women" },
  { id: 11, name: "Nehru Jacket", price: 899, desc: "Classic Nehru collar jacket for men", tag: "Trending", category: "Men" },
  { id: 12, name: "Bandhgala Suit", price: 1999, desc: "Elegant closed-neck formal Indian suit", tag: "Premium", category: "Men" },
  { id: 13, name: "Jodhpuri Suit", price: 2299, desc: "Royal Rajasthani jodhpuri for occasions", tag: "Royal", category: "Men" },
  { id: 14, name: "Ghagra Choli", price: 1299, desc: "Vibrant Rajasthani ghagra with mirror work", tag: "Festive", category: "Women" },
  { id: 15, name: "Boys Sherwani", price: 999, desc: "Adorable sherwani set for little ones", tag: "Kids", category: "Kids" },
  { id: 16, name: "Girls Lehenga", price: 799, desc: "Beautiful embroidered lehenga for girls", tag: "Kids", category: "Kids" },
  { id: 17, name: "Sharara Suit", price: 1599, desc: "Flowy sharara with embroidered kurti", tag: "New", category: "Women" },
  { id: 18, name: "Modi Kurta", price: 599, desc: "Half sleeve cotton Modi style kurta", tag: "Daily Wear", category: "Men" },
]

const categories = ['All', 'Women', 'Men', 'Kids']

export default function Home() {
  const { items, addItem, removeItem, total } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [added, setAdded] = useState<number | null>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAdd = (p: typeof products[0]) => {
    addItem(p)
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1200)
  }

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  return (
    <>
      {/* NAMASKAR SPLASH */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0008 0%, #1a0010 50%, #2d0800 100%)' }}
          >
            <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #ff6b00, transparent)', top: '0%', left: '20%' }} />
            <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #ffd700, transparent)', bottom: '0%', right: '10%' }} />

            {['🪔','🌸','✨','🌺','💫','🪷','⭐','🔱','🎊','🌼'].map((e, i) => (
              <motion.div key={i} className="absolute text-2xl"
                style={{ left: `${8 + i * 9}%`, top: `${12 + (i % 4) * 22}%` }}
                animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
              >{e}</motion.div>
            ))}

            {[300, 220, 160].map((size, i) => (
              <motion.div key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full"
                style={{ width: size, height: size, border: `1px solid rgba(255,${i === 1 ? 215 : 107},0,${0.15 - i * 0.03})`, boxShadow: `0 0 ${40 - i * 10}px rgba(255,107,0,0.1)` }}
              />
            ))}

            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }} className="text-center z-10">
              <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-6xl mb-4">🙏</motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-9xl font-bold mb-4"
                style={{ fontFamily: 'Tiro Devanagari Hindi, serif', background: 'linear-gradient(135deg, #ffd700, #ff6b00, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.4))' }}
              >नमस्कार</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-xl tracking-[0.5em] uppercase mb-2" style={{ color: '#ffd700', fontFamily: 'Cormorant Garamond, serif' }}>Welcome to</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-3xl font-bold tracking-widest" style={{ color: 'white', fontFamily: 'Playfair Display, serif' }}>RADHEY CLOTH CENTER</motion.p>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="h-px w-72 mx-auto mt-6" style={{ background: 'linear-gradient(to right, transparent, #ffd700, transparent)' }} />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="text-sm tracking-[0.3em] mt-4 uppercase" style={{ color: 'rgba(255,107,0,0.8)' }}>🪔 Traditional Indian Wear Since 1995 🪔</motion.p>
            </motion.div>

            <motion.div className="absolute bottom-10 w-56 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,215,0,0.15)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3.2, ease: 'easeInOut' }} className="h-full rounded-full" style={{ background: 'linear-gradient(to right, #ff6b00, #ffd700)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen overflow-x-hidden" style={{ background: '#08000f', fontFamily: 'Cormorant Garamond, serif' }}>

        {/* Navbar */}
        <motion.nav
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20, delay: 3.6 }}
          className="sticky top-0 z-50 px-10 py-5 flex items-center justify-between"
          style={{ background: scrollY > 50 ? 'rgba(8,0,15,0.96)' : 'transparent', backdropFilter: 'blur(20px)', borderBottom: scrollY > 50 ? '1px solid rgba(255,215,0,0.1)' : 'none', transition: 'all 0.4s' }}
        >
          <div>
            <h1 className="text-xl font-bold tracking-widest" style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(135deg, #ffd700, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🪔 RADHEY CLOTH CENTER</h1>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(255,107,0,0.6)' }}>Traditional Indian Wear Since 1995</p>
          </div>
          <div className="flex gap-8 items-center">
            {['Home', 'Collection', 'About'].map(link => (
              <motion.a key={link} href="#" whileHover={{ y: -2 }} className="text-xs tracking-[0.2em] uppercase transition" style={{ color: 'rgba(255,215,0,0.7)', fontFamily: 'Cormorant Garamond, serif' }}>{link}</motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="relative font-bold px-5 py-2 rounded-full text-xs tracking-widest"
              style={{ background: 'linear-gradient(135deg, #ff6b00, #ffd700)', color: '#08000f' }}
            >
              🛒 CART
              {items.length > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.reduce((a, i) => a + i.quantity, 0)}
                </motion.span>
              )}
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(255,107,0,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(255,215,0,0.08) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(120,0,40,0.15) 0%, transparent 50%), #08000f' }} />

          {[
            { size: 500, x: '5%', y: '10%', color: 'rgba(255,107,0,0.06)' },
            { size: 300, x: '70%', y: '5%', color: 'rgba(255,215,0,0.06)' },
            { size: 600, x: '50%', y: '50%', color: 'rgba(100,0,30,0.08)' },
          ].map((orb, i) => (
            <motion.div key={i} className="absolute rounded-full blur-3xl pointer-events-none"
              style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: orb.color }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 5 + i, repeat: Infinity }}
            />
          ))}

          {/* 3D Rotating Fabric Card */}
          <motion.div
            animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 4, 0, -4, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-24 top-1/2 -translate-y-1/2 w-72 h-96 rounded-3xl overflow-hidden hidden lg:block"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d', border: '1px solid rgba(255,215,0,0.2)', boxShadow: '0 0 80px rgba(255,107,0,0.15), 0 40px 80px rgba(0,0,0,0.4)' }}
          >
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" alt="saree" className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,0,15,0.8) 0%, transparent 60%)' }} />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs tracking-widest uppercase" style={{ color: '#ff6b00' }}>Featured</p>
              <p className="text-xl font-bold" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>Banarasi Saree</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ rotateY: [0, -8, 0, 8, 0], rotateX: [0, -4, 0, 4, 0], y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute left-16 top-1/3 w-48 h-64 rounded-2xl overflow-hidden hidden lg:block"
            style={{ perspective: '1000px', border: '1px solid rgba(255,215,0,0.15)', boxShadow: '0 0 40px rgba(255,107,0,0.1), 0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <img src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=300&q=80" alt="sherwani" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,0,15,0.7) 0%, transparent 60%)' }} />
          </motion.div>

          <div className="relative text-center px-8 max-w-3xl mx-auto z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.8, duration: 1 }}>
              <p className="text-xs tracking-[0.6em] uppercase mb-8" style={{ color: 'rgba(255,107,0,0.7)' }}>✦ The House of Tradition ✦</p>
              <h2 className="font-black mb-2 leading-none" style={{ fontFamily: 'Playfair Display, serif', fontSize: '6rem', background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 40%, #ff6b00 70%, #ffd700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 60px rgba(255,215,0,0.2))' }}>RADHEY</h2>
              <h2 className="font-black mb-10 leading-none" style={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.3em' }}>CLOTH CENTER</h2>

              <div className="flex items-center justify-center gap-6 mb-10">
                <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.4))' }} />
                <p className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(255,215,0,0.5)' }}>Est. 1995 • Nashik</p>
                <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(255,215,0,0.4))' }} />
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(255,107,0,0.5)' }} whileTap={{ scale: 0.95 }}
                  className="font-bold px-10 py-4 rounded-full text-sm tracking-widest uppercase"
                  style={{ background: 'linear-gradient(135deg, #ff6b00, #ffd700)', color: '#08000f', fontFamily: 'Playfair Display, serif' }}>
                  Explore Collection
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="font-bold px-10 py-4 rounded-full text-sm tracking-widest uppercase transition"
                  style={{ border: '1px solid rgba(255,215,0,0.3)', color: 'rgba(255,215,0,0.7)', fontFamily: 'Playfair Display, serif' }}>
                  Our Heritage
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,215,0,0.3)' }}>Scroll</p>
            <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(255,215,0,0.3), transparent)' }} />
          </motion.div>
        </section>

        {/* Marquee */}
        <div className="py-3 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ff6b00, #ffd700, #ff6b00)', borderTop: '1px solid rgba(255,215,0,0.2)', borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
          <motion.div animate={{ x: [0, -1400] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="flex gap-16 whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: '#08000f' }}>
                🪔 Free Delivery Above ₹999 &nbsp;✦&nbsp; New Festive Collection &nbsp;✦&nbsp; Authentic Handwoven Wear &nbsp;✦&nbsp; 30 Day Returns &nbsp;✦&nbsp; Cash on Delivery Available &nbsp;✦&nbsp;
              </span>
            ))}
          </motion.div>
        </div>

        {/* Collection Section */}
        <section className="px-10 py-28" style={{ background: 'linear-gradient(180deg, #08000f 0%, #0f0018 50%, #08000f 100%)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(255,107,0,0.7)' }}>✦ Curated With Love ✦</p>
            <h3 className="font-black mb-6" style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', background: 'linear-gradient(135deg, #ffd700, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Collection</h3>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.4))' }} />
              <span style={{ color: 'rgba(255,215,0,0.4)', fontSize: '0.8rem' }}>🌸</span>
              <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(255,215,0,0.4))' }} />
            </div>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-14">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className="px-8 py-2 rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-300"
                style={{
                  background: activeCategory === cat ? 'linear-gradient(135deg, #ff6b00, #ffd700)' : 'transparent',
                  color: activeCategory === cat ? '#08000f' : 'rgba(255,215,0,0.5)',
                  border: activeCategory === cat ? 'none' : '1px solid rgba(255,215,0,0.2)',
                  fontFamily: 'Cormorant Garamond, serif'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredProduct(p.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="rounded-3xl overflow-hidden cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', transition: 'all 0.4s' }}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredProduct === p.id ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,0,15,0.9) 0%, rgba(8,0,15,0.1) 50%, transparent 100%)' }} />

                  {/* Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: 'rgba(255,107,0,0.9)', color: 'white', backdropFilter: 'blur(10px)' }}>
                    {p.tag}
                  </div>

                  {/* Category */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs tracking-widest uppercase" style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,215,0,0.8)', backdropFilter: 'blur(10px)' }}>
                    {p.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>{p.name}</h4>
                  <p className="text-sm mb-5" style={{ color: 'rgba(255,215,0,0.4)', fontFamily: 'Cormorant Garamond, serif' }}>{p.desc}</p>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-extrabold text-2xl" style={{ color: '#ff6b00', fontFamily: 'Playfair Display, serif' }}>₹{p.price}</p>
                      <p className="text-xs line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>₹{p.price + 600}</p>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                      In Stock
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAdd(p)}
                    className="w-full font-bold py-3 rounded-2xl text-xs tracking-widest uppercase transition-all duration-300"
                    style={{
                      background: added === p.id ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ff6b00, #ffd700)',
                      color: '#08000f',
                      boxShadow: added === p.id ? '0 8px 20px rgba(34,197,94,0.3)' : '0 8px 20px rgba(255,107,0,0.3)',
                      fontFamily: 'Cormorant Garamond, serif'
                    }}
                  >
                    {added === p.id ? '✅ Added to Cart!' : 'Add to Cart'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-10" style={{ background: 'rgba(255,107,0,0.04)', borderTop: '1px solid rgba(255,215,0,0.07)', borderBottom: '1px solid rgba(255,215,0,0.07)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹999' },
              { icon: '↩️', title: '30 Day Returns', desc: 'Hassle free returns' },
              { icon: '✅', title: '100% Authentic', desc: 'Genuine Indian wear' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Safe & encrypted' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ y: -4 }}>
                <div className="text-4xl mb-3">{f.icon}</div>
                <h5 className="font-bold text-base mb-1" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>{f.title}</h5>
                <p className="text-xs" style={{ color: 'rgba(255,215,0,0.4)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}
                className="fixed right-0 top-0 h-full w-96 z-50 overflow-y-auto"
                style={{ background: '#08000f', borderLeft: '1px solid rgba(255,215,0,0.1)', boxShadow: '-30px 0 80px rgba(0,0,0,0.6)' }}
              >
                <div className="p-8" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,215,0,0.05))', borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>Your Cart</h3>
                    <button onClick={() => setCartOpen(false)} className="text-xl transition" style={{ color: 'rgba(255,215,0,0.4)' }}>✕</button>
                  </div>
                  <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: 'rgba(255,107,0,0.6)' }}>{items.length} items selected</p>
                </div>
                <div className="p-8">
                  {items.length === 0 ? (
                    <div className="text-center mt-24">
                      <p className="text-5xl mb-4">🛒</p>
                      <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(255,215,0,0.3)' }}>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      {items.map(item => (
                        <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid rgba(255,215,0,0.07)' }}>
                          <div>
                            <p className="font-bold text-sm" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>{item.name}</p>
                            <p className="text-xs mt-1" style={{ color: '#ff6b00' }}>₹{item.price} × {item.quantity}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-lg hover:scale-110 transition">🗑️</button>
                        </motion.div>
                      ))}
                      <div className="mt-8 p-5 rounded-2xl" style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.1)' }}>
                        <div className="flex justify-between text-xs mb-2 tracking-wider" style={{ color: 'rgba(255,215,0,0.5)' }}><span>SUBTOTAL</span><span>₹{total()}</span></div>
                        <div className="flex justify-between text-xs mb-3 tracking-wider" style={{ color: 'rgba(255,215,0,0.5)' }}><span>DELIVERY</span><span className="text-green-400">FREE</span></div>
                        <div className="h-px mb-4" style={{ background: 'rgba(255,215,0,0.1)' }} />
                        <div className="flex justify-between font-bold"><span style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>Total</span><span style={{ color: '#ff6b00', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>₹{total()}</span></div>
                      </div>
                      <motion.button whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(255,107,0,0.4)' }} whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full font-bold py-4 rounded-2xl text-sm tracking-widest uppercase"
                        style={{ background: 'linear-gradient(135deg, #ff6b00, #ffd700)', color: '#08000f', fontFamily: 'Playfair Display, serif' }}>
                        Proceed to Checkout
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="px-10 py-20" style={{ background: '#040008', borderTop: '1px solid rgba(255,215,0,0.07)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-16">
            <div>
              <h5 className="font-bold text-lg mb-5" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>🪔 Radhey Cloth Center</h5>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,215,0,0.35)', fontFamily: 'Cormorant Garamond, serif' }}>Your trusted destination for authentic Indian traditional wear since 1995. Bringing culture and tradition to your wardrobe.</p>
            </div>
            <div>
              <h5 className="font-bold text-base mb-5 tracking-widest uppercase" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>Quick Links</h5>
              <ul className="space-y-3">
                {['Home', 'Collection', 'About Us', 'Contact'].map(l => (
                  <li key={l} className="text-sm cursor-pointer transition tracking-wider" style={{ color: 'rgba(255,215,0,0.35)', fontFamily: 'Cormorant Garamond, serif' }}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-base mb-5 tracking-widest uppercase" style={{ color: '#ffd700', fontFamily: 'Playfair Display, serif' }}>Contact Us</h5>
              <p className="text-sm mb-3" style={{ color: 'rgba(255,215,0,0.35)' }}>📍 Bus Stand Road, Shembalpimpri</p>
              <p className="text-sm mb-3" style={{ color: 'rgba(255,215,0,0.35)' }}>📞 +91 98812 29141</p>
              <p className="text-sm" style={{ color: 'rgba(255,215,0,0.35)' }}>✉️ mylifeastanmay@gmail.com</p>
            </div>
          </div>
          <div className="h-px my-10" style={{ background: 'rgba(255,215,0,0.07)' }} />
          <p className="text-center text-xs tracking-widest uppercase" style={{ color: 'rgba(255,215,0,0.2)' }}>© 2025 Radhey Cloth Center • All Rights Reserved • Made with ❤️ in India</p>
        </footer>
      </main>
    </>
  )
}