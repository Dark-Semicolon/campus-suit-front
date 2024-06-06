import { useQuery } from "@tanstack/react-query";

import { findAdmin } from "@/services/campusSuit/panel/apiAdmins";

export function useAdmin({ adminId } = {}) {
    const { isPending, data: admin } = useQuery({
        queryKey: ["admin", adminId],
        queryFn: () =>
            findAdmin({
                adminId,
            }),
    });

    return { isPending, admin };
}
