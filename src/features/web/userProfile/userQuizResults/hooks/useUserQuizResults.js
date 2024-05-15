import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserQuizResults } from "../../../../../services/apiAuth";

export function useUserQuizResults({
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
    data: userQuizResults,
    isSuccess,
  } = useQuery({
    queryKey: [
      "userQuizResults",
      page,
      perPage,
      include,
      includeFields,
      sortBy,
      courseid,
    ],
    queryFn: () =>
      getUserQuizResults({
        include,
        sortBy,
        page,
        perPage,
        courseid,
        includeFields,
      }),
  });

  const totalPages = Math.ceil(
    userQuizResults?.meta?.total / userQuizResults?.meta?.per_page
  );

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "userQuizResults",
        page,
        perPage,
        include,
        includeFields,
        sortBy,
        courseid,
      ],
      queryFn: () =>
        getUserQuizResults({
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
      queryKey: [
        "userQuizResults",
        page,
        perPage,
        include,
        includeFields,
        sortBy,
        courseid,
      ],
      queryFn: () =>
        getUserQuizResults({
          include,
          sortBy,
          page: page--,
          perPage,
          includeFields,
          courseid,
        }),
    });
  }

  return { isPending, userQuizResults };
}
