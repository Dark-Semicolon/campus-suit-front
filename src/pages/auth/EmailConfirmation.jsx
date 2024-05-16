import { useParams } from "react-router-dom";
import AuthLayout from "../../layouts/Auth/AuthLayout";

function EmailConfirmation() {
  const { email } = useParams();
  return (

    <main className="container mx-auto">
      <AuthLayout
        image="bg-cheekEmail"
        title="Check your mail!"
        description={`We have just sent you instructions via email To reset your password ${email}`}
        className="py-2"
      >
        <h4 className="mt-5 text-blue-color-light">{email}</h4>
      </AuthLayout>
    </main>
  );
}

export default EmailConfirmation;
