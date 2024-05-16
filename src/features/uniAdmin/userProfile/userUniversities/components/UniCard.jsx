import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "../../../../../components/Modal";
import UpdateUniversity from "./UpdateUniversity";
import useDeleteUniversity from "../hooks/useDeleteUniversity";
import ConfirmDelete from "../../../../../components/ConfirmDelete";

function UniCard({ university }) {
    const { id } = university;
    const { logo, name, description } = university.attributes;

    const { deleteUniversity, isDeleting } = useDeleteUniversity();
    return (
        // <Link to={`${id}`}>
        <Card className="py-4">
            <CardHeader className="flex items-start justify-between px-4 pt-2 pb-0">
                <h4 className="font-bold text-large text-blue-color-primary">Actions</h4>
                <div className="flex gap-3">
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
                            <button>
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
                <Image alt="Card background" className="object-cover rounded-xl" src="https://nextui.org/images/hero-card-complete.jpeg" width={270} />
            </CardBody>
            <CardFooter>
                <div>
                    <p className="text-xl font-bold text-blue-color-primary ">{name}</p>
                    <p className="py-3 text-default-500">{description}</p>
                </div>
            </CardFooter>
        </Card>
        // </Link>
    );
}

export default UniCard;
