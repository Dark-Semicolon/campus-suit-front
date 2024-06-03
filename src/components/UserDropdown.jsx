import { STORAGE_LINK } from "../utils/constants";
import { Link } from "react-router-dom";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";

import { useAuth } from "../hooks/auth/useAuth";

function UserDropdown({ admin = false, user, gardName, logoutRedirect }) {


  const { logout } = useAuth({ gardName, logoutRedirect })

  const items = [
    {
      link: "/user/profile",
      title: "profile",
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
          <User
            avatarProps={{
              radius: "full",
              size: "md",
              src: user?.attributes?.image === null
                ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/${user?.attributes?.image}`,
            }}
            classNames={{
              name: "text-blue-color-primary font-bold text-sm truncate w-30",
              base: ' flex-row-reverse py-2'
            }}
            description={user?.attributes?.email}
            name={user?.attributes?.name}
          />
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

        {/* Logout Button  */}
        <DropdownItem
          key="delete"
          textValue="profile page"
          className="block w-full font-semibold text-danger text-medium"
          color="danger"
          onClick={() => logout({ gardName })}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
export default UserDropdown;
