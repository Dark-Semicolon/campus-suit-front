import { useQuery } from "@tanstack/react-query";
import { getUserWatchedVideos } from "../../../../services/apiUsers";

export function useUserWatchedVideos({ userId, filter } = {}) {
  const { data: userWatchedVideos, isPending } = useQuery({
    queryKey: ["userWatchedVideos", userId, filter],
    queryFn: () =>
      getUserWatchedVideos({
        userId,
        filter,
      }),
  });

  return { isPending, userWatchedVideos };
}
