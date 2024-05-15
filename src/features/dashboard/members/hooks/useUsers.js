import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../../../services/apiUsers";

export function useUsers({
  filter,
  fields,
  include,
  includeFields,
  perPage,
  searchValue,
  sortBy,
  page,
  filterAndSortAndPageQuery,
} = {}) {
  const queryClient = useQueryClient();

  const {
    data: users,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [
      "users",
      filter,
      fields,
      include,
      includeFields,
      perPage,
      searchValue,
      sortBy,
      page,
      filterAndSortAndPageQuery,
    ],
    queryFn: () =>
      getUsers({
        filter,
        fields,
        include,
        includeFields,
        perPage,
        searchValue,
        sortBy,
        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(users?.meta?.total / users?.meta?.per_page);

  // PRE - FETCHING;
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "users",
        filter,
        fields,
        include,
        includeFields,
        perPage,
        searchValue,
        sortBy,
        page,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getUsers({
          filter,
          fields,
          include,
          includeFields,
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
      queryKey: [
        "users",
        filter,
        fields,
        include,
        includeFields,
        perPage,
        searchValue,
        sortBy,
        page,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getUsers({
          filter,
          fields,
          include,
          includeFields,
          perPage,
          searchValue,
          sortBy,
          page: page--,
          filterAndSortAndPageQuery,
        }),
    });
  }

  return { isPending, users };
}
