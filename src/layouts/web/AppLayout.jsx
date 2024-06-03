import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AlertWarning from "@/components/AlertWarning";

import { useAuth } from "../../hooks/auth/useAuth";

function AppLayout() {
  const { useUser } = useAuth({ gardName: 'client' })
  const { isActive, isPending, isAuthenticated } = useUser();

  return (
    <div className="min-h-dvh w-full bg-white grid grid-rows-[auto,1fr,auto]">
      {isAuthenticated && !isActive && !isPending && <AlertWarning />}
      <Header />
      <main className="min-h-dvh">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
