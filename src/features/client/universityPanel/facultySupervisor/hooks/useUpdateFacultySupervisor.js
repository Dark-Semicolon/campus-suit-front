import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFacultySupervisor as updateFacultySupervisorApi } from "@/services/client/panel/apiFacultySupervisor";
import toast from "react-hot-toast";

export function useUpdateFacultySupervisor() {
  const queryClient = useQueryClient();

  const {
    mutate: updateFacultySupervisor,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateFacultySupervisorApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultySupervisor"],
      });

      toast.success("Faculty Supervisor has been updated successfully");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateFacultySupervisor, isUpdating, error };
}
