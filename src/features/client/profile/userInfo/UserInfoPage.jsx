import { useAuth } from "@/hooks/auth/useAuth";
import LoaderPage from "@/components/LoaderPage";
import UserData from "./components/UserData";

function UserInfoPage() {
  const { useUser } = useAuth({ gardName: "client" });

  const { user, isPending } = useUser();

  if (isPending) return <LoaderPage />;

  return <UserData user={user} isPending={isPending} />;
}

export default UserInfoPage;
