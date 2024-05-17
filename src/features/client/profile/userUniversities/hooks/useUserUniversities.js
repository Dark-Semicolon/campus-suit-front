import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserUniversities } from "@/services/client/apiUniversity";

export function useUserUniversities({ filter, fields, sortBy, page = 1, perPage, courseid } = {}) {
  const queryClient = useQueryClient();
  const {
    isPending,
    data: userUniversities,
    isSuccess,
  } = useQuery({
    queryKey: ["userUniversities", page, perPage, filter, fields, sortBy, courseid],
    queryFn: () =>
      getUserUniversities({
        filter,
        fields,
        sortBy,
        page,
        perPage,
        courseid,
      }),
  });

  const totalPages = Math.ceil(userUniversities?.meta?.total / userUniversities?.meta?.per_page);

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["userUniversities", page, perPage, filter, fields, sortBy, courseid],
      queryFn: () =>
        getUserUniversities({
          filter,
          fields,
          sortBy,
          page: page++,
          perPage,
          courseid,
        }),
    });
  }

  if (isSuccess && page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["userUniversities", page, perPage, filter, fields, sortBy, courseid],
      queryFn: () =>
        getUserUniversities({
          filter,
          fields,
          sortBy,
          page: page--,
          perPage,
          courseid,
        }),
    });
  }

  return { isPending, userUniversities };
}
