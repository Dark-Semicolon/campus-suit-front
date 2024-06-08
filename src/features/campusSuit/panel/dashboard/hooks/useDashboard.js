import { useQuery } from "@tanstack/react-query";

import { dashboardStats as dashboardStatsApi } from "@/services/campusSuit/panel/apiDashboard";

export function useDashboard() {
    const { isPending, data: dashboardStats } = useQuery({
        queryKey: ["campusSuit"],
        queryFn: () => dashboardStatsApi(),
    });

    return { isPending, dashboardStats };
}
