import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole as updateRoleApi } from "@/services/client/panel/apiRoles";
import toast from "react-hot-toast";

function useUpdateRole() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { universityId, facultyId } = useParams();

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
            navigate(`/${universityId}/panel/faculties/${facultyId}/roles`);
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateRole, isUpdating, error };
}

export default useUpdateRole;
