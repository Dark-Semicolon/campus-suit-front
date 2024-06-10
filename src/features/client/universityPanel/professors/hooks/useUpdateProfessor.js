import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateProfessor as updateProfessorApi } from "@/services/client/panel/apiProfessors";

function useUpdateProfessor() {
    const queryClient = useQueryClient();

    const {
        mutate: updateProfessor,
        isPending: isUpdating,
        error,
    } = useMutation({
        mutationFn: updateProfessorApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["professors"],
            });

            toast.success("Professor updated Successfully");
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateProfessor, isUpdating, error };
}

export default useUpdateProfessor;
