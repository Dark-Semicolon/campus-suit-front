import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteUniversity as deleteUniversityApi } from "@/services/uniAdmin/university/apiUniversity";

function useDeleteUniversity() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteUniversity,
        isPending: isDeleting,
        error,
    } = useMutation({
        mutationFn: deleteUniversityApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userUniversities"],
            });

            toast.success("University deleted Successfully");
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { deleteUniversity, isDeleting, error };
}

export default useDeleteUniversity;
