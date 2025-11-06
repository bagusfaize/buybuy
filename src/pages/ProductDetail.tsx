import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { GoChevronRight, GoPlus } from "react-icons/go";
import { useCartStore } from "../store/cartStore";
import QuantityButton from "../components/QuantityButton";
import { BsStars } from "react-icons/bs";
import { FaStar, FaUserCircle } from "react-icons/fa";

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
    return <LoadingState />
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
          Home
        </Link>
        <span><GoChevronRight /></span>
        <Link to={"/"}>
          <span className="capitalize">
            {`${product.category.name}`}
          </span>
        </Link>
        <span><GoChevronRight /></span>
        <span className="capitalize text-slate-500">
          {`${product.title}`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-0 md:gap-5 mt-7">
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 flex items-center justify-center rounded-xl">
          <img
            src={image}
            alt={product.title}
            className="max-h-[350px] rounded-xl"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="mt-5">
              <span className="font-medium text-blue-500 block">
                {product.category.name}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl capitalize wrap-break-word">
              {product.title}
            </h1>
            <p className="mt-7 flex space-x-3 font-medium">
              <span className="text-gray-900 text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through">
                ${(product.price + 10).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="mt-5">
            <div className="mb-3">
              <span className="text-sm text-gray-500 block">
                {product.description}
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
                className="w-full lg:w-52 bg-blue-600 border border-transparent rounded-lg mt-7 md:mt-0 py-3 flex items-center justify-center text-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-xl shadow-blue-200 cursor-pointer"
              >
                <GoPlus className="mr-2" />
                Add to Cart
              </button>
            }
          </div>

        </div>
      </div>
      <div>
        <SimpleProductReviews />
      </div>
    </div>
  );
}

const SimpleStars = () => {
  return (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <span
          key={i}
          className="text-yellow-500"
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

const simpleReviews = [
  {
    id: 101,
    rating: 4.5,
    title: "Best Purchase This Day",
    text: "The quality so good. OMG!!!",
    author: "Andrea M.",
  },
  {
    id: 102,
    rating: 4.5,
    title: "Very Good Product",
    text: "Almost perfect. My only minor issue was the delivery speed, but the item itself is excellent.",
    author: "Andrea M.",
  },
  {
    id: 103,
    rating: 4.5,
    title: "Highly Recommend!",
    text: "No cons. No issues. All perfect!!!",
    author: "Andrea M.",
  },
];

const SimpleProductReviews = () => {
  const averageRating = (
    simpleReviews.reduce((sum, r) => sum + r.rating, 0) / simpleReviews.length
  ).toFixed(1);

  return (
    <div className="px-2 py-7 md:p-10 border-t border-gray-300 mx-auto mt-20 mb-5">
      <h2 className="text-2xl font-medium text-gray-900 mb-4">
        Customer Reviews
      </h2>

      {/* Simplified Average Summary */}
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 mb-4">
        <div className="shrink-0">
          <p className="text-4xl font-extrabold text-blue-600">
            {averageRating}
          </p>
        </div>
        <div>
          <SimpleStars />
          <p className="text-sm text-gray-500 mt-0.5">
            ({simpleReviews.length} ratings)
          </p>
        </div>
      </div>

      <div>
        <ReviewSummaryBox />
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {simpleReviews.map((review) => (
          <div key={review.id} className="pb-4 flex space-x-3">
            <div className="">
              <FaUserCircle className="w-10 h-10 text-gray-400 shrink-0" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex flex-col grow">
                  <p className="text-sm text-blue-600 font-semibold leading-none mb-1.5">
                    {review.author}
                  </p>
                  <SimpleStars />
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.text}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

const ReviewSummaryBox = () => {

  return (
    <div className={`p-4 border rounded-xl bg-blue-50 border-blue-400 mb-7`}>

      <div className="flex items-center pb-2">
        <div className="flex items-center space-x-1.5">
          <h3 className="font-bold">
            Summary reviews from buyers
          </h3>
          <BsStars className="text-blue-600" />
        </div>
      </div>

      <p className="text-xs opacity-70">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam quia perspiciatis blanditiis error, temporibus soluta officiis. Enim numquam, voluptas, praesentium modi debitis vitae iusto inventore quia nostrum, totam dolorum delectus!</p>

    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center p-8 text-blue-700 my-7 min-h-svh">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-4 border-blue-500 border-t-transparent mr-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-lg font-medium">Loading product...</p>
    </div>
  )
}