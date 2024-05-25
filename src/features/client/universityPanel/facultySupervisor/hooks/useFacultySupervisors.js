import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFacultySupervisors } from "@/services/client/panel/apiFacultySupervisor";

export function useFacultySupervisors({ universityId, facultyId, filter, fields, perPage, page, searchValue, sortBy, filterAndSortAndPageQuery } = {}) {
  const queryClient = useQueryClient();

  const {
    isPending,
    data: facultySupervisors,
    isSuccess,
  } = useQuery({
    queryKey: ["facultySupervisors", universityId, facultyId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
    queryFn: () =>
      getFacultySupervisors({
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

  const totalPages = Math.ceil(facultySupervisors?.meta?.total / facultySupervisors?.meta?.per_page);

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["facultySupervisors", universityId, facultyId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getFacultySupervisors({
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
      queryKey: ["facultySupervisors", universityId, facultyId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getFacultySupervisors({
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

  return { isPending, facultySupervisors };
}
