import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles } from "@/services/dashboard/apiRoles";

export function useRoles({
  page,
  perPage,
  searchValue,
  sortBy,
  filter,
  includeFields,
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
      page,
      perPage,
      searchValue,
      sortBy,
      filter,
      includeFields,
      filterAndSortAndPageQuery,
    ],
    queryFn: () =>
      getRoles({
        includeFields,
        perPage,
        searchValue,
        sortBy,
        filter,
        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(roles?.meta?.total / roles?.meta?.per_page);

  // PRE - FETCHING;
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "roles",
        page,
        perPage,
        searchValue,
        sortBy,
        filter,
        includeFields,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getRoles({
          includeFields,
          perPage,
          searchValue,
          sortBy,
          filter,
          page: page++,
          filterAndSortAndPageQuery,
        }),
    });
  }

  if (isSuccess && page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "roles",
        page,
        perPage,
        searchValue,
        sortBy,
        filter,
        includeFields,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getRoles({
          includeFields,
          perPage,
          searchValue,
          sortBy,
          filter,
          page: page--,
          filterAndSortAndPageQuery,
        }),
    });
  }

  return { isPending, roles };
}
