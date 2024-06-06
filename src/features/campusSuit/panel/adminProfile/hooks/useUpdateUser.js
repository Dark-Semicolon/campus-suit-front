import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser as updateUserApi } from "@/services/campusSuit/panel/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("User Has Been Updated Successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateUser, isUpdating, error };
}
