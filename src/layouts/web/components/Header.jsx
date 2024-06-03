import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import Button from "@/components/Button";
import UserDropdown from "@/components/UserDropdown";
import Logo from "@/components/Logo";

import { useAuth } from "../hooks/auth/useAuth";

function Header({ className }) {

  const { useUser } = useAuth({ gardName: 'client' })

  const { isAuthenticated, isPending, user } = useUser();

  const isProfileRoute = location.pathname.startsWith("/user");

  return (
    <nav
      className={`${!isProfileRoute && ""
        } flex justify-between px-2 text-center md:px-16 w-100 z-30 ${isProfileRoute && "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] "
        } ${className} py-3`}
    >
      <header className="flex">
        <Link to="/" aria-description="link to the home page" className="w-20 md:w-full">
          <Logo width={`${isProfileRoute ? "80" : "80"}`} />
        </Link>
      </header>

      {isPending && (
        <Spinner className="flex items-center justify-center gap-4" />
      )}
      {!isAuthenticated && !isPending && (
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button to="/signup" type="primary" className="rounded-md md:leading-7">
            Sign Up
          </Button>

          <Button
            to="/login"
            type="primary" className="rounded-md md:leading-7"
          >
            Login
          </Button>
        </div>
      )}
      {isAuthenticated && !isPending && (
        <div className="flex items-center pe-5">
          <UserDropdown admin={true} user={user} logoutRedirect='/login' gardName='client' />
        </div>
      )}
    </nav>
  );
}

export default Header;
