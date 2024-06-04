import useCampusSuitRoutes from "./useCampusSuitRoutes";
import useClientRoutes from "./useClientRoutes";
import useIndexRoutes from "./useIndexRoutes";
import useProfessorsRoutes from "./useProfessorsRoutes";
import useClientAuthRoutes from "./useClientAuthRoutes";
import useCampusSuitAuthRoutes from './useCampusSuitAuthRoutes';

function useRoutes() {
    const CampusSuitRoutes = useCampusSuitRoutes();
    const ClientRoutes = useClientRoutes();
    const ProfessorsRoutes = useProfessorsRoutes();
    const IndexRoutes = useIndexRoutes();

    const clientAuthRoutes = useClientAuthRoutes();
    const CampusSuitAuthRoutes = useCampusSuitAuthRoutes();

    return (
        <>
            {IndexRoutes}

            {clientAuthRoutes}
            {ClientRoutes}

            {CampusSuitRoutes}
            {CampusSuitAuthRoutes}

            {ProfessorsRoutes}
        </>
    );
}

export default useRoutes;
