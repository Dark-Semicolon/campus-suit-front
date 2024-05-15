import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserRoles as updateUserRolesApi } from "../../../../services/apiUsers";

export function useAddUserRoles() {
  const queryClient = useQueryClient();

  const {
    mutate: addUserRoles,
    isLoading: isAdd,
    error,
  } = useMutation({
    mutationFn: updateUserRolesApi,
    onSuccess: () => {
      toast.success("تم إضافة الأدوار للمسؤل بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { addUserRoles, isAdd, error };
}
