import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/campusSuite/apiAuth";

export function useAdmin() {
    let isAuthenticated = false;
    let isActive = false;

    const {
        data: admin,
        isPending,
        isError,
        isSuccess,
    } = useQuery({
        queryFn: () => getCurrentUser(),
        queryKey: ["admin"],
        retry: false,
    });

    if (isSuccess) {
        isAuthenticated = admin ? true : false;

        isActive = admin?.data?.attributes?.status;
    }

    return {
        admin: admin?.data,
        isPending,
        isError,
        isAuthenticated,
        isActive,
        isSuccess,
    };
}
