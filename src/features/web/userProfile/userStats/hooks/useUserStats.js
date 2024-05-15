import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "../../../../../services/apiUserStats";

export function useUserStats() {
  const { isPending, data: userStats } = useQuery({
    queryKey: ["userStats"],
    queryFn: getUserStats,
  });

  return { isPending, userStats };
}
