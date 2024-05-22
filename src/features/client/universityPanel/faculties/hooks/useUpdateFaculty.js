import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFaculty as updateFacultyApi } from "@/services/client/panel/apiFaculties";
import toast from "react-hot-toast";

export function useUpdateFaculty() {
    const queryClient = useQueryClient();

    const {
        mutate: updateFaculty,
        isLoading: isUpdating,
        error,
    } = useMutation({
        mutationFn: updateFacultyApi,
        onSuccess: () => {
            toast.success("faculty has been updated successfully");

            queryClient.invalidateQueries({
                queryKey: ["faculties"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateFaculty, isUpdating, error };
}
