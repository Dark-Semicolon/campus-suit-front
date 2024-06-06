import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { assignPermissions as assignPermissionsApi } from "@/services/campusSuit/panel/apiAdmins";

export function useAssignPermissions() {
    const queryClient = useQueryClient();

    const {
        mutate: assignPermissions,
        isLoading,
        error,
    } = useMutation({
        mutationFn: assignPermissionsApi,
        onSuccess: () => {
            toast.success("Admin Permissions Updated Successfully");
            queryClient.invalidateQueries({
                queryKey: ["admins"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { assignPermissions, isLoading, error };
}
