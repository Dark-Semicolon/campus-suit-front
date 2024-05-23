import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfessor as createProfessorApi } from "../../../../../services/client/panel/apiProfessors";
import toast from "react-hot-toast";

export function useCreateProfessor() {
  const queryClient = useQueryClient();

  const {
    mutate: createProfessor,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createProfessorApi,
    onSuccess: () => {
      toast.success("Professor has been Created successfully");

      queryClient.invalidateQueries({
        queryKey: ["professors"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { createProfessor, isCreating, error };
}
