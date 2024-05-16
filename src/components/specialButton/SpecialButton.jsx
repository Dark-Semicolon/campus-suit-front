import { Link } from "react-router-dom";
import style from "./style.module.css";

function SpecialButton({ children }) {
  return (
    <Link
      to="/redeem"
      className={`text-xl md:text-2xl font-semibold flex justify-center hover:bg-white  transition-colors items-center pb-0 text-white hover:text-blue-color-primary rounded-lg bg-blue-color-light ${style.btn} py-3 px-5 h-[80px] w-[170px] md:h-[80px] md:w-[205px]`}
    >
      {children}
    </Link>
  );
}

export default SpecialButton;
