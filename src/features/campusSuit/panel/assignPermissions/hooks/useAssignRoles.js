import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { assignRoles as assignRolesApi } from "@/services/campusSuit/panel/apiAdmins";

export function useAssignRoles() {
    const queryClient = useQueryClient();

    const {
        mutate: assignRoles,
        isLoading,
        error,
    } = useMutation({
        mutationFn: assignRolesApi,
        onSuccess: () => {
            toast.success("Admin Roles Updated Successfully");
            queryClient.invalidateQueries({
                queryKey: ["admins"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { assignRoles, isLoading, error };
}
