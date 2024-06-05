import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole as updateRoleApi } from "@/services/campusSuit/panel/apiRoles";
import toast from "react-hot-toast";

function useUpdateRole() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate: updateRole,
        isPending: isUpdating,
        error,
    } = useMutation({
        mutationFn: updateRoleApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });

            toast.success("The role has been updates successfully");
            navigate(`/admin/roles`);
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateRole, isUpdating, error };
}

export default useUpdateRole;
