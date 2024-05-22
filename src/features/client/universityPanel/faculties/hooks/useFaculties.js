import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFaculties } from "@/services/client/panel/apiFaculties";

export function useFaculties({
    universityId,
    filter,
    fields,
    perPage,
    page,
    searchValue,
    sortBy,
    filterAndSortAndPageQuery,
} = {}) {
    const queryClient = useQueryClient();

    const queryKey = useMemo(
        () => [
            "faculties",
            universityId,
            filter,
            fields,
            perPage,
            searchValue,
            sortBy,
            page,
            filterAndSortAndPageQuery,
        ],
        [
            universityId,
            filter,
            fields,
            perPage,
            page,
            searchValue,
            sortBy,
            filterAndSortAndPageQuery,
        ]
    );

    const queryFn = () =>
        getFaculties({
            universityId,
            filter,
            fields,
            perPage,
            searchValue,
            sortBy,
            page,
            filterAndSortAndPageQuery,
        });

    const {
        data: faculties,
        isLoading: isPending,
        isSuccess,
    } = useQuery({
        queryKey,
        queryFn,
    });

    const totalPages = faculties ? Math.ceil(faculties.meta?.total / faculties.meta?.per_page) : 0;

    // PRE - FETCHING;
    if (isSuccess && page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: [
                "faculties",
                universityId,
                filter,
                fields,
                perPage,
                searchValue,
                sortBy,
                page,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getFaculties({
                    universityId,
                    filter,
                    fields,
                    perPage,
                    searchValue,
                    sortBy,
                    page: page++,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    if (isSuccess && page > 1) {
        queryClient.prefetchQuery({
            queryKey: [
                "faculties",
                universityId,
                filter,
                fields,
                perPage,
                searchValue,
                sortBy,
                page,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getFaculties({
                    universityId,
                    filter,
                    fields,
                    perPage,
                    searchValue,
                    sortBy,
                    page: page--,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    return { isPending, faculties: faculties?.data };
}
