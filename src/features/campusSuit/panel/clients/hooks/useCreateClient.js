import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createClient as createClientApi } from "@/services/campusSuit/panel/apiClients";

export function useCreateClient() {
    const queryClient = useQueryClient();

    const {
        mutate: createClient,
        isPending: isCreating,
        error,
    } = useMutation({
        mutationFn: createClientApi,
        onSuccess: () => {
            toast.success("New Client Has Been Created Successfully");

            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
        },

        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { createClient, isCreating, error };
}
