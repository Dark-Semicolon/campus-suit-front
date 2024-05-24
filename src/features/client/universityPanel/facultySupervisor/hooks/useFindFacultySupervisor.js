import { useQuery } from "@tanstack/react-query";
import { findFacultySupervisor } from "../../../../../services/client/panel/apiFacultySupervisor";

export function useFindFacultySupervisor({ universityId, facultyId, facultySupervisorId } = {}) {
  const { isPending, data: facultySupervisor } = useQuery({
    queryKey: ["facultySupervisor", universityId, facultyId, facultySupervisorId],
    queryFn: () =>
      findFacultySupervisor({
        universityId,
        facultyId,
        facultySupervisorId,
      }),
  });

  return { isPending, facultySupervisor };
}
