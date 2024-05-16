import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData as updateUserDataApi } from "@/services/uniAdmin/user/apiUser";

export function useUpdateUserData() {
    const queryClient = useQueryClient();

    const {
        mutate: updateUser,
        isPending: isUpdating,
        error,
        isSuccess,
    } = useMutation({
        mutationFn: updateUserDataApi,
        onSuccess: () => {
            toast.success("Personal data has been updated successfully");

            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateUser, isUpdating, error, isSuccess };
}
