import { FaCrown } from "react-icons/fa";

function UserRoles({ user }) {
  return (
    <div className="flex flex-col flex-wrap justify-start w-5/6 gap-8 p-8 bg-white border-2 border-gray-100 rounded-lg">
      <h2>Roles:</h2>
      <div className="flex">
        {user?.relationships?.roles?.map((role, index) => (
          <div className="flex gap-2 px-4 py-2 font-bold border-2 rounded-xl bg-yellow-color-light" key={index}>
            <span>
              <FaCrown className="text-xl text-yellow-color-primary" />
            </span>
            {role.attributes.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRoles;
