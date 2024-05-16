import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks/useUser";
import ErrorPage from "../components/errorPage/ErrorPage";
import LoaderPage from "../components/LoaderPage";

function HasAnyIdentity({ children, hasIdentities = [] }) {
  const navigate = useNavigate();
  const [isAuthorized] = useState(true);
  const { isAuthenticated, isPending } = useUser();

  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const { isAuthenticated, identities, isPending } = useUser();

  // useEffect(
  //   function () {
  //     hasIdentities.every((identity) => {
  //       if (identities?.includes(identity)) {
  //         setIsAuthorized(true);
  //         return false;
  //       }
  //       return true;
  //     });
  //   },
  //   [isAuthenticated, identities, hasIdentities, navigate]
  // );

  if (isPending) return <LoaderPage />;

  if (!isAuthenticated && !isPending) navigate("/login");

  if (!isAuthorized && !isPending)
    return (
      <ErrorPage status={401} error={"لا تملك صلاحية الوصول لهذه الصفحة"} />
    );

  return children;
}

export default HasAnyIdentity;
