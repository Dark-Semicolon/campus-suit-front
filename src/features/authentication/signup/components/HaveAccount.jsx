import { Link } from "react-router-dom";

function HaveAccount() {
  return (
    <div className="py-5">
      <span>Have an account?</span>
      <Link to="/login" className="px-2 text-mint-green-color-primary">
        Log in
      </Link>
    </div>
  );
}

export default HaveAccount;
