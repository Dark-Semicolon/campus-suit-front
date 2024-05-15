import usePermission from './../hooks/usePermission';
import ErrorPage from '../components/errorPage/ErrorPage';
import SpinnerFullPage from '../components/loadingPage/SpinnerFullPage';


// Custom Route component that handles permission checks
function ProtectedRoute({ children, permissions, allRequired }) {
    const { canAny, canAll, isPending } = usePermission();

    if (isPending)
        return <SpinnerFullPage />

    // if not the all permissions are required
    if (!allRequired && canAny(permissions))
        return children;

    // if all permissions are required
    if (allRequired && canAll(permissions))
        return children;

    return <ErrorPage status={401} error={'لا تملك صلاحية الوصول لهذه الصفحة'} />
}

export default ProtectedRoute
