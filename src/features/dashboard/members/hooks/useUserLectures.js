import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserLectures } from "../../../../services/apiUsers";

export function useUserLectures({
  userId,
  page,
  perPage,
  include,
  searchValue,
  includeFields,
  filter,
  filterAndSortAndPageQuery,
} = {}) {
  const queryClient = useQueryClient();

  const {
    data: userLectures,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [
      "userLectures",
      userId,
      page,
      perPage,
      searchValue,
      include,
      includeFields,
      filter,
      filterAndSortAndPageQuery,
    ],
    queryFn: () =>
      getUserLectures({
        userId,
        page,
        perPage,
        searchValue,
        include,
        includeFields,
        filter,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(userLectures?.meta?.total / userLectures?.meta?.per_page);

  // PRE - FETCHING;
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "userLectures",
        userId,
        page,
        perPage,
        searchValue,
        include,
        includeFields,
        filter,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getUserLectures({
          userId,
          page: page++,
          perPage,
          searchValue,
          include,
          includeFields,
          filter,
          filterAndSortAndPageQuery,
        }),
    });
  }

  if (isSuccess && page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "userLectures",
        userId,
        page,
        perPage,
        searchValue,
        include,
        includeFields,
        filter,
        filterAndSortAndPageQuery,
      ],
      queryFn: () =>
        getUserLectures({
          userId,
          page: page--,
          perPage,
          searchValue,
          include,
          includeFields,
          filter,
          filterAndSortAndPageQuery,
        }),
    });
  }

  return { isPending, userLectures, isSuccess };
}
