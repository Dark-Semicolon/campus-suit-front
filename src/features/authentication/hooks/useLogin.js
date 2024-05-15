import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // TODo toast if is not active
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح");

      queryClient.invalidateQueries({ active: true });

      navigate("/");
    },

    onError: (err) => {
      console.log("login", err);
      toast.error("البريد إلكتروني غير صحيح أو كلمة السر، يرجى المحاولة مرة أخرى");
    },
  });

  return { login, isPending, error };
}
