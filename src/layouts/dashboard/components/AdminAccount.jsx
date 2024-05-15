import { User, spinner } from "@nextui-org/react";
import { useUser } from "../../../features/authentication/hooks/useUser";
import { STORAGE_LINK } from "../../../utils/constants";

function AdminAccount() {
  const { user, isPending } = useUser();
  if (isPending) return spinner;
  return (
    (
      <div
        className="w-30"
      >

        <User
          avatarProps={{
            radius: "full",
            size: "md",
            src: user?.data?.attributes?.image === null
              ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/images/users/${user?.data?.attributes?.image}`,
          }}
          classNames={{
            name: "text-blue-color-primary font-bold text-sm truncate w-30",
            base: ' flex-row-reverse py-2'
          }}
          description={user?.data?.attributes?.email}
          name={user?.data?.attributes?.name}
        />
      </div>
    )
  );
}

export default AdminAccount;
