import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/features/client/auth/hooks/useUser";

function Guest({ children, redirect }) {
  const navigate = useNavigate();
  const { isAuthenticated, isPending } = useUser();

  useEffect(
    function () {
      if (isAuthenticated && !isPending) navigate(redirect);
    },
    [isAuthenticated, isPending, redirect, navigate]
  );

  return children;
}

export default Guest;
