import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPermissionCategories } from "../../../../services/dashboard/apiPermissions";

export function usePermissionCategories({
  page,
  perPage,
  searchValue,
  includeFields,
  filterAndSortAndPageQuery,
} = {}) {
  const queryClient = useQueryClient();

  const {
    data: permissionCategories,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [
      "permissionCategories",
      page,
      perPage,
      searchValue,
      includeFields,
      filterAndSortAndPageQuery,
    ],
    queryFn: () =>
      getPermissionCategories({
        includeFields,
        perPage,
        searchValue,

        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(
    permissionCategories?.meta?.total / permissionCategories?.meta?.per_page
  );

  // PRE - FETCHING;
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "permissionCategories",
        page,
        perPage,
        searchValue,
        includeFields,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getPermissionCategories({
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
        "permissionCategories",
        page,
        perPage,
        searchValue,
        includeFields,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getPermissionCategories({
          includeFields,
          perPage,
          searchValue,
          page: page--,
          filterAndSortAndPageQuery,
        }),
    });
  }

  return { isPending, permissionCategories };
}
