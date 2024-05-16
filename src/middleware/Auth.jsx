import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks/useUser";
import { useEffect } from "react";
import SpinnerFullPage from "./../components/loadingPage/SpinnerFullPage";

function Auth({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isPending, isActive } = useUser();

  useEffect(
    function () {
      if (!isPending && !isAuthenticated) navigate("/login");

      if (!isActive && isAuthenticated) navigate("error/403");
    },
    [isAuthenticated, navigate, isPending, isActive]
  );

  if (isPending) return <SpinnerFullPage />;

  return children;
}

export default Auth;
