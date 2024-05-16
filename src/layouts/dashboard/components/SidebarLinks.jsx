import { NavLink } from "react-router-dom";

function SidebarLinks({ list, isOpen }) {
  return (
    <ul className={`py-12 self-start w-full ${!isOpen && "pt-28"}`}>
      {list.map((item, index) => {
        return (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center py-4 duration-200 gap-x-2 pr-6 ${
                  isActive
                    ? `text-blue-color-primary font-bold bg-yellow-color-light ${
                        isOpen ? "border-l-5 border-blue-color-light" : ""
                      }  `
                    : ""
                }`
              }
            >
              <span
                className={`duration-300 ${isOpen ? "text-2xl" : "text-3xl"}  
                `}
              >
                {item.icon}
              </span>
              {isOpen && <p className="text-md">{item.name}</p>}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default SidebarLinks;
