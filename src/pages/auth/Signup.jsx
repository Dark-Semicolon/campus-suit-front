import SignupForm from "@/features/authentication/signup/SignupForm";
import AuthLayout from "../../layouts/Auth/AuthLayout";
import HaveAccount from "../../features/authentication/signup/components/HaveAccount";

function Signup() {
  return (
    <main className="container mx-auto">
      <AuthLayout
        image="bg-signUp"
        title="Sign up"
        description="Enter your data correctly to get the best experience on the site"
      >
        <SignupForm />
        <HaveAccount />
      </AuthLayout>
    </main>
  );
}

export default Signup;
