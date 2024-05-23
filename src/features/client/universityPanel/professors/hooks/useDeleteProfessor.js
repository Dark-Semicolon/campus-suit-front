import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProfessor as deleteProfessorApi } from "@/services/client/panel/apiProfessors";

export function useDeleteProfessor() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProfessor,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteProfessorApi,
    onSuccess: () => {
      toast.success("faculty has deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["faculties"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { deleteProfessor, isDeleting, error };
}
