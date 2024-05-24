import StatsCard from "@/components/StatsCard";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";

function Operations() {
  const { universityId, facultyId } = useParams();

  return (
    <div className="flex justify-center gap-16 pt-16 ">
      <Link to={`/${universityId}/panel/faculties/${facultyId}/roles`} className="">
        <StatsCard
          title="Faculty Roles"
          data="3 Roles"
          icon={<MdAdminPanelSettings />}
          className="duration-300 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
        />
      </Link>
      <Link to={`/${universityId}/panel/faculties/${facultyId}/facultySupervisors`}>
        <StatsCard
          title="Faculty Supervisors"
          data="2 supervisor"
          icon={<GrUserAdmin />}
          className="duration-300 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
        />
      </Link>
    </div>
  );
}

export default Operations;
