import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { UpdateAdmin as updateAdminApi } from "../../../../../services/campusSuite/apiAdmin";

export function useUpdateAdmin() {
  const queryClient = useQueryClient();

  const {
    mutate: updateAdmin,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateAdminApi,
    onSuccess: () => {
      toast.success("Admin Has Been Updated Successfully");

      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateAdmin, isUpdating, error };
}
