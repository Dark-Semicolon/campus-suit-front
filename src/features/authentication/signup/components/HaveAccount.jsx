import { Link } from "react-router-dom";

function HaveAccount() {
  return (
    <div className="py-5">
      <span>لديك حساب؟</span>
      <Link to="/login" className="px-2 text-mint-green-color-primary">
        تسجيل الدخول
      </Link>
    </div>
  );
}

export default HaveAccount;
