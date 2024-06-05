import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPermissions } from "@/services/campusSuit/panel/apiPermissions";

export function usePermissions({ page, perPage, searchValue } = {}) {
    const queryClient = useQueryClient();

    const {
        data: permissions,
        isPending,
        isSuccess,
    } = useQuery({
        queryKey: ["permissions", page, perPage, searchValue],
        queryFn: () =>
            getPermissions({
                perPage,
                page,
                searchValue,
            }),
    });

    const totalPages = Math.ceil(permissions?.meta?.total / permissions?.meta?.per_page);

    // PRE - FETCHING;
    if (isSuccess && page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["permissions", page, perPage, searchValue],
            queryFn: () =>
                getPermissions({
                    perPage,
                    page: page++,
                    searchValue,
                }),
        });
    }

    if (isSuccess && page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["permissions", page, perPage, searchValue],
            queryFn: () =>
                getPermissions({
                    perPage,
                    page: page--,
                    searchValue,
                }),
        });
    }

    return { isPending, permissions };
}
