import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await onAddToCart(product.id, quantity);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover bg-gray-100"
      />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-1">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          ${product.price.toFixed(2)} / {product.unit}
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={loading || quantity <= 1}
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              disabled={loading}
              className="w-14 text-center border-none py-2.5 bg-white dark:bg-gray-800 dark:text-white focus:outline-none font-semibold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={loading}
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95"
            >
              +
            </button>
          </div>
          <button
            className="flex-1 bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
