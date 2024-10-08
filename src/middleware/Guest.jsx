import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import LoaderPage from "@/components/LoaderPage";

function Guest({ children, redirect, gardName }) {
  const navigate = useNavigate();

  const { useUser } = useAuth({ gardName });

  const { isAuthenticated, isPending } = useUser()


  useEffect(
    function () {
      if (isAuthenticated && !isPending) navigate(redirect);
    },
    [isAuthenticated, isPending, redirect, navigate]
  );
  if (isPending) return <LoaderPage />

  return children;
}

export default Guest;
