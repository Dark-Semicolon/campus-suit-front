import React, { useCallback, useState, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { convertURLParams, formatDateTime, parseSearchParams } from "@/utils/helpers";

import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import HeaderContent from "@/components/Table/components/HeaderContent";
import FooterContent from "@/components/Table/components/FooterContent";

import { Chip, Image } from "@nextui-org/react";
import { STORAGE_LINK } from "@/utils/constants";
import ConfirmDelete from "@/components/ConfirmDelete";
import { useClients } from "../hooks/useClients";
import CreateClient from "./CreateClient";
import UpdateClient from "./UpdateClient";
import ViewClient from "./ViewClient";

import { useDeleteClient } from "../hooks/useDeleteClient";
import usePermission from '@/hooks/usePermission';

function ClientsTable() {

  const { search } = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const [perPage, setPerPage] = useState(5);
  const [searchParams] = useSearchParams();

  const { canAll, can } = usePermission()

  const page = parseSearchParams(searchParams, "page", (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)), 1);

  const filterAndSortAndPageQuery = convertURLParams(search);



  //Get Users
  const { clients, isPending } = useClients({
    page,
    perPage,
    searchValue,
    filterAndSortAndPageQuery,
  });

  //Delete Users
  const { deleteClient, isDeleting } = useDeleteClient();

  // //Filter Options
  const filterOptions = [
    { name: "Active", field: "status", value: "1" },
    { name: "Disabled", field: "status", value: "0" },
  ];

  //Header Rows
  const headers = [
    { uid: "id", name: "#", sortable: true },
    { uid: "image", name: "Image", sortable: false },
    { uid: "name", name: "Client Name", sortable: true },
    { uid: "email", name: "Email", sortable: true },
    { uid: "status", name: "Status", sortable: true },
    { uid: "createdAt", name: "Created at", sortable: true },
    { uid: "updatedAt", name: "Updated at", sortable: true },
    { uid: "actions", name: "actions", sortable: false },
  ];

  //Default Headers
  const INITIAL_VISIBLE_COLUMNS = ["id", "image", "name", "email", "status", "actions"];

  //Actions
  const actions = useMemo(
    () => [
      {
        id: "view",
        name: "View",
        icon: <FaEye className="text-lg" />,
        content: (row) => <ViewClient data={row} />,
        permissions: 'view_user'
      },
      {
        id: "update",
        name: "Edite",
        icon: <MdEdit className="text-lg text-blue-color-primary" />,
        content: (row) => <UpdateClient data={row} />,
        permissions: 'update_user'
      },
      {
        id: "delete",
        name: "Delete",
        icon: <MdDelete className="text-lg text-red-color-primary" />,
        permissions: 'delete_user'
      },
    ],
    []
  );

  //Add Row
  const addRow = {
    row: <CreateClient />,
    permission: can('create_user'),
  };

  //formatting Data
  const reformattedData = clients?.data?.map((item) => {
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
        case "image":
          return <Image className="w-[50px] h-[50px] rounded-full object-cover" src={row?.image === null ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/${cellValue}`} loading="lazy" />;

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
                  canAll(action.permissions) && (
                    <React.Fragment key={action.id}>

                      <>
                        <Modal.Open opens={action.id}>
                          <button>{action.icon}</button>
                        </Modal.Open>
                        <Modal.Window name={action.id}>
                          {action.id === "view" ? (
                            action.content(row)
                          ) : action.id === "update" ? (
                            action.content(row)
                          ) : action.id === "delete" ? (
                            <ConfirmDelete rowData={row} onConfirm={() => deleteClient({ clientId: row.id })} disabled={isDeleting} resourceName={row?.name} />
                          ) : null}
                        </Modal.Window>
                      </>
                    </React.Fragment>)
                ))}
              </Modal>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [actions, deleteClient, canAll, isDeleting]
  );

  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));

  const totalPages = Math.ceil(clients?.meta?.total / clients?.meta?.per_page);

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
          totalRows={clients?.meta?.total}
          setSearchValue={setSearchValue}
          placeholder={"Search with Client email or name..."}
        />
      }
      bottomContent={<FooterContent totalPages={totalPages} />}
    />
  );
}

export default ClientsTable;
