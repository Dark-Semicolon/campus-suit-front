import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    getCurrentUser,
    login as loginApi,
    logout as logoutApi,
} from "../../services/auth/apiAuth";

export function useAuth({ gardName = "client", loginRedirect = "/", logoutRedirect = "/" }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    //Login
    const {
        mutate: login,
        isPending: isLogin,
        error: loginError,
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

    const {
        mutate: logout,
        isPending: isLogout,
        error: logoutError,
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

    function useUser() {
        console.log(gardName);
        let isAuthenticated = false;
        let isActive = false;
        const {
            data: user,
            isPending,
            error,
            isSuccess,
        } = useQuery({
            queryFn: () => getCurrentUser({ gardName: gardName ? gardName : "client" }),
            queryKey: [`${gardName ? gardName : "client"}`, gardName],
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

    return {
        login,
        isLogin,
        loginError,
        logout,
        isLogout,
        logoutError,
        useUser,
    };
}
