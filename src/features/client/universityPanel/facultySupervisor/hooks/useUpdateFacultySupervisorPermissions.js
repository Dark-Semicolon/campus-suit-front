import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFacultySupervisorPermissions as updateFacultySupervisorPermissionsApi } from "../../../../../services/client/panel/apiFacultySupervisor";
import toast from "react-hot-toast";

export function useUpdateFacultySupervisorPermissions() {
  const queryClient = useQueryClient();

  const {
    mutate: updateFacultySupervisorPermissions,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateFacultySupervisorPermissionsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultySupervisorPermissions"],
      });

      toast.success("The permissions has been updated successfully");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateFacultySupervisorPermissions, isUpdating, error };
}
