import React, { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { FaEye } from "react-icons/fa";

import { MdDelete, MdEdit } from "react-icons/md";

import { formatDateTime, parseSearchParams } from "@/utils/helpers";

import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";

import Table from "@/components/Table/Table";
import HeaderContent from "@/components/Table/components/HeaderContent";
import FooterContent from "@/components/Table/components/FooterContent";

import ViewRole from "./ViewRole";

import { useRoles } from "../hooks/useRoles";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { convertURLParams } from "@/utils/helpers";
import usePermission from '@/hooks/usePermission';

function RolesTable() {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const navigate = useNavigate();

  const { can, canAll } = usePermission()

  const { deleteRole, isDeleting } = useDeleteRole();


  const page = parseSearchParams(
    searchParams,
    "page",
    (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
    1
  );

  const filterAndSortAndPageQuery = convertURLParams(search);

  const { roles, isPending } = useRoles({
    page,
    perPage,
    searchValue,
    include: 'permissions',
    filterAndSortAndPageQuery,
  });

  //headerRows
  const headers = [
    { uid: "id", name: "#", sortable: true },
    { uid: "roleName", name: "Role name", sortable: true },
    { uid: "createdAt", name: "Created at", sortable: true },
    { uid: "updatedAt", name: "Updated at", sortable: false },
    { uid: "actions", name: "actions", sortable: false },
  ];

  //defaultHeaders
  const INITIAL_VISIBLE_COLUMNS = ["id", "roleName", "createdAt", "updatedAt", "actions"];

  //Actions
  const actions = useMemo(
    () => [
      {
        id: "rowDetails",
        name: "View",
        icon: <FaEye className="text-lg" />,
        content: (row) => <ViewRole role={row} />,
        permissions: ["view_role"],
      },
      {
        id: "edit",
        name: "update",
        icon: <MdEdit className="text-lg text-blue-color-primary" />,
        to: (id) => `/admin/roles/${id}`,
        permissions: ["update_role"],
      },
      {
        id: "delete",
        name: "delete",
        icon: <MdDelete className="text-lg text-red-color-primary" />,
        permissions: ["delete_role"],
      },
    ],
    []
  );

  //addRow
  const addRow = {
    to: `/admin/roles/create`,
    permission: can('create_role'),
  };

  //formatting Data
  const reformattedData = roles?.data?.map((role) => {
    const {
      id,
      attributes: { name: roleName, updatedAt, createdAt, teamId },
      relationships: { permissions }
    } = role;

    return {
      id,
      roleName,
      updatedAt,
      createdAt,
      teamId,
      permissions
    };
  });

  const renderCell = useCallback(
    (row, columnKey) => {
      const cellValue = row?.[columnKey];
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
                {actions?.map((action) =>
                  row?.roleName === "super_admin" ? null : action.id === "edit" ? (
                    <button
                      onClick={() => navigate(action.to(row.id), { state: row })}
                      key={action.id}
                    >
                      {action.icon}
                    </button>
                  ) : canAll(action.permissions) && (
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
                            onConfirm={() => deleteRole({ roleId: row?.id })}
                            disabled={isDeleting}
                            resourceName={row?.roleName}
                          />
                        ) : null}
                      </Modal.Window>
                    </React.Fragment>
                  )
                )}
              </Modal>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [actions, isDeleting, canAll, navigate, deleteRole]
  );

  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));

  const totalPages = Math.ceil(roles?.meta?.total / roles?.meta?.per_page);

  return (
    <>
      <Table
        isloading={isPending}
        rows={reformattedData}
        headers={headers}
        visibleColumns={visibleColumns}
        renderCell={renderCell}
        topContent={
          <HeaderContent
            visibleColumns={visibleColumns}
            setSearchValue={setSearchValue}
            placeholder="Search with ID or Role name"
            setVisibleColumns={setVisibleColumns}
            headers={headers}
            rowsNumber={perPage}
            setRowsNumber={setPerPage}
            addRow={addRow}
            totalRows={roles?.meta?.total}
            modalWidth="w-full md:w-[90%] lg:w-1/2"
          />
        }
        bottomContent={<FooterContent totalPages={totalPages} />}
      />
    </>
  );
}
export default RolesTable;
