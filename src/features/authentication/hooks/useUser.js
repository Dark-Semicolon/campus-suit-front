import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

export function useUser() {
  let isAuthenticated = false;
  let isActive = false;

  const {
    data: user,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ["user"],
    retry: false,
  });

  if (isSuccess) {
    isAuthenticated = user ? true : false;

    isActive = user?.data?.attributes.status;
  }

  return {
    user,
    isPending,
    isError,
    isAuthenticated,
    isActive,
    isSuccess,
  };
}
