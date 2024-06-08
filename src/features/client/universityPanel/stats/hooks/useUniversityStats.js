import { useQuery } from "@tanstack/react-query";

import { universityStats as universityStatsApi } from "../../../../../services/client/panel/apiUniversity";

export function useUniversityStats({ universityId }) {
    const { isPending, data: universityStats } = useQuery({
        queryKey: ["universityStats", universityId],
        queryFn: () => universityStatsApi({ universityId }),
    });

    return { isPending, universityStats };
}
