import { useParams } from "react-router-dom";
import { STORAGE_LINK } from "@/utils/constants";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Button from "@/components/Button";
import ProfileHeader from "../../../../../components/ProfileHeader";

function ViewFaculty({ data }) {
    const { universityId } = useParams();
    const { id, logo, name, description } = data;

    return (
        // <Card className="pt-4 border-0 shadow-none min-w-96">
        //     <CardBody className="py-5 ">
        //         <div className="flex flex-wrap items-center gap-5">

        //             <Image alt="Card background" className="object-cover rounded-full h-[100px] w-[100px]" src={`${STORAGE_LINK}/${logo}`} />

        //             <div>
        //                 <p className="text-xl font-bold text-blue-color-primary ">{name}</p>
        //                 <p className="py-3 text-default-500">{description}</p>
        //             </div>
        //         </div>
        //     </CardBody>
        //     <CardFooter>
        //     </CardFooter>
        // </Card>
        <div className="space-y-8">
            <ProfileHeader
                image={logo}
                name={name}
                email={description}
                id={id}
            />

            <Button
                type="primary"
                to={`/${universityId}/panel/faculties/${id}`}
                className="w-full text-center"
            >
                More Details
            </Button>
        </div>
    );
}

export default ViewFaculty;
