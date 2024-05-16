import TitleAndDesc from "./components/TitleAndDesc";
import Logo from "./../../components/Logo";
import { Link } from "react-router-dom";

function AuthLayout({
  children,
  image = "bg-login",
  title,
  description,
  className = "py-8",
}) {
  return (
    <div className="flex items-center justify-center min-h-screen xl:justify-between ">
      <div className="flex flex-col items-center justify-center flex-grow w-3/5 2xl:w-1/2">
        <Link to="/" className="mb-10">
          <Logo width="250px" />
        </Link>
        <TitleAndDesc
          title={title}
          description={description}
          className={className}
        />
        {children}
      </div>

      <div className="relative self-start hidden w-1/2 h-screen xl:block">
        <div
          className={`h-full bg-center bg-no-repeat w-4/5 bg-contain ${image} mx-auto`}
        ></div>
      </div>
    </div>
  );
}

export default AuthLayout;
