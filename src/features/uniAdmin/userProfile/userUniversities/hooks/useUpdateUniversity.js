import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUniversity as updateUniversityApi } from "@/services/uniAdmin/university/apiUniversity";

function useUpdateUniversity() {
    const queryClient = useQueryClient();

    const {
        mutate: updateUniversity,
        isPending: isUpdating,
        error,
    } = useMutation({
        mutationFn: updateUniversityApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userUniversities"],
            });

            toast.success("University updated Successfully");
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateUniversity, isUpdating, error };
}

export default useUpdateUniversity;
