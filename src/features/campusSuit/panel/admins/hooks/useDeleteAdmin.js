import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteAdmin as deleteAdminApi } from "@/services/campusSuite/apiAdmin";

export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAdmin,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteAdminApi,
    onSuccess: () => {
      toast.success("faculty has deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { deleteAdmin, isDeleting, error };
}
