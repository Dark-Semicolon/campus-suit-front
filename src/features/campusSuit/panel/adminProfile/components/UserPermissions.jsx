import { FaCrown } from "react-icons/fa";

function UserPermissions({ user }) {
  return (
    <div className="flex flex-col flex-wrap justify-start w-5/6 gap-8 p-8 bg-white border-2 border-gray-100 rounded-lg">
      <h2>Permissions:</h2>
      <div className="flex">
        {user?.relationships?.permissions?.map((permission, index) => (
          <div className="flex gap-2 px-4 py-2 font-bold border-2 rounded-xl bg-yellow-color-light" key={index}>
            <span>
              <FaCrown className="text-xl text-yellow-color-primary" />
            </span>
            {permission.attributes.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPermissions;
