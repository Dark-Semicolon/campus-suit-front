import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account has been successfully registered");

      queryClient.invalidateQueries({ active: true });

      navigate("/");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { signup, isPending, error };
}
