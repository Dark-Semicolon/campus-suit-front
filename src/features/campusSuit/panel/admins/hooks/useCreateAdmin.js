import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createAdmin as createAdminApi } from "@/services/campusSuite/apiAdmin";

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  const {
    mutate: createAdmin,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createAdminApi,
    onSuccess: () => {
      toast.success("New Admin Has Been Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { createAdmin, isCreating, error };
}
