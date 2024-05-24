import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFacultySupervisor as deleteFacultySupervisorApi } from "../../../../../services/client/panel/apiFacultySupervisor";
import toast from "react-hot-toast";

export function useDeleteFacultySupervisor() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteFacultySupervisor,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteFacultySupervisorApi,
    onSuccess: () => {
      toast.success("faculty supervisor has been deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["facultySupervisor"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { deleteFacultySupervisor, isDeleting, error };
}
