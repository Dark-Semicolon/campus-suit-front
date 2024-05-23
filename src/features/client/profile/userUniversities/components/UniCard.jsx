import { Link } from "react-router-dom";
import { STORAGE_LINK } from "@/utils/constants";

import { MdDelete, MdEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";
import UpdateUniversity from "./UpdateUniversity";

import useDeleteUniversity from "../hooks/useDeleteUniversity";

function UniCard({ university }) {
  const { id } = university;
  const { logo, name, description } = university.attributes;

  const { deleteUniversity, isDeleting } = useDeleteUniversity();

  return (
    <Card className="py-4">
      <CardHeader className="flex items-start justify-between px-4 pt-2 pb-0">
        <div className="flex items-center justify-end w-full gap-3 pb-3 border-b-1">
          <Link to={`/${id}/admin/controlPanel`} replace={true}>
            <IoSettingsOutline className="text-xl text-blue-color-primary" />
          </Link>
          <Modal>
            {/* update University */}
            <Modal.Open opens={`update-${id}`}>
              <button>
                <MdEdit className="text-xl text-blue-color-primary" />
              </button>
            </Modal.Open>
            <Modal.Window name={`update-${id}`}>
              <UpdateUniversity oldValues={university.attributes} universityId={id} />
            </Modal.Window>

            {/* Delete University */}
            <Modal.Open opens={`delete-${id}`}>
              <button disabled={isDeleting}>
                <MdDelete className="text-xl text-red-color-primary" />
              </button>
            </Modal.Open>
            <Modal.Window name={`delete-${id}`}>
              <ConfirmDelete resourceName={name} onConfirm={() => deleteUniversity({ universityId: id })} />
            </Modal.Window>
          </Modal>
        </div>
      </CardHeader>
      <CardBody className="py-2 overflow-visible">
        <Image alt="Card background" className="object-contain transition rounded-xl max-h-52 hover:scale-105" src={`${STORAGE_LINK}/${logo}`} width={270} />
      </CardBody>
      <CardFooter>
        <div>
          <p className="text-xl font-bold text-blue-color-primary ">{name}</p>
          <p className="py-3 text-default-500">{description}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UniCard;
