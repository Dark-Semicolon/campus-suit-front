import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createFacultySupervisor as createFacultySupervisorApi } from "@/services/client/panel/apiFacultySupervisor";

export function useCreateFacultySupervisor() {
  const queryClient = useQueryClient();

  const {
    mutate: createFacultySupervisor,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createFacultySupervisorApi,
    onSuccess: () => {
      toast.success("Faculty Supervisor Has Been Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["facultySupervisor"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { createFacultySupervisor, isCreating, error };
}
