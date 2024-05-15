import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

export function useUser() {
  let identities = [];
  let permissions = [];
  let roles = [];
  let isAuthenticated = false;
  let isActive = false;
  let isSuperAdmin = false;

  const {
    data: user,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryFn: () =>
      getCurrentUser(
        "include=studentData,roles&includeIdentities=true&includeAllPermissions=true"
      ),
    queryKey: ["user"],
    retry: false,
  });

  if (isSuccess) {
    identities = user.data.identities;
    isAuthenticated = user ? true : false;
    roles = user?.data?.relationships?.roles;

    permissions = user?.data?.allPermissions;
    isActive = user?.data?.attributes.status;

    // Check if This User Is a Super Admin
    user.data.relationships.roles.every((role) => {
      if (role.attributes.name === "Super Admin") {
        isSuperAdmin = true;
        return false;
      }
      return true;
    });
  }

  return {
    user,
    isPending,
    isError,
    isAuthenticated,
    identities,
    isSuperAdmin,
    isActive,
    permissions,
    roles,
    isSuccess,
  };
}
