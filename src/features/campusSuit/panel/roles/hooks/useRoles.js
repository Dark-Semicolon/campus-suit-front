import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles } from "@/services/campusSuit/panel/apiRoles";

export function useRoles({ page, perPage, searchValue, include, filterAndSortAndPageQuery } = {}) {
    const queryClient = useQueryClient();

    const {
        data: roles,
        isPending,
        isSuccess,
    } = useQuery({
        queryKey: ["roles", page, perPage, searchValue, include, filterAndSortAndPageQuery],
        queryFn: () =>
            getRoles({
                page,
                perPage,
                searchValue,
                include,
                filterAndSortAndPageQuery,
            }),
    });

    const totalPages = Math.ceil(roles?.meta?.total / roles?.meta?.per_page);

    // PRE - FETCHING;
    if (isSuccess && page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["roles", page, perPage, searchValue, include, filterAndSortAndPageQuery],
            queryFn: () =>
                getRoles({
                    page: page++,
                    perPage,
                    searchValue,
                    include,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    if (isSuccess && page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["roles", page, perPage, searchValue, include, filterAndSortAndPageQuery],
            queryFn: () =>
                getRoles({
                    page: page--,
                    perPage,
                    searchValue,
                    include,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    return { isPending, roles };
}
