import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AlertWarning from "@/components/AlertWarning";

import { useUser } from '@/features/client/auth/hooks/useUser';

function AppLayout() {
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
