import AuthLayout from "@/layouts/Auth/AuthLayout";
import SignupForm from '@/features/client/auth/signup/SignupForm';
import HaveAccount from '@/features/client/auth/signup/components/HaveAccount';


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
