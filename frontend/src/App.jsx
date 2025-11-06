import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import ReceiptModal from "./components/ReceiptModal";
import { api } from "./services/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts(1, 20);
      setProducts(data.products);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      await api.addToCart(productId, quantity);
      await loadCart();
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await api.removeFromCart(productId);
      await loadCart();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await api.removeFromCart(productId);
      await api.addToCart(productId, newQuantity);
      await loadCart();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const result = await api.checkout(cart.items);
      setReceipt(result.receipt);
      await loadCart();
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a
              className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
              href="/"
            >
              Nexora Shop
            </a>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Cart
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showCart ? (
          <Cart
            cart={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => {
            setReceipt(null);
            setShowCart(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
