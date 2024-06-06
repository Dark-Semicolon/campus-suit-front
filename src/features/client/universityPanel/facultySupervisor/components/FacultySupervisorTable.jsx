import React, { useCallback, useState, useMemo } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Chip, Image } from "@nextui-org/react";

import { convertURLParams, formatDateTime, parseSearchParams } from "@/utils/helpers";
import { useFacultySupervisors } from "../hooks/useFacultySupervisors";

import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import HeaderContent from "@/components/Table/components/HeaderContent";
import FooterContent from "@/components/Table/components/FooterContent";
import ConfirmDelete from "@/components/ConfirmDelete";

import { STORAGE_LINK } from "@/utils/constants";
import CreateFacultySupervisorPage from "../CreateFacultySupervisorPage";
import { useDeleteFacultySupervisor } from "../hooks/useDeleteFacultySupervisor";
import ViewFacultySupervisor from "./ViewFacultySupervisor";

function FacultySupervisorTable() {
  const { universityId, facultyId } = useParams();

  const { search } = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const [perPage, setPerPage] = useState(5);
  const [searchParams] = useSearchParams();

  const page = parseSearchParams(searchParams, "page", (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)), 1);

  const filterAndSortAndPageQuery = convertURLParams(search);

  //Hooks

  //Get Users
  const { facultySupervisors, isPending } = useFacultySupervisors({
    universityId,
    facultyId,
    page,
    perPage,
    searchValue,
    filterAndSortAndPageQuery,
  });

  //Delete Users
  const { deleteFacultySupervisor, isDeleting } = useDeleteFacultySupervisor();

  //Filter Options
  const filterOptions = [
    { name: "Active", field: "status", value: "1" },
    { name: "Disabled", field: "status", value: "0" },
  ];

  //Header Rows
  const headers = [
    { uid: "id", name: "#", sortable: true },
    { uid: "avatarUrl", name: "Image", sortable: true },
    { uid: "name", name: "Supervisor", sortable: true },
    { uid: "email", name: "Email", sortable: true },
    { uid: "status", name: "Status", sortable: true },
    { uid: "createdAt", name: "Created at", sortable: true },
    { uid: "updatedAt", name: "Updated at", sortable: true },
    { uid: "actions", name: "Actions", sortable: false },
  ];

  //Default Headers
  const INITIAL_VISIBLE_COLUMNS = ["id", "avatarUrl", "name", "email", "status", "actions"];

  //Actions
  const actions = useMemo(
    () => [
      {
        id: "edit",
        name: "Edit",
        icon: <MdEdit className="text-lg text-blue-color-primary" />,
        content: (row) => <ViewFacultySupervisor data={row} />,
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
    row: <CreateFacultySupervisorPage />,
    to: `/${universityId}/panel/faculties/${facultyId}/facultySupervisors/create`,
    permission: true,
  };

  //formatting Data
  const reformattedData = facultySupervisors?.data?.map((item) => {
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
        case "avatarUrl":
          return (
            <Image
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={row?.avatarUrl === null ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/${cellValue}`}
              loading="lazy"
              classNames={{ img: "object-contain" }}
            />
          );

        case "status":
          return (
            <Chip className="gap-1 capitalize border-none text-default-600" color={row.status ? "success" : "warning"} size="sm" variant="dot">
              {cellValue ? "Active" : "Disabled"}
            </Chip>
          );

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
                {actions?.map((action) => (
                  <React.Fragment key={action.id}>
                    <Modal.Open opens={action.id}>
                      <button>{action.icon}</button>
                    </Modal.Open>

                    <Modal.Window name={action.id}>
                      {action.id === "rowDetails" ? (
                        action.content(row)
                      ) : action.id === "edit" ? (
                        action.content(row)
                      ) : action.id === "delete" ? (
                        <ConfirmDelete
                          rowData={row}
                          onConfirm={() => deleteFacultySupervisor({ universityId, facultyId, facultySupervisorId: row?.id })}
                          disabled={isDeleting}
                          resourceName={row?.name}
                        />
                      ) : null}
                    </Modal.Window>
                  </React.Fragment>
                ))}
              </Modal>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [actions, universityId, facultyId, isDeleting, deleteFacultySupervisor]
  );

  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));

  const totalPages = Math.ceil(facultySupervisors?.meta?.total / facultySupervisors?.meta?.per_page);

  return (
    <Table
      isloading={isPending}
      rows={reformattedData}
      headers={headers}
      visibleColumns={visibleColumns}
      renderCell={renderCell}
      topContent={
        <HeaderContent
          filterOptions={filterOptions}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          headers={headers}
          rowsNumber={perPage}
          setRowsNumber={setPerPage}
          addRow={addRow}
          totalRows={facultySupervisors?.meta?.total}
          setSearchValue={setSearchValue}
          placeholder={"Search with fuculty name or id.."}
        />
      }
      bottomContent={<FooterContent totalPages={totalPages} />}
    />
  );
}

export default FacultySupervisorTable;
