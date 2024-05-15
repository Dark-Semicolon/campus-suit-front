import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserLectures } from "../../../../../services/apiAuth";

export function useUserLectures({
  filter,
  include,
  includeFields,
  sortBy,
  page = 1,
  perPage,
  courseid,
} = {}) {
  const queryClient = useQueryClient();

  const {
    isPending,
    data: userLectures,
    isSuccess,
  } = useQuery({
    queryKey: ["userLectures", page, perPage, filter, include, includeFields, sortBy, courseid],
    queryFn: () =>
      getUserLectures({
        filter,
        include,
        sortBy,
        page,
        perPage,
        courseid,
        includeFields,
      }),
  });

  const totalPages = Math.ceil(userLectures?.meta?.total / userLectures?.meta?.per_page);

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["userLectures", page, perPage, filter, include, includeFields, sortBy, courseid],
      queryFn: () =>
        getUserLectures({
          filter,
          include,
          includeFields,
          sortBy,
          page: page++,
          perPage,
          courseid,
        }),
    });
  }

  if (isSuccess && page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["userLectures", page, perPage, filter, include, includeFields, sortBy, courseid],
      queryFn: () =>
        getUserLectures({
          filter,
          include,
          sortBy,
          page: page--,
          perPage,
          includeFields,
          courseid,
        }),
    });
  }

  return { isPending, userLectures };
}
