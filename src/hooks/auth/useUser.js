import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/campusSuite/apiAuth";

export function useUser({ gardName }) {
    let isAuthenticated = false;
    let isActive = false;

    const {
        data: user,
        isPending,
        isError,
        isSuccess,
    } = useQuery({
        queryFn: () => getCurrentUser(),
        queryKey: [`${gardName ? gardName : "user"}`],
        retry: false,
    });

    if (isSuccess) {
        isAuthenticated = user ? true : false;

        isActive = user?.data?.attributes?.status;
    }

    return {
        user: user?.data,
        isPending,
        isError,
        isAuthenticated,
        isActive,
        isSuccess,
    };
}
