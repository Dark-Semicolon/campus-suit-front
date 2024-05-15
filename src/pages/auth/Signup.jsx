import SignupForm from "@/features/authentication/signup/SignupForm";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import HaveAccount from "../../features/authentication/signup/components/HaveAccount";

function Signup() {
  return (
    <main className="container mx-auto">
      <AuthLayout
        image="bg-signUp"
        title="إنشاء حساب"
        description="ادخل بياناتك بشكل صحيح للحصول علي افضل تجربه داخل الموقع"
      >
        <SignupForm />
        <HaveAccount />
      </AuthLayout>
    </main>
  );
}

export default Signup;
