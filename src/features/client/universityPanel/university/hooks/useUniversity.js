import { useQuery } from "@tanstack/react-query";
import { getUniversity } from "@/services/client/panel/apiUniversity";

export function useUniversity({ universityId } = {}) {
  const { isPending, data: university } = useQuery({
    queryKey: ["university", universityId],
    queryFn: () =>
      getUniversity({
        universityId,
      }),
  });

  return { isPending, university };
}
