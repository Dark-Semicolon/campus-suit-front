import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetPassword as resetPasswordApi } from "@/services/apiAuth";

export function useResetPassword() {
  const navigate = useNavigate();

  const {
    mutate: resetPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("تم تغيير كلمة السر بنجاح");

      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, resetPassword, error };
}
