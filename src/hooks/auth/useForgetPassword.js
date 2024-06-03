import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { forgetPassword as forgetPasswordApi } from "@/services/campusSuite/apiAuth";

export function useForgetPassword() {
    const navigate = useNavigate();

    const {
        mutate: forgetPassword,
        isPending,
        error,
    } = useMutation({
        mutationFn: forgetPasswordApi,
        onSuccess: (data) => {
            const email = JSON.parse(data?.config?.data).email;
            toast.success("Plesase check your email");
            navigate(`/emailconfirmation/${email}`, { replace: true });
        },
        onError: (error) => {
            console.log("error", error);
            toast.error(error.response.data.message);
        },
    });
    return { isPending, forgetPassword, error };
}
