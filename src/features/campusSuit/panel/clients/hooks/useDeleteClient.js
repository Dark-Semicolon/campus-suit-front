import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteClient as deleteClientApi } from "@/services/campusSuit/panel/apiClients";

export function useDeleteClient() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteClient,
        isPending: isDeleting,
        error,
    } = useMutation({
        mutationFn: deleteClientApi,
        onSuccess: () => {
            toast.success("Client has deleted successfully");

            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { deleteClient, isDeleting, error };
}
