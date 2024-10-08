import { useAuth } from "@/hooks/auth/useAuth";
import LoaderPage from "@/components/LoaderPage";

import UpdateAdmin from "./components/UpdateAdmin";
import UserRoles from "./components/UserRoles";
import UserPermissions from "./components/UserPermissions";
import NoItems from "./components/NoItems";

import { FaCrown } from "react-icons/fa";

function AdminProfilePage() {
    const { useUser } = useAuth({ gardName: "admin" });
    const { isPending, user } = useUser();

    if (isPending) return <LoaderPage />;

    return (
        <>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <h2 className="w-5/6 py-8 text-center text-white capitalize rounded-lg bg-blue-color-primary">
                    My Profile
                </h2>

                <UpdateAdmin user={user} />

                {user?.relationships?.roles?.length === 0 ? (
                    <div className="flex flex-col flex-wrap justify-start w-5/6 gap-8 p-8 bg-white border-2 border-gray-100 rounded-lg">
                        <NoItems
                            icon={
                                <FaCrown className="text-xl text-yellow-color-primary" />
                            }
                            text={"This user doesn't have roles"}
                        />
                    </div>
                ) : (
                    <UserRoles user={user} />
                )}

                {user?.relationships?.permissions.length === 0 ? (
                    <div className="flex flex-col flex-wrap justify-start w-5/6 gap-8 p-8 bg-white border-2 border-gray-100 rounded-lg">
                        <NoItems
                            icon={
                                <FaCrown className="text-xl text-yellow-color-primary" />
                            }
                            text={"This user doesn't have permissions"}
                        />
                    </div>
                ) : (
                    <UserPermissions user={user} />
                )}
            </div>
        </>
    );
}

export default AdminProfilePage;
