import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFacultySupervisor } from "@/services/client/panel/apiFacultySupervisor";

export function useFacultySupervisor({ universityId, facultyId, filter, fields, perPage, page, searchValue, sortBy, filterAndSortAndPageQuery } = {}) {
  const queryClient = useQueryClient();

  const {
    isPending,
    data: facultySupervisor,
    isSuccess,
  } = useQuery({
    queryKey: ["facultySupervisor", universityId, facultyId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
    queryFn: () =>
      getFacultySupervisor({
        universityId,
        facultyId,
        filter,
        fields,
        perPage,
        searchValue,
        sortBy,
        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(facultySupervisor?.meta?.total / facultySupervisor?.meta?.per_page);

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["facultySupervisor", universityId, facultyId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getFacultySupervisor({
          universityId,
          facultyId,
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
      queryKey: ["facultySupervisor", universityId, facultyId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getFacultySupervisor({
          universityId,
          facultyId,
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

  return { isPending, facultySupervisor };
}
