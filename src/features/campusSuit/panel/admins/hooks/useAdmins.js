import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAdmins } from "@/services/campusSuite/apiAdmin";

export function useAdmins({ filter, fields, load, include, perPage, page, searchValue, sortBy, filterAndSortAndPageQuery } = {}) {
  const queryClient = useQueryClient();

  const {
    isPending,
    data: admins,
    isSuccess,
  } = useQuery({
    queryKey: ["admins", filter, fields, load, include, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
    queryFn: () =>
      getAllAdmins({
        filter,
        fields,
        load,
        include,
        perPage,
        searchValue,
        sortBy,
        page,
        filterAndSortAndPageQuery,
      }),
  });

  const totalPages = Math.ceil(admins?.meta?.total / admins?.meta?.per_page);

  // PRE-FETCHING
  if (isSuccess && page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["admins", filter, fields, load, include, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getAllAdmins({
          filter,
          fields,
          load,
          include,
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
      queryKey: ["admins", filter, fields, load, include, perPage, searchValue, sortBy, page, filterAndSortAndPageQuery],
      queryFn: () =>
        getAllAdmins({
          filter,
          fields,
          load,
          include,
          perPage,
          searchValue,
          sortBy,
          page: page--,
          filterAndSortAndPageQuery,
        }),
    });
  }

  return { isPending, admins };
}
