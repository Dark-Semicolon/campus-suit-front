import { useQuery } from "@tanstack/react-query";
import { getStats } from "@/services/dashboard/apiStats";

export function useStats() {
  const { isPending, data: stats } = useQuery({
    queryKey: ["Stats"],
    queryFn: getStats,
  });

  return { isPending, stats };
}
