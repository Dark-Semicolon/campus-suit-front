import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPermissions } from "../../../../services/dashboard/apiPermissions";

export function usePermissions({
  page,
  perPage,
  searchValue,
  includeFields,
  filterAndSortAndPageQuery,
} = {}) {
  const queryClient = useQueryClient();

  const {
    data: permissions,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["permissions", page, perPage, searchValue, includeFields, filterAndSortAndPageQuery],
    queryFn: () =>
      getPermissions({
        includeFields,
        perPage,
        searchValue,

        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(permissions?.meta?.total / permissions?.meta?.per_page);

  // PRE - FETCHING;
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "permissions",
        page,
        perPage,
        searchValue,
        includeFields,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getPermissions({
          includeFields,
          perPage,
          searchValue,
          page: page++,
          filterAndSortAndPageQuery,
        }),
    });
  }

  if (isSuccess && page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "permissions",
        page,
        perPage,
        searchValue,
        includeFields,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getPermissions({
          includeFields,
          perPage,
          searchValue,
          page: page--,
          filterAndSortAndPageQuery,
        }),
    });
  }

  return { isPending, permissions };
}
