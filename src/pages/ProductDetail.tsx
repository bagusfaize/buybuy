import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { GoChevronRight, GoPlus } from "react-icons/go";
import { useCartStore } from "../store/cartStore";
import QuantityButton from "../components/QuantityButton";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  const items = useCartStore((state) => state.items);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    // to do optimistic update tanstack
    if (product) {
      addToCart(product, 1);
    }
  }

  const isProductOnCart = items.find((c) => c.product.id === product?.id) ?? false;

  if (isLoading) {
    return <div className="text-center py-10 text-gray-600">Loading product...</div>;
  }

  if (isError || !product) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load product details.
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const image = product.images?.[0] ?? product.image ?? "";

  return (
    <div className="min-h-screen">
      <div className="flex gap-1 items-center text-sm font-semibold text-slate-700">
        <Link to={"/"}>
          Product List
        </Link>
        <span><GoChevronRight /></span>
        <span className="capitalize text-slate-500">{`${product.title}`}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div className="flex items-center justify-center bg-white rounded-xl shadow p-6">
          <img
            src={image}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize wrap-break-word">
              {product.title}
            </h1>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              <span className="text-blue-600">
                ${product.price}
              </span>
            </p>
          </div>
          <div className="mt-6">
            <div className="mb-3">
              {/* <p className="text-sm font-medium text-gray-900">Product ID:</p>
              <span className="text-base text-gray-700">
                {product.id}
              </span> */}
            </div>
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">Product Description:</p>
              <span className="text-base text-gray-700 block">
                {product.description}
              </span>
            </div>
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">Product Category:</p>
              <span className="text-base text-gray-700 block">
                {product.category.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {isProductOnCart ?
              <QuantityButton
                productId={product.id}
                quantity={isProductOnCart.quantity}
                onDecrement={decrementItem}
                onIncrement={incrementItem}
              />
              :
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-blue-600 border border-transparent rounded-lg py-3 flex items-center justify-center text-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-xl shadow-blue-200 cursor-pointer"
              >
                <GoPlus className="mr-2" />
                Add to Cart
              </button>
            }
          </div>

        </div>
      </div>
    </div>
  );
}
