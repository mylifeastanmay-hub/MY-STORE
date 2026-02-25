'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../lib/store'

const products = [
  { id: 1, name: "Banarasi Saree", price: 1299, desc: "Pure silk with golden zari work", emoji: "👘" },
  { id: 2, name: "Sherwani", price: 2499, desc: "Royal embroidered sherwani for men", emoji: "🥻" },
  { id: 3, name: "Lehenga Choli", price: 1899, desc: "Bridal lehenga with heavy embroidery", emoji: "👗" },
  { id: 4, name: "Kurta Pajama", price: 799, desc: "Cotton kurta for daily wear", emoji: "🧥" },
  { id: 5, name: "Anarkali Suit", price: 1499, desc: "Elegant floral anarkali suit", emoji: "👚" },
  { id: 6, name: "Dhoti Kurta", price: 699, desc: "Traditional dhoti kurta set", emoji: "🩱" },
]

export default function Home() {
  const { items, addItem, removeItem, total } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [added, setAdded] = useState<number | null>(null)

  const handleAdd = (p: typeof products[0]) => {
    addItem(p)
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1000)
  }

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="bg-orange-500 px-8 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-wide">🪔 RADHEY CLOTH CENTER</h1>
          <p className="text-orange-100 text-xs">Traditional Indian Wear Since 1995</p>
        </div>
        <div className="flex gap-6 text-white font-medium items-center">
          <a href="#" className="hover:text-orange-200">Home</a>
          <a href="#" className="hover:text-orange-200">Products</a>
          <a href="#" className="hover:text-orange-200">About</a>
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-white text-orange-500 font-bold px-4 py-2 rounded-full hover:bg-orange-100 transition"
          >
            🛒 Cart
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.reduce((a, i) => a + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-400 text-white py-24 px-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 text-9xl flex flex-wrap gap-8 p-8 select-none">
          {['🪔','🌸','✨','🕌','🎊','🌺','💫','🪷'].map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
        <h2 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to Radhey Cloth Center</h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">Discover the finest Traditional Indian Wear — Sarees, Sherwanis, Lehengas & More</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-500 font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:bg-orange-50 transition"
        >
          Shop Now ✨
        </motion.button>
      </motion.section>

      {/* Products Grid */}
      <section className="px-8 py-16 bg-orange-50">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center text-orange-600 mb-2"
        >
          Our Collection
        </motion.h3>
        <p className="text-center text-gray-500 mb-12">Handpicked traditional wear for every occasion</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 border border-orange-100"
            >
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl h-48 flex items-center justify-center mb-4">
                <span className="text-7xl">{p.emoji}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800">{p.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
              <p className="text-orange-500 font-bold text-2xl mt-3">₹{p.price}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAdd(p)}
                className={`mt-4 w-full font-semibold py-3 rounded-2xl transition text-white ${added === p.id ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                {added === p.id ? '✅ Added!' : 'Add to Cart 🛒'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-96 bg-white z-50 shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-orange-500">🛒 Your Cart</h3>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
              </div>
              {items.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <p className="text-6xl mb-4">🛒</p>
                  <p>Your cart is empty!</p>
                </div>
              ) : (
                <>
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-orange-100">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-orange-500 text-sm">₹{item.price} × {item.quantity}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xl">🗑️</button>
                    </div>
                  ))}
                  <div className="mt-8 p-4 bg-orange-50 rounded-2xl">
                    <p className="text-xl font-bold text-gray-800">Total: <span className="text-orange-500">₹{total()}</span></p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-lg transition"
                  >
                    Checkout 💳
                  </motion.button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-orange-500 text-white px-8 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-lg mb-2">🪔 Radhey Cloth Center</h5>
            <p className="text-orange-100 text-sm">Your trusted destination for authentic Indian traditional wear since 1995.</p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-2">Quick Links</h5>
            <ul className="text-orange-100 text-sm space-y-1">
              <li>Home</li>
              <li>Products</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-2">Contact Us</h5>
            <p className="text-orange-100 text-sm">📍 Nashik, Maharashtra</p>
            <p className="text-orange-100 text-sm">📞 +91 98765 43210</p>
            <p className="text-orange-100 text-sm">✉️ radhey@gmail.com</p>
          </div>
        </div>
        <p className="text-center text-orange-200 text-sm mt-8">© 2025 Radhey Cloth Center. All rights reserved.</p>
      </footer>

    </main>
  )
}