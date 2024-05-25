import { useParams } from "react-router-dom";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { STORAGE_LINK } from "@/utils/constants";

import Button from "@/components/Button";

function ViewFacultySupervisor({ data }) {
  const { universityId, facultyId } = useParams();
  const { id, avatarUrl, name, email } = data;

  return (
    <Card className="pt-4 border-0 shadow-none min-w-96">
      <CardBody className="py-5 ">
        <div className="flex flex-wrap items-center gap-5">
          <Image alt="Card background" className="object-cover rounded-full h-[100px] w-[100px]" src={avatarUrl === null ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/${avatarUrl}`} />

          <div>
            <p className="text-xl font-bold text-blue-color-primary ">{name}</p>
            <p className="py-3 text-default-500">{email}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button type="primary" to={`/${universityId}/panel/faculties/${facultyId}/facultySupervisors/${id}/update`} className="w-full text-center">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ViewFacultySupervisor;
