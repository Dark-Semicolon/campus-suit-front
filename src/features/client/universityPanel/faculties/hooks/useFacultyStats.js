import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFacultyStats } from "@/services/client/panel/apiFaculties";

export function useFacultyStats({ universityId, facultyId } = {}) {
    const queryKey = useMemo(
        () => ["facultyStats", universityId, facultyId],
        [universityId, facultyId]
    );

    const queryFn = () =>
        getFacultyStats({
            universityId,
            facultyId,
        });

    const { data: facultyStats, isLoading: isPending } = useQuery({
        queryKey,
        queryFn,
    });

    return { isPending, facultyStats };
}
