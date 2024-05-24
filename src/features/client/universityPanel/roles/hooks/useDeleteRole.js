import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRole as deleteRoleApi } from "@/services/client/panel/apiRoles";
import toast from "react-hot-toast";

export function useDeleteRole() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteRole,
        isLoading: isDeleting,
        error,
    } = useMutation({
        mutationFn: deleteRoleApi,
        onSuccess: () => {
            toast.success("Role has been deleted successfully");

            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { deleteRole, isDeleting, error };
}
