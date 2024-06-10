import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFacultySupervisorPermissions } from "../../../../../services/client/panel/apiFacultySupervisor";

export function useFacultySupervisorPermissions({
    universityId,
    facultyId,
    facultySupervisorId,
    page,
    perPage,
    searchValue,
    filterAndSortAndPageQuery,
} = {}) {
    const queryClient = useQueryClient();

    const {
        data: facultySupervisorPermissions,
        isPending,
        isSuccess,
    } = useQuery({
        queryKey: [
            "facultySupervisorPermissions",
            universityId,
            facultyId,
            facultySupervisorId,
            page,
            perPage,
            searchValue,
            filterAndSortAndPageQuery,
        ],
        queryFn: () =>
            getFacultySupervisorPermissions({
                universityId,
                facultyId,
                facultySupervisorId,
                page,
                perPage,
                searchValue,
                filterAndSortAndPageQuery,
            }),
    });

    const totalPages = Math.ceil(
        facultySupervisorPermissions?.meta?.total /
            facultySupervisorPermissions?.meta?.per_page
    );

    // PRE - FETCHING;
    if (isSuccess && page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: [
                "facultySupervisorPermissions",
                universityId,
                facultyId,
                facultySupervisorId,
                page,
                perPage,
                searchValue,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getFacultySupervisorPermissions({
                    universityId,
                    facultyId,
                    facultySupervisorId,
                    page: page++,
                    perPage,
                    searchValue,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    if (isSuccess && page > 1) {
        queryClient.prefetchQuery({
            queryKey: [
                "facultySupervisorPermissions",
                universityId,
                facultyId,
                facultySupervisorId,
                page,
                perPage,
                searchValue,
                filterAndSortAndPageQuery,
            ],
            queryFn: () =>
                getFacultySupervisorPermissions({
                    universityId,
                    facultyId,
                    facultySupervisorId,
                    page: page--,
                    perPage,
                    searchValue,
                    filterAndSortAndPageQuery,
                }),
        });
    }

    return { isPending, facultySupervisorPermissions };
}
