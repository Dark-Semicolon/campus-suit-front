import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/authentication/hooks/useUser";

function Guest({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isPending } = useUser();

  useEffect(
    function () {
      if (isAuthenticated && !isPending) navigate("/user/profile");
    },
    [isAuthenticated, isPending, navigate]
  );

  return children;
}

export default Guest;
