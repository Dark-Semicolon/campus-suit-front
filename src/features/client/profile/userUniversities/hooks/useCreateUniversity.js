import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUniversity as createUniversityApi } from "@/services/client/apiUniversity";

function useCreateUniversity() {
  const queryClient = useQueryClient();

  const {
    mutate: createUniversity,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createUniversityApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userUniversities"],
      });

      toast.success("University Created Successfully");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { createUniversity, isCreating, error };
}

export default useCreateUniversity;
