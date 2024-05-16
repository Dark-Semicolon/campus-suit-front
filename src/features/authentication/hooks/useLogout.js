import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("You have successfully logged out");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      navigate("/"); // Redirect to login page of home page
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  return { logout, isPending, isError };
}
