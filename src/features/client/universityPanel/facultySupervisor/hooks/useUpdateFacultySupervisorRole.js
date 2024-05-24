import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateFacultySupervisorRole as updateFacultySupervisorRoleApi } from "../../../../../services/client/panel/apiFacultySupervisor";

export function useUpdateFacultySupervisorRole() {
  const queryClient = useQueryClient();

  const {
    mutate: updateFacultySupervisorRole,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateFacultySupervisorRoleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultySupervisorRoles"],
      });

      toast.success("The role has been updates successfully");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateFacultySupervisorRole, isUpdating, error };
}
