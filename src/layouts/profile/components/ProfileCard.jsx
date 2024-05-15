import { NavLink } from "react-router-dom";

function ProfileCard({ list }) {
  return (
    <>
      <div className="grid items-center justify-center w-full gap-6 py-5 md:grid-cols-2">
        {list.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center flex-col p-4 w-full h-28 text-center gap-3 text-gray-color-primary border-2 rounded-lg
              ${
                isActive &&
                "border-yellow-color-primary text-yellow-color-primary transition-all duration-300 border-2 rounded-lg"
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
