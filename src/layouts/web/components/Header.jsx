import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import Button from "@/components/Button";
import UserDropdown from "@/components/UserDropdown";
import Logo from "@/components/Logo";

import { useUser } from '@/features/client/auth/hooks/useUser';

function Header({ className }) {
  const { isAuthenticated, isPending } = useUser();

  const isProfileRoute = location.pathname.startsWith("/user");

  return (
    <nav
      className={`${!isProfileRoute && "absolute top-0 left-0 right-0"
        } flex justify-between px-2 text-center md:px-5 w-100 z-30 ${isProfileRoute && "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] "
        } ${className} py-6`}
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
          <Button to="/signup" type="secondry" className="md:leading-9">
            إنشاء حساب
          </Button>

          <Button
            to="/login"
            type="bordered"
            className="text-white h-fit md:leading-9 hover:text-stone-200 hover:border-stone-200 w-fit"
          >
            تسجيل الدخول
          </Button>
        </div>
      )}
      {isAuthenticated && !isPending && (
        <div className="flex items-center pe-5">
          <UserDropdown />
        </div>
      )}
    </nav>
  );
}

export default Header;
