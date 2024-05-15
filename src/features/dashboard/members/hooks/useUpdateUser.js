import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser as updateUserApi } from "../../../../services/apiUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("تم تعديل المستخدم بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateUser, isUpdating, error };
}
