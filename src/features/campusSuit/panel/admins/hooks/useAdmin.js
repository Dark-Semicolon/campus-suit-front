import { useQuery } from "@tanstack/react-query";

import { findAdmin } from "@/services/campusSuit/panel/apiAdmins";

export function useAdmin({ adminId, include } = {}) {
    const { isPending, data: admin } = useQuery({
        queryKey: ["admin", adminId, include],
        queryFn: () =>
            findAdmin({
                adminId,
                include,
            }),
    });

    return { isPending, admin };
}
