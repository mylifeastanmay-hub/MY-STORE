export default function Home() {
  const products = [
    { id: 1, name: "Banarasi Saree", price: 1299, desc: "Pure silk with golden zari work" },
    { id: 2, name: "Sherwani", price: 2499, desc: "Royal embroidered sherwani for men" },
    { id: 3, name: "Lehenga Choli", price: 1899, desc: "Bridal lehenga with heavy embroidery" },
    { id: 4, name: "Kurta Pajama", price: 799, desc: "Cotton kurta for daily wear" },
    { id: 5, name: "Anarkali Suit", price: 1499, desc: "Elegant floral anarkali suit" },
    { id: 6, name: "Dhoti Kurta", price: 699, desc: "Traditional dhoti kurta set" },
  ]

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="bg-orange-500 px-8 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-wide">🪔 RADHEY CLOTH CENTER</h1>
          <p className="text-orange-100 text-xs">Traditional Indian Wear Since 1995</p>
        </div>
        <div className="flex gap-6 text-white font-medium">
          <a href="#" className="hover:text-orange-200">Home</a>
          <a href="#" className="hover:text-orange-200">Products</a>
          <a href="#" className="hover:text-orange-200">About</a>
          <a href="#" className="hover:text-orange-200">Contact</a>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-20 px-8 text-center">
        <h2 className="text-5xl font-bold mb-4">Welcome to Radhey Cloth Center</h2>
        <p className="text-xl text-orange-100 mb-8">Discover the finest Traditional Indian Wear — Sarees, Sherwanis, Lehengas & More</p>
        <button className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-lg hover:bg-orange-100 transition">
          Shop Now
        </button>
      </section>

      {/* Products Grid */}
      <section className="px-8 py-16 bg-orange-50">
        <h3 className="text-3xl font-bold text-center text-orange-600 mb-2">Our Collection</h3>
        <p className="text-center text-gray-500 mb-10">Handpicked traditional wear for every occasion</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-orange-100">
              <div className="bg-orange-100 rounded-xl h-48 flex items-center justify-center mb-4">
                <span className="text-6xl">👗</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800">{p.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
              <p className="text-orange-500 font-bold text-xl mt-3">₹{p.price}</p>
              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-500 text-white px-8 py-10 mt-0">
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