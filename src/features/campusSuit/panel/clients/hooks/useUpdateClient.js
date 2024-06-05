import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { UpdateClient as updateClientApi } from "@/services/campusSuit/panel/apiClients";

export function useUpdateClient() {
    const queryClient = useQueryClient();

    const {
        mutate: updateClient,
        isPending: isUpdating,
        error,
    } = useMutation({
        mutationFn: updateClientApi,
        onSuccess: () => {
            toast.success("Client Has Been Updated Successfully");

            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateClient, isUpdating, error };
}
