import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfessors } from "@/services/client/panel/apiProfessors";

export function useProfessors({ universityId, filter, fields, sortBy, page = 1, perPage, searchValue, filterAndSortAndPageQuery } = {}) {
  const queryClient = useQueryClient();
  const {
    isPending,
    data: professors,
    isSuccess,
  } = useQuery({
    queryKey: ["professors", universityId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
    queryFn: () =>
      getProfessors({
        universityId,
        filter,
        fields,
        perPage,
        searchValue,
        sortBy,
        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(professors?.meta?.total / professors?.meta?.per_page);

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["professors", universityId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getProfessors({
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
      queryKey: ["professors", universityId, filter, fields, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getProfessors({
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

  return { isPending, professors };
}
