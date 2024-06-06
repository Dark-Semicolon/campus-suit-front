import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClients } from "@/services/campusSuit/panel/apiClients";

export function useClients({
    filter,
    fields,
    load,
    include,
    perPage,
    page,
    searchValue,
    sortBy,
    filterAndSortAndPageQuery,
} = {}) {
    const queryClient = useQueryClient();

    const {
        isPending,
        data: clients,
        isSuccess,
    } = useQuery({
        queryKey: [
            "clients",
            filter,
            fields,
            load,
            include,
            perPage,
            searchValue,
            sortBy,
            page,
            filterAndSortAndPageQuery,
        ],
        queryFn: () =>
            getClients({
                filter,
                fields,
                load,
                include,
                perPage,
                searchValue,
                sortBy,
                page,
                filterAndSortAndPageQuery,
            }),
    });

    const totalPages = Math.ceil(clients?.meta?.total / clients?.meta?.per_page);

    // PRE-FETCHING
    if (isSuccess && page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: [
                "clients",
                filter,
                fields,
                load,
                include,
                perPage,
                searchValue,
                sortBy,
                page,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getClients({
                    filter,
                    fields,
                    load,
                    include,
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
                "clients",
                filter,
                fields,
                load,
                include,
                perPage,
                searchValue,
                sortBy,
                page,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getClients({
                    filter,
                    fields,
                    load,
                    include,
                    perPage,
                    searchValue,
                    sortBy,
                    page: page--,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    return { isPending, clients };
}
