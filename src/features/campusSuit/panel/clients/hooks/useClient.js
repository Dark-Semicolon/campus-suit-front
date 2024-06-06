import { useQuery } from "@tanstack/react-query";

import { findAdmin } from "@/services/campusSuit/panel/apiAdmins";

export function useClient({ clientId } = {}) {
    const { isPending, data: client } = useQuery({
        queryKey: ["client", clientId],
        queryFn: () =>
            findAdmin({
                clientId,
            }),
    });

    return { isPending, client };
}
