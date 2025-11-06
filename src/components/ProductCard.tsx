import { Link } from "react-router-dom";
import type { Product } from "../types/types";
import { FaShippingFast, FaStar } from "react-icons/fa";

export default function ProductCard({ product }: { product: Product }) {
    const image = product.images?.[0] ?? product.image ?? "";

    return (
        <Link
            to={`/product/${product.id}`}
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col group hover:shadow-md hover:scale-[1.01] transition-all"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                    src={image}
                    alt={product.title}
                    className="max-h-full object-contain"
                />
            </div>

            <div className="px-3 py-4 flex flex-col grow">
                <h3 className="font-semibold text-gray-800 capitalize truncate">
                    {product.title}
                </h3>
                <div className="text-md font-bold text-blue-600">
                    ${product.price}
                </div>
                <div className="flex items-center mt-2">
                    <span className="flex items-center space-x-1">
                        <span><FaStar className=" text-xs text-yellow-400" /></span>
                        <span className="text-xs text-gray-500">4.5</span>
                    </span>
                    <span className="text-sm text-gray-400 mx-1">•</span>
                    <span className="text-xs text-gray-500">
                        75 sold
                    </span>
                </div>
                <div className="flex items-center mt-1">
                    <span className="flex items-center space-x-1">
                        <span><FaShippingFast className=" text-xs text-blue-600" /></span>
                        <span className="text-xs font-medium">FREE SHIPPING</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
