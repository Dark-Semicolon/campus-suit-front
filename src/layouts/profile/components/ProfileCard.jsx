import { NavLink } from "react-router-dom";

function ProfileCard({ list }) {
  return (
    <>
      <div className="grid items-center justify-center w-full gap-6 py-5 md:grid-cols-2 text-gray-color-primary">
        {list.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center flex-col p-4 w-full h-28 text-center gap-3  border-2 rounded-lg
              ${
                isActive &&
                "border-blue-color-light text-blue-color-light transition-all duration-300 border-2 rounded-lg"
              }`
              }
            >
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default ProfileCard;
