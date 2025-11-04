import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
// import { useCartStore } from "../store/cartStore";

interface QuantityButtonProps {
    productId: number;
    quantity: number;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
    size?: 'small' | 'normal';
}

export default function QuantityButton({
    productId,
    quantity,
    onIncrement,
    onDecrement,
    size,
}: QuantityButtonProps) {

    const isSmall = size === 'small';
    const buttonBaseClasses = isSmall ? 'p-2 rounded-md' : 'p-3 rounded-lg shadow-md';
    const iconClasses = isSmall ? 'h-4 w-4' : 'h-5 w-5';
    const quantityDisplayClasses = isSmall ? 'px-2 py-1 text-base min-w-[35px]' : 'px-4 py-2 text-xl min-w-[50px]';

    return (
        <div className="inline-flex items-center">
            <button
                onClick={() => onDecrement(productId)}
                className={`
                    border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors duration-150 flex items-center justify-center cursor-pointer
                    ${buttonBaseClasses}
                `}
            >
                {quantity === 1 ? <FiTrash2 className={`${iconClasses} text-red-500`} /> : <FiMinus className={iconClasses} />}
            </button>
            <span className={`
                    font-semibold text-gray-900 text-center
                    ${quantityDisplayClasses}
                `}>
                {quantity}
            </span>
            <button
                onClick={() => onIncrement(productId)}
                className={`
                    bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150 flex items-center justify-center cursor-pointer
                    ${buttonBaseClasses}
                `}
            >
                <FiPlus className="h-5 w-5" />
            </button>
        </div>
    )
}
