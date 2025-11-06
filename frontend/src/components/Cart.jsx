import { useState } from "react";

export default function Cart({ cart, onRemove, onUpdateQuantity, onCheckout }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCheckout(customerInfo);
      setShowCheckout(false);
      setCustomerInfo({ name: "", email: "" });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add some products to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Shopping Cart
      </h2>
      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div
            key={item.productId}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ${item.price.toFixed(2)} / {item.unit}
              </p>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  onUpdateQuantity(item.productId, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="px-4 py-1 dark:text-white">{item.quantity}</span>
              <button
                onClick={() =>
                  onUpdateQuantity(item.productId, item.quantity + 1)
                }
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                +
              </button>
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white w-24 text-right">
              ${item.total.toFixed(2)}
            </div>
            <button
              className="text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
              onClick={() => onRemove(item.productId)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            ${cart.total.toFixed(2)}
          </span>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setShowCheckout(true)}
        >
          Proceed to Checkout
        </button>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-bold w-8 h-8 flex items-center justify-center"
              onClick={() => setShowCheckout(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Checkout
            </h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Total Items: {cart.items.length}
                </p>
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  Total: ${cart.total.toFixed(2)}
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
