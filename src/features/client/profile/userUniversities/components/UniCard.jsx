import { Link } from "react-router-dom";
import { STORAGE_LINK } from "@/utils/constants";

import { MdDelete, MdEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
} from "@nextui-org/react";
import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";
import UpdateUniversity from "./UpdateUniversity";

import useDeleteUniversity from "../hooks/useDeleteUniversity";
import { UNI_DESCRIPTION, UNI_NAME } from "../../../../../utils/constants";

function UniCard({ university }) {
    const { id } = university;
    const { logo, name, description } = university.attributes;

    const { deleteUniversity, isDeleting } = useDeleteUniversity();

    return (
        <Card className="py-4 w-72 h-[400px]">
            <CardHeader className="flex items-start justify-between px-4 pt-2 pb-0">
                <div className="flex items-center justify-end w-full gap-3 pb-3 border-b-1">
                    <Link to={`/${id}/panel/stats`} replace={true}>
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
                            <UpdateUniversity
                                oldValues={university.attributes}
                                universityId={id}
                            />
                        </Modal.Window>

                        {/* Delete University */}
                        <Modal.Open opens={`delete-${id}`}>
                            <button disabled={isDeleting}>
                                <MdDelete className="text-xl text-red-color-primary" />
                            </button>
                        </Modal.Open>
                        <Modal.Window name={`delete-${id}`}>
                            <ConfirmDelete
                                resourceName={name}
                                onConfirm={() =>
                                    deleteUniversity({ universityId: id })
                                }
                            />
                        </Modal.Window>
                    </Modal>
                </div>
            </CardHeader>
            <CardBody className="items-center justify-center py-2 overflow-hidden min-h-56 h-60">
                <Image
                    alt="Card background"
                    className="object-contain w-full py-1 transition max-h-56 rounded-xl hover:scale-105"
                    src={`${STORAGE_LINK}/${logo}`}
                    radius="none"
                />
            </CardBody>
            <CardFooter className="h-24 px-4 border-t-1 w-72">
                <div className="w-full py-3">
                    <p className="font-bold break-words text-md text-blue-color-primary">
                        {name.length > UNI_NAME
                            ? `${description.slice(0, UNI_NAME)}...`
                            : name}
                    </p>
                    <p className="break-words text-default-500">
                        {description.length > UNI_DESCRIPTION
                            ? `${description.slice(0, UNI_DESCRIPTION)}...`
                            : description}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}

export default UniCard;
