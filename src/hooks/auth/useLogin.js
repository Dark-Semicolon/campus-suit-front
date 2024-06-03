import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/campusSuite/apiAuth";
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
            toast.success("Admin Login Successfully");

            queryClient.invalidateQueries({ active: true });

            navigate("/admin/dashboard");
        },

        onError: (err) => {
            console.log("login", err);
            toast.error("The email address or password is incorrect. Please try again.");
        },
    });

    return { login, isPending, error };
}
