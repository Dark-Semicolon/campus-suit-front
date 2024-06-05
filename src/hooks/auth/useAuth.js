import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getCurrentUser,
    login as loginApi,
    logout as logoutApi,
    forgetPassword as forgetPasswordApi,
    resetPassword as resetPasswordApi,
} from "@/services/auth/apiAuth";

import toast from "react-hot-toast";

export function useAuth({ gardName = "client", loginRedirect = "/", logoutRedirect = "/" }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    function useLogin() {
        const {
            mutate: login,
            isPending,
            error,
        } = useMutation({
            mutationFn: loginApi,

            onSuccess: () => {
                toast.success("Login Successfully");

                queryClient.invalidateQueries({ active: true });

                navigate(loginRedirect);
            },

            onError: (err) => {
                console.log("login", err);
                toast.error("The email address or password is incorrect. Please try again.");
            },
        });

        return { login, error, isPending };
    }

    function useLogout() {
        const {
            mutate: logout,
            isPending,
            error,
        } = useMutation({
            mutationFn: logoutApi,
            onSuccess: () => {
                toast.success("You have successfully logged out");
                queryClient.invalidateQueries({
                    queryKey: [`${gardName ? gardName : "client"}`],
                });

                navigate(`${logoutRedirect ? logoutRedirect : `${gardName}/login`}`);
            },
            onError: (error) => {
                console.log("logout", error);
                toast.error("Something went wrong. Try again later");
            },
        });

        return { logout, error, isPending };
    }

    function useUser(
        include = gardName === "admin" && [
            "permissions",
            "permissionsCount",
            "permissionsExists",
            "roles",
        ]
    ) {
        let isAuthenticated = false;
        let isActive = false;

        const {
            data: user,
            isPending,
            error,
            isSuccess,
        } = useQuery({
            queryFn: () => getCurrentUser({ include, gardName: gardName ? gardName : "client" }),
            queryKey: [`${gardName ? gardName : "client"}`, gardName, include],
            retry: false,
        });

        if (isSuccess) {
            isAuthenticated = user ? true : false;

            isActive = user?.data?.attributes?.status;
        }
        return {
            user: user?.data,
            isPending,
            error,
            isAuthenticated,
            isActive,
            isSuccess,
        };
    }

    function useForgetPassword() {
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
                navigate(
                    `${gardName == "client" ? "" : `/${gardName}`}/emailconfirmation/${email}`,
                    { replace: true }
                );
            },
            onError: (error) => {
                console.log("error", error);
                toast.error(error.response.data.message);
            },
        });
        return { isPending, forgetPassword, error };
    }

    function useResetPassword() {
        const navigate = useNavigate();

        const {
            mutate: resetPassword,
            isPending,
            error,
        } = useMutation({
            mutationFn: resetPasswordApi,
            onSuccess: () => {
                toast.success("The password has been changed successfully");

                navigate(`${gardName === "client" ? "" : `${gardName}`}/login`, {
                    replace: true,
                });
            },
            onError: (err) => {
                toast.error(err.message);
            },
        });

        return { isPending, resetPassword, error };
    }

    return {
        useLogin,
        useLogout,
        useUser,
        useForgetPassword,
        useResetPassword,
    };
}
