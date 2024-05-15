import Logo from "../../components/Logo";
import ResetPasswordForm from "../../features/authentication/newPassword/ResetPasswordForm";

function ResetPassword() {
  return (
    <>
      <header className="flex items-center justify-center">
        <Logo width="200px" />
      </header>
      <main className="container mx-auto">
        <ResetPasswordForm />
      </main>
    </>
  );
}

export default ResetPassword;
