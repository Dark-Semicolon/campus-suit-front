import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUser as createUserApi } from "../../../../services/apiUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: createUser,
    isLoading: isCreating,
    error,
  } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("تم إضافة عضو بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { createUser, isCreating, error };
}
