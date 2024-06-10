import { User, Spinner } from "@nextui-org/react";
import { useUser } from "@/features/client/auth/hooks/useUser";
import { STORAGE_LINK } from "../../../utils/constants";

function AdminAccount() {
    const { user, isPending } = useUser();

    if (isPending) return <Spinner />;

    return (
        <div className="w-30">
            <User
                avatarProps={{
                    radius: "full",
                    size: "md",
                    src:
                        user?.attributes?.image === null
                            ? "/images/userPlaceholder.webp"
                            : `${STORAGE_LINK}/${user?.attributes?.image}`,
                }}
                classNames={{
                    name: "text-blue-color-primary font-bold text-sm truncate w-30",
                    base: " flex-row-reverse py-2",
                }}
                description={user?.attributes?.email}
                name={user?.attributes?.name}
            />
        </div>
    );
}

export default AdminAccount;
