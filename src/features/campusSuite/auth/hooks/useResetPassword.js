import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetPassword as resetPasswordApi } from "@/services/campusSuite/apiAuth";

export function useResetPassword() {
    const navigate = useNavigate();

    const {
        mutate: resetPassword,
        isPending,
        error,
    } = useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: () => {
            toast.success("The password has been changed successfully");

            navigate("/admin/login", { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isPending, resetPassword, error };
}
