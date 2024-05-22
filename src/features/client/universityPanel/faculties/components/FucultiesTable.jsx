import React, { useCallback, useState, useMemo } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import {
    convertURLParams,
    formatDateTime,
    parseSearchParams,
} from "@/utils/helpers";


import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";



import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";
import Table from "@/components/Table/Table";
import HeaderContent from "@/components/Table/components/HeaderContent";
import FooterContent from "@/components/Table/components/FooterContent";

import { useFaculties } from '../hooks/useFaculties'
import { useDeleteFaculty } from "../hooks/useDeleteFaculty";
import CreateFaculty from "./CreateFaculty";
import ViewFaculty from "./ViewFaculty";
import UpdateFaculty from "./UpdateFaculty";
import { Image } from '@nextui-org/react';
import { STORAGE_LINK } from '@/utils/constants';

function FucultiesTable() {

    const { universityId } = useParams()

    const { search } = useLocation();
    const [searchValue, setSearchValue] = useState("");

    const [perPage, setPerPage] = useState(5);
    const [searchParams] = useSearchParams();




    const page = parseSearchParams(
        searchParams,
        "page",
        (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
        1
    );

    const filterAndSortAndPageQuery = convertURLParams(search);

    //Hooks

    //Get Users
    const { faculties, isPending } = useFaculties({
        universityId,
        page,
        perPage,
        searchValue,
        filterAndSortAndPageQuery,
    });


    //Delete Users
    const { deleteFaculty, isDeleting } = useDeleteFaculty();


    // //Filter Options
    // const filterOptions = [
    //     { name: "نشيط", field: "status", value: "1" },
    //     { name: "محذور", field: "status", value: "0" },
    //     { name: "ادمن", field: "admin", value: "admin" },
    //     { name: "طالب", field: "student", value: "student" },
    // ];

    //Header Rows
    const headers = [
        { uid: "id", name: "#", sortable: true },
        { uid: "logo", name: "logo", sortable: false },
        { uid: "name", name: "Faculty name", sortable: true },
        { uid: "description", name: "Description", sortable: false },
        { uid: "createdAt", name: "Created at", sortable: true },
        { uid: "updatedAt", name: "Updated at", sortable: true },
        { uid: "actions", name: "actions", sortable: false },
    ];

    //Default Headers
    const INITIAL_VISIBLE_COLUMNS = [
        "id",
        "logo",
        "name",
        "description",
        "createdAt",
        "updatedAt",
        "actions",
    ];

    //Actions
    const actions = useMemo(
        () => [
            {
                id: "rowDetails",
                name: "View",
                icon: <FaEye className="text-lg" />,
                content: (row) => <ViewFaculty data={row} />,
            },
            {
                id: "edit",
                name: "Edite",
                icon: <MdEdit className="text-lg text-blue-color-primary" />,
                content: (row) => <UpdateFaculty data={row} />,
            },
            {
                id: "delete",
                name: "Delete",
                icon: <MdDelete className="text-lg text-red-color-primary" />,
            },
        ],
        []
    );

    //Add Row
    const addRow = {
        row: (
            <CreateFaculty />
        ),
        permission: true
    };


    //formatting Data
    const reformattedData = faculties?.data?.map((item) => {
        const { id, attributes } = item;

        return {
            id,
            ...attributes,
        };
    });

    const renderCell = useCallback(
        (row, columnKey) => {
            const cellValue = row?.[columnKey];
            switch (columnKey) {
                case "logo":
                    return (
                        <Image className='w-[50px] h-[50px] rounded-full object-cover' src={`${STORAGE_LINK}/${cellValue}`} loading='lazy' />
                    );
            }
            switch (columnKey) {
                case "createdAt":
                    return (
                        <span className="flex flex-col gap-2">
                            <span>{formatDateTime(cellValue).formattedTime}</span>
                            <span>{formatDateTime(cellValue).formattedDate}</span>
                        </span>
                    );
                case "updatedAt":
                    return (
                        <span className="flex flex-col gap-2">
                            <span>{formatDateTime(cellValue).formattedTime}</span>
                            <span>{formatDateTime(cellValue).formattedDate}</span>
                        </span>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center justify-start gap-2">
                            <Modal>
                                {
                                    actions?.map((action) =>
                                    (
                                        <React.Fragment key={action.id}>
                                            <Modal.Open opens={action.id}>
                                                <button>{action.icon}</button>
                                            </Modal.Open>

                                            <Modal.Window name={action.id}>
                                                {
                                                    action.id === "rowDetails" ? (
                                                        action.content(row)
                                                    ) : action.id === "edit" ? (
                                                        action.content(row)
                                                    ) : action.id === "delete" ? (
                                                        <ConfirmDelete
                                                            rowData={row}
                                                            onConfirm={() => deleteFaculty({ facultyId: row?.id, universityId })}
                                                            disabled={isDeleting}
                                                            resourceName={row?.name}
                                                        />
                                                    )
                                                        : null
                                                }
                                            </Modal.Window>
                                        </React.Fragment>
                                    ))
                                }
                            </Modal>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [actions, isDeleting, universityId, deleteFaculty]
    );

    const [visibleColumns, setVisibleColumns] = useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );

    const totalPages = Math.ceil(faculties?.meta?.total / faculties?.meta?.per_page);

    return (
        <Table
            isloading={isPending}
            rows={reformattedData}
            headers={headers}
            visibleColumns={visibleColumns}
            renderCell={renderCell}
            topContent={
                <HeaderContent
                    // filterOptions={filterOptions}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    headers={headers}
                    rowsNumber={perPage}
                    setRowsNumber={setPerPage}
                    addRow={addRow}
                    totalRows={faculties?.meta?.total}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder={"Search with fuculty name or id.."}
                />
            }
            bottomContent={<FooterContent totalPages={totalPages} />}
        />
    );
}

export default FucultiesTable;
