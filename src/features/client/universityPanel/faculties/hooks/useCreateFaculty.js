import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaculty as createFacultyApi } from "@/services/client/panel/apiFaculties";
import toast from "react-hot-toast";

export function useCreateFaculty() {
    const queryClient = useQueryClient();

    const {
        mutate: createFaculty,
        isLoading: isCreating,
        error,
    } = useMutation({
        mutationFn: createFacultyApi,
        onSuccess: () => {
            toast.success("faculty has been Created successfully");

            queryClient.invalidateQueries({
                queryKey: ["faculties"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { createFaculty, isCreating, error };
}
