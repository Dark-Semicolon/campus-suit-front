import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoaderPage from './../components/LoaderPage';

import { useUser } from '@/features/client/auth/hooks/useUser';

function Auth({ children, redirect }) {
  const navigate = useNavigate();
  const { isAuthenticated, isPending, isActive } = useUser();

  useEffect(
    function () {
      if (!isPending && !isAuthenticated) navigate(redirect);

      if (!isActive && isAuthenticated) navigate("error/403");
    },
    [isAuthenticated, redirect, isPending, isActive, navigate,]
  );

  if (isPending) return <LoaderPage />;

  return children;
}

export default Auth;
