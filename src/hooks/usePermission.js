import { useUser } from "../features/authentication/hooks/useUser";

const usePermission = () => {
  const { isSuperAdmin, permissions, isAuthenticated, isPending, isSuccess, roles } = useUser();

  // Function to check if the current user has any of the specified permissions
  const canAny = (permissionsToCheck) => {
    return (
      isAuthenticated &&
      (isSuperAdmin || permissionsToCheck.some((permission) => permissions.includes(permission)))
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
      (isSuperAdmin || permissionsToCheck.every((permission) => permissions.includes(permission)))
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

  return { canAny, can, canAll, canNot, is, isAny, isAll, isPending, isSuccess };
};

export default usePermission;
