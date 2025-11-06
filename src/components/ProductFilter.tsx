import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import type { Category } from "../types/types";

interface ProductFilterProps {
    // search props
    value: string;
    onChange: (value: string) => void;
    onSearch: (keyword: string) => void;
    onClear?: () => void;

    // category props
    categories: Category[];
    selectedCategoryId: number | null;
    onCategoryChange: (id: number | null) => void;
}

export default function ProductFilter({
    value,
    onChange,
    onSearch,
    onClear,
    categories,
    selectedCategoryId,
    onCategoryChange,
}: ProductFilterProps) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value.trim());
    };

    const handleClear = () => {
        onChange("");
        onClear?.();
    };

    const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value === "" ? null : parseInt(e.target.value);
        onCategoryChange(id);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-between items-center w-full max-w-xl gap-1 sm:gap-3"
        >
            <div className="w-full sm:w-1/3">
                    <select
                        value={selectedCategoryId === null ? "" : selectedCategoryId}
                        onChange={handleCategorySelect}
                        className="w-[150px] px-2 py-3 text-sm bg-white border border-gray-300 rounded-xl text-gray-500 focus:ring-3 focus:ring-blue-300 transition-all shadow-sm outline-none"
                    >
                        <option value="">All Categories</option>
                        
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full text-sm px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:ring-3 focus:ring-blue-300 transition-all shadow-sm outline-none"
                />
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-14 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Clear Search"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                )}

                <button
                    type="submit"
                    className="absolute right-0 top-0 bottom-0 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                    <FiSearch className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
}
