export default function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-bold w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Order Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your purchase
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
            <span className="font-mono text-gray-900 dark:text-white">
              {receipt.orderId.slice(0, 8)}...
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Date:</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(receipt.timestamp).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Time:</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(receipt.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Order Items:
          </h3>
          <div className="space-y-2">
            {receipt.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-600 pb-2"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300 dark:border-gray-600 mb-6">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            ${receipt.total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
