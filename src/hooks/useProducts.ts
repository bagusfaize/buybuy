import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../api/products";

const PAGE_LIMIT = 18;

export const useInfiniteProducts = (filters?: { title?: string; categoryId?: number }) =>
    useInfiniteQuery({
        queryKey: ["products", filters],
        queryFn: ({ pageParam = 0 }) =>
            getProducts({
                limit: PAGE_LIMIT,
                offset: pageParam,
                title: filters?.title,
                categoryId: filters?.categoryId,
            }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_LIMIT) {
                return undefined;
            }
            return allPages.length * PAGE_LIMIT;
        },
        initialPageParam: 0,
    });

export const useCategories = () =>
    useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });