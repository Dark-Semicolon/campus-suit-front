import useCampusSuiteRoutes from "./useCampusSuiteRoutes";
import useClientRoutes from "./useClientRoutes";
import useIndexRoutes from "./useIndexRoutes";
import useProfessorsRoutes from "./useProfessorsRoutes";
import useClientAuthRoutes from "./useClientAuthRoutes";
import useCampusSuiteAuthRoutes from './useCampusSuiteAuthRoutes';

function useRoutes() {
    const CampusSuiteRoutes = useCampusSuiteRoutes();
    const ClientRoutes = useClientRoutes();
    const ProfessorsRoutes = useProfessorsRoutes();
    const IndexRoutes = useIndexRoutes();

    const clientAuthRoutes = useClientAuthRoutes();
    const CampusSuiteAuthRoutes = useCampusSuiteAuthRoutes();

    return (
        <>
            {IndexRoutes}

            {clientAuthRoutes}
            {ClientRoutes}

            {CampusSuiteRoutes}
            {CampusSuiteAuthRoutes}

            {ProfessorsRoutes}
        </>
    );
}

export default useRoutes;
