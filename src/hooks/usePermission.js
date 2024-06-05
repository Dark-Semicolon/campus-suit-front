import { useAuth } from "@/hooks/auth/useAuth";

const usePermission = () => {
    const { useUser } = useAuth({ gardName: "admin" });

    const include = ["permissions", "permissionsCount", "permissionsExists", "roles"];

    const { user, isPending, isAuthenticated, isSuccess } = useUser(include);

    const permissions = user?.relationships?.permissions?.map(
        (permission) => permission.attributes.name
    );
    const roles = user?.relationships?.roles?.map((role) => role.attributes.name);
    const isSuperAdmin = roles?.includes("super_admin");

    // Function to check if the current user has any of the specified permissions
    const canAny = (permissionsToCheck) => {
        return (
            isAuthenticated &&
            (isSuperAdmin ||
                permissionsToCheck.some((permission) => permissions.includes(permission)))
        );
    };

    // Function to check if the current user has a specific permission
    const can = (permissionToCheck) => {
        return isAuthenticated && (isSuperAdmin || permissions.includes(permissionToCheck));
    };

    // Function to check if the current user has all of the specified permissions
    const canAll = (permissionsToCheck) => {
        return (
            isAuthenticated &&
            (isSuperAdmin ||
                permissionsToCheck.every((permission) => permissions.includes(permission)))
        );
    };

    // Function to check if the current user does not have any of the specified permissions
    const canNot = (permissionsToCheck) => {
        return (
            isAuthenticated &&
            !isSuperAdmin &&
            !permissionsToCheck.some((permission) => permissions.includes(permission))
        );
    };

    // For Roles Check
    const is = (roleToCheck) => {
        return isAuthenticated && roles?.includes(roleToCheck);
    };

    const isAny = (rolesToCheck) => {
        return isAuthenticated && rolesToCheck.some((role) => roles?.includes(role));
    };

    const isAll = (rolesToCheck) => {
        return isAuthenticated && rolesToCheck.every((role) => roles?.includes(role));
    };

    return {
        canAny,
        can,
        canAll,
        canNot,
        is,
        isAny,
        isAll,
        isSuperAdmin,
        isPending,
        isSuccess,
    };
};

export default usePermission;
