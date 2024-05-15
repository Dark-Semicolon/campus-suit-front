import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks/useUser";
import SpinnerFullPage from './../components/loadingPage/SpinnerFullPage';
import ErrorPage from "../components/errorPage/ErrorPage";

function HasAnyIdentity({ children, hasIdentities = [] }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { isAuthenticated, identities, isPending, isSuperAdmin } = useUser();

  useEffect(
    function () {
      hasIdentities.every((identity) => {
        if (identities?.includes(identity)) {
          setIsAuthorized(true);
          return false;
        }
        return true;
      });
    },
    [isAuthenticated, identities, hasIdentities, navigate]
  );

  if (isPending) return <SpinnerFullPage />;

  if (!isAuthenticated && !isPending) navigate("/login");

  if (!isAuthorized && !isSuperAdmin && !isPending) return <ErrorPage status={401} error={'لا تملك صلاحية الوصول لهذه الصفحة'} />

  return children;
}

export default HasAnyIdentity;
