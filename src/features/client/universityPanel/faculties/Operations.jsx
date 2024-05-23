import StatsCard from '@/components/StatsCard';
import { MdAdminPanelSettings } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useParams } from 'react-router-dom';

function Operations() {
    const { universityId, facultyId } = useParams()

    return (
        <div className="flex justify-center gap-16 pt-16">
            <Link to={`/${universityId}/panel/faculties/${facultyId}/roles`} >
                <StatsCard title='Faculty Roles' data='3 Roles' icon={<MdAdminPanelSettings />} />
            </Link>
            <Link to={`/${universityId}/panel/faculties/${facultyId}/supervisors`}>
                <StatsCard title='Faculty Supervisors' data='2 supervisor' icon={<GrUserAdmin />} />
            </Link>
        </div>
    )
}

export default Operations