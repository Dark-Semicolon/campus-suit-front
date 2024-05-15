import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserPermissions as updateUserPermissionsApi } from "../../../../services/apiUsers";

export function useUpdateUserPermissions() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUserPermissions,
    isLoading: isUpdate,
    error,
  } = useMutation({
    mutationFn: updateUserPermissionsApi,
    onSuccess: () => {
      toast.success("تم إضافة صلاحيات للمسؤل بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateUserPermissions, isUpdate, error };
}
