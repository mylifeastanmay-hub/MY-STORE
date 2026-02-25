export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10">My Store</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">T-Shirt</h2>
          <p className="text-gray-500 mt-2">A cool t-shirt</p>
          <p className="text-blue-600 font-bold mt-4">$29.99</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
            Add to Cart
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Pants</h2>
          <p className="text-gray-500 mt-2">Stylish pants</p>
          <p className="text-blue-600 font-bold mt-4">$49.99</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
            Add to Cart
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Hoodie</h2>
          <p className="text-gray-500 mt-2">A warm hoodie</p>
          <p className="text-blue-600 font-bold mt-4">$59.99</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}