import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFacultySupervisorRoles } from "@/services/client/panel/apiFacultySupervisor";

export function useFacultySupervisorRoles({ universityId, facultyId, facultySupervisorId, page, perPage, searchValue, filterAndSortAndPageQuery } = {}) {
  const queryClient = useQueryClient();

  const {
    data: facultySupervisorRoles,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["facultySupervisorRoles", universityId, facultyId, facultySupervisorId, page, perPage, searchValue, filterAndSortAndPageQuery],
    queryFn: () =>
      getFacultySupervisorRoles({
        universityId,
        facultyId,
        facultySupervisorId,
        page,
        perPage,
        searchValue,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(facultySupervisorRoles?.meta?.total / facultySupervisorRoles?.meta?.per_page);

  // PRE - FETCHING;
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["facultySupervisorRoles", universityId, facultyId, facultySupervisorId, page, perPage, searchValue, filterAndSortAndPageQuery],
      queryFn: () =>
        getFacultySupervisorRoles({
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
      queryKey: ["facultySupervisorRoles", universityId, facultyId, facultySupervisorId, page, perPage, searchValue, filterAndSortAndPageQuery],
      queryFn: () =>
        getFacultySupervisorRoles({
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

  return { isPending, facultySupervisorRoles };
}
