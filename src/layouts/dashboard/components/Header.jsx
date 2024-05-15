import { Spinner } from "@nextui-org/react";

import Button from "@/components/Button";
import UserDropdown from "@/components/UserDropdown";
import { useUser } from "@/features/authentication/hooks/useUser";
import { IoMenu } from "react-icons/io5";

function Header({ className, setMobileNavOpen, mobileNavOpen }) {
  const { isAuthenticated, isPending } = useUser();

  return (
    <nav
      className={`flex justify-between items-center p-2 h-20 text-center md:px-5 w-100 ${className}`}
    >
      <header className="flex items-center gap-3">
        <button
          className="block md:hidden"
          onClick={() => setMobileNavOpen((mobileNavOpen) => !mobileNavOpen)}
        >
          {!mobileNavOpen && <IoMenu className="text-2xl" />}
        </button>

      </header>

      {isPending && (
        <Spinner className="items-center justify-center hidden gap-4 md:flex" />
      )}

      {!isAuthenticated && !isPending && (
        <div className="items-center justify-center hidden gap-4 md:flex">
          <Button to="/signup" type="secondry" className="leading-9">
            إنشاء حساب
          </Button>

          <Button
            to="/login"
            type="bordered"
            className="leading-9 text-white hover:text-stone-200 hover:border-stone-200"
          >
            تسجيل الدخول
          </Button>
        </div>
      )}
      {isAuthenticated && !isPending && (
        <div className="flex items-center justify-center gap-4">
          <UserDropdown admin={true} />

        </div>
      )}
    </nav>
  );
}

export default Header;
