import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { useCartStore } from "../store/cartStore";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  // todo get cart from store 
  const cartQuantity = useCartStore((state) => state.totalItems());
  const displayedQuantity = cartQuantity < 10 ? cartQuantity : "9+";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-light text-gray-900 tracking-tight"
        >
          <div className="relative w-8 h-8 overflow-hidden bg-blue-500 rounded-lg shadow-lg flex items-center justify-center">
            <RiShoppingBag2Fill
              className="absolute -bottom-3 -right-2 h-9 w-9 text-white transform rotate-12"
            />
          </div>
          <span className="text-xl font-logo">
            <span className="text-blue-700">Buy</span>
            <span className=" text-blue-600">buy</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-3">
          <Link
            to="/cart"
            className="relative p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 transition-colors duration-150 rounded-xl"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartQuantity !== 0 &&
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-xl h-5 w-6 flex items-center justify-center text-xs border-2">
                {displayedQuantity}
              </span>
            }
          </Link>
          <Link
            to="/cart"
            className="relative p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 transition-colors duration-150 rounded-xl"
          >
            <FaRegUser className="h-5 w-5" />
          </Link>
        </nav>

      </div>
    </header>
  );
}
