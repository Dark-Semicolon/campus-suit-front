import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFaculty as deleteFacultyApi } from "@/services/client/panel/apiFaculties";
import toast from "react-hot-toast";

export function useDeleteFaculty() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteFaculty,
        isLoading: isDeleting,
        error,
    } = useMutation({
        mutationFn: deleteFacultyApi,
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

    return { deleteFaculty, isDeleting, error };
}
