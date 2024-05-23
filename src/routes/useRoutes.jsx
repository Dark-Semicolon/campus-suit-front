import useCampusSuiteRoutes from "./useCampusSuiteRoutes";
import useClientRoutes from "./useClientRoutes";
import useIndexRoutes from "./useIndexRoutes";
import useProfessorsRoutes from "./useProfessorsRoutes";
import useAuthRoutes from "./useAuthRoutes";

function useRoutes() {
    const CampusSuiteRoutes = useCampusSuiteRoutes();
    const ClientRoutes = useClientRoutes();
    const ProfessorsRoutes = useProfessorsRoutes();
    const IndexRoutes = useIndexRoutes();

    const AuthRoutes = useAuthRoutes();

    return (
        <>
            {IndexRoutes}
            {AuthRoutes}
            {CampusSuiteRoutes}
            {ClientRoutes}
            {ProfessorsRoutes}
        </>
    );
}

export default useRoutes;
