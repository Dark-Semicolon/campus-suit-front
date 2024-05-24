import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles } from "@/services/client/panel/apiRoles";

export function useRoles({
    universityId,
    facultyId,
    page,
    perPage,
    searchValue,
    include,
    filterAndSortAndPageQuery,
} = {}) {
    const queryClient = useQueryClient();

    const {
        data: roles,
        isPending,
        isSuccess,
    } = useQuery({
        queryKey: [
            "roles",
            universityId,
            facultyId,
            page,
            perPage,
            searchValue,
            include,
            filterAndSortAndPageQuery,
        ],
        queryFn: () =>
            getRoles({
                universityId,
                facultyId,
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
            queryKey: [
                "roles",
                universityId,
                facultyId,
                page,
                perPage,
                searchValue,
                include,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getRoles({
                    universityId,
                    facultyId,
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
            queryKey: [
                "roles",
                universityId,
                facultyId,
                page,
                perPage,
                searchValue,
                include,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getRoles({
                    universityId,
                    facultyId,
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
