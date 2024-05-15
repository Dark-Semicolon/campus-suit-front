import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../../../services/apiUsers";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("تم حذف المستخدم بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { deleteUser, isDeleting, error };
}
