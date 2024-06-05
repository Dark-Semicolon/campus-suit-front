import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole as createRoleApi } from "@/services/campusSuit/panel/apiRoles";
import toast from "react-hot-toast";

function useCreateRole() {
    const queryClient = useQueryClient();

    const {
        mutate: createRole,
        isPending: isCreating,
        error,
    } = useMutation({
        mutationFn: createRoleApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });

            toast.success("The role was created successfully");
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { createRole, isCreating, error };
}

export default useCreateRole;
