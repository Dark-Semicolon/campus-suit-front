import { useAuth } from "@/hooks/auth/useAuth";
import LoaderPage from "@/components/LoaderPage";

import UpdateAdmin from "./components/UpdateAdmin";
import UserRoles from "./components/UserRoles";
import UserPermissions from "./components/UserPermissions";

function AdminProfilePage() {
  const { useUser } = useAuth({ gardName: "admin" });
  const { isPending, user } = useUser();

  if (isPending) return <LoaderPage />;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <h2 className="w-5/6 py-8 text-center text-white capitalize rounded-lg bg-blue-color-primary">profile data</h2>

        <UpdateAdmin user={user} />

        {user?.relationships?.roles?.length !== 0 && <UserRoles user={user} />}

        {user?.relationships?.permissions.length !== 0 && <UserPermissions user={user} />}
      </div>
    </>
  );
}

export default AdminProfilePage;
