import { useCartStore } from '../store/cartStore';
import QuantityButton from '../components/QuantityButton';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const cartQuantity = useCartStore((state) => state.totalItems());
  const subtotalPrice = useCartStore((state) => state.subtotal());
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({cartQuantity} Items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6 bg-white shadow rounded-xl shadow-lg">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex p-4 sm:p-6 border-b border-gray-200 relative"
              >
                <div className="flex w-full items-start space-x-4">

                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-lg shrink-0 border border-gray-200"
                  />

                  <div className="flex flex-col sm:flex-row justify-between w-full">

                    <div className="grow pr-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.product.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="text-blue-600 text-lg font-medium">${item.product.price.toFixed(2)}</span>
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between mt-3 sm:mt-0 space-x-4 sm:space-x-0 sm:space-y-4">

                      <div className="flex flex-col items-start sm:items-end">
                        <span className="text-sm text-gray-600 font-medium">Subtotal</span>
                        <span className="text-xl font-bold text-gray-900 mt-0.5">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <QuantityButton
                        productId={item.product.id}
                        quantity={item.quantity}
                        onIncrement={incrementItem}
                        onDecrement={decrementItem}
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && <EmptyCartState />}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-20 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-5 border-b border-gray-300 pb-3"> Summary</h2>

              <div className="flex justify-between items-center my-8">
                <span className="text-medium font-medium text-gray-600">Order Total</span>
                <span className="text-xl font-bold text-blue-600">${subtotalPrice.toFixed(2)}</span>
              </div>

              <button
                disabled={cartItems.length === 0}
                className="w-full mt-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const EmptyCartState = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto my-15">
      <div className="p-4 bg-blue-100 rounded-full mb-3">
        <FiShoppingBag className="h-5 w-5 text-blue-600" />
      </div>
      <h2 className="text-medium font-medium text-gray-900">
        Your Shopping Cart is Empty
      </h2>
      <Link
        to="/"
        className="mt-3 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm"
      >
        Explore Products
      </Link>
    </div>
  )
}