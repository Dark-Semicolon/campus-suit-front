import { Link } from "react-router-dom";
import { useLogout } from "../features/authentication/hooks/useLogout";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import AvatarComponent from "./Avatar";
import { useUser } from "@/features/authentication/hooks/useUser";
import { STORAGE_LINK } from "../utils/constants";
import AdminAccount from "../layouts/dashboard/components/AdminAccount";

function UserDropdown({ admin = false }) {
  const { logout } = useLogout()
  const { user, isSuperAdmin, identities } = useUser();

  const image = user?.data?.attributes?.image;

  const items = [
    {
      link: "/user/profile",
      title: "الملف الشخصي",
      textValue: "profile page",
      key: "profile",
    },
  ];


  return (
    <Dropdown backdrop="blur">
      {/* Dropdown button and the user Avatar   */}
      <DropdownTrigger>
        <Button
          variant="light"
          className="h-fit"
          radius={!admin && "full"}
          isIconOnly={!admin}
        >
          {admin ? <AdminAccount /> : <AvatarComponent image={image ? `${STORAGE_LINK}/images/users/${image}` : 'images/userPlaceholder.png'} />}
        </Button>
      </DropdownTrigger>
      {/* Dropdown Menu  */}
      <DropdownMenu variant="faded" aria-label="user Actions">
        {items.map((item) => {
          return (
            <DropdownItem key={item.key} textValue={item.textValue}>
              <Link
                to={item.link}
                className="block w-full font-semibold text-medium"
              >
                {item.title}
              </Link>
            </DropdownItem>
          );
        })}
        {/* {Redeem  code} */}
        <DropdownItem key="Redeem code" textValue="Redeem code form">
          <Link to="/redeem" className="block w-full font-semibold text-medium">
            شراء عن طريق الكود
          </Link>
        </DropdownItem>

        {/* Dashboard */}
        {isSuperAdmin || identities[0] ? (
          <DropdownItem key="admins pages" textValue="dashboard">
            <Link
              to="admin/dashboard"
              className="block w-full font-semibold text-medium"
            >
              لوحة النحكم
            </Link>
          </DropdownItem>
        ) : null}

        {/* Logout Button  */}
        <DropdownItem
          key="delete"
          textValue="profile page"
          className="block w-full font-semibold text-danger text-medium"
          color="danger"
          onClick={logout}
        >
          تسجيل الخروج
        </DropdownItem>
      </DropdownMenu>
    </Dropdown >
  );
}
export default UserDropdown;
