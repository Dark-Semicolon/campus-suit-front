import { MdAdminPanelSettings } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react";
import { FaGear } from "react-icons/fa6";

function Operations() {
  const { universityId, facultyId } = useParams();

  const items = [
    {
      textValue: 'Faculty Supervisors',
      link: `/${universityId}/panel/faculties/${facultyId}/facultySupervisors`,
      title: 'Faculty Supervisors',
      icon: <GrUserAdmin />
    },
    {
      textValue: 'Faculty Roles',
      link: `/${universityId}/panel/faculties/${facultyId}/roles`,
      title: 'Faculty Roles',
      icon: <MdAdminPanelSettings />
    }
  ]

  return (
    <Dropdown backdrop="blur">
      {/* Dropdown button and the user Avatar   */}
      <DropdownTrigger>
        <Button
          variant="flat"
          className="flex gap-3 text-white bg-blue-color-primary"
        >
          <FaGear className="text-2xl text-white" />
          <span>Faculty Settings</span>
        </Button>
      </DropdownTrigger>
      {/* Dropdown Menu  */}
      <DropdownMenu variant="faded" aria-label="user Actions">
        {items.map((item, index) => {
          return (
            <DropdownItem key={index} textValue={item.textValue}>
              <Link
                to={item.link}
                className="flex items-center w-full gap-2 font-semibold text-medium text-blue-color-primary"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </DropdownItem>
          );
        })}

      </DropdownMenu>
    </Dropdown>
  );
}

export default Operations;
