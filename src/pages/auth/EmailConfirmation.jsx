import { useParams } from "react-router-dom";
import Logo from "../../components/Logo";
import AuthLayout from "../../layouts/Auth/AuthLayout";

function EmailConfirmation() {
  const { email } = useParams();
  return (
    <>
      <header className="flex items-center justify-center">
        <Logo width="200px" />
      </header>
      <main className="container mx-auto">
        <AuthLayout
          image="bg-login"
          title="تحقق من البريد الخاص بك!"
          description={`لقد أرسلنا إليك للتو تعليمات عبر البريد الإلكتروني
لإعادة تعيين كلمة المرور الخاصة بك ${email}`}
          className="py-2"
        >
          <p className="text-blue-color-light">{email}</p>
        </AuthLayout>
      </main>
    </>
  );
}

export default EmailConfirmation;
