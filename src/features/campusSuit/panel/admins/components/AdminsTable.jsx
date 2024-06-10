import React, { useCallback, useState, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
    convertURLParams,
    formatDateTime,
    parseSearchParams,
} from "@/utils/helpers";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit, MdAdminPanelSettings } from "react-icons/md";
import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import HeaderContent from "@/components/Table/components/HeaderContent";
import FooterContent from "@/components/Table/components/FooterContent";
import { Chip, Image } from "@nextui-org/react";
import { STORAGE_LINK } from "@/utils/constants";
import ConfirmDelete from "@/components/ConfirmDelete";
import { useAdmins } from "../hooks/useAdmins";
import CreateAdmin from "./CreateAdmin";
import UpdateAdmin from "./UpdateAdmin";
import { useDeleteAdmin } from "../hooks/useDeleteAdmin";
import AdminView from "./AdminView";
import usePermission from "@/hooks/usePermission";

function AdminsTable() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const [perPage, setPerPage] = useState(5);
    const [searchParams] = useSearchParams();

    const { can, canAll } = usePermission();

    const page = parseSearchParams(
        searchParams,
        "page",
        (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
        1
    );

    const filterAndSortAndPageQuery = convertURLParams(search);

    const include = ["roles", "permissions"];
    const load = ["policies"];

    // Get Users
    const { admins, isPending } = useAdmins({
        page,
        perPage,
        searchValue,
        include,
        load,
        filterAndSortAndPageQuery,
    });

    // Delete Users
    const { deleteAdmin, isDeleting } = useDeleteAdmin();

    // Filter Options
    const filterOptions = [
        { name: "Active", field: "status", value: "1" },
        { name: "Disabled", field: "status", value: "0" },
    ];

    // Header Rows
    const headers = [
        { uid: "id", name: "#", sortable: true },
        { uid: "image", name: "Image", sortable: false },
        { uid: "name", name: "Admin Name", sortable: true },
        { uid: "email", name: "Email", sortable: true },
        { uid: "status", name: "Status", sortable: true },
        { uid: "createdAt", name: "Created at", sortable: true },
        { uid: "updatedAt", name: "Updated at", sortable: true },
        { uid: "actions", name: "actions", sortable: false },
    ];

    // Default Headers
    const INITIAL_VISIBLE_COLUMNS = [
        "id",
        "image",
        "name",
        "email",
        "status",
        "actions",
    ];

    // Actions
    const actions = useMemo(
        () => [
            {
                id: "view",
                name: "View",
                icon: <FaEye className="text-lg" />,
                content: (row) => <AdminView data={row} />,
                permissions: ["view_admin"],
            },
            {
                id: "update",
                name: "Edit",
                icon: <MdEdit className="text-lg text-blue-color-primary" />,
                content: (row) => <UpdateAdmin data={row} />,
                permissions: ["update_admin"],
            },
            {
                id: "associatePermissions",
                name: "associatePermissions",
                icon: (
                    <MdAdminPanelSettings className="text-lg text-blue-color-primary" />
                ),
                to: (id) => `/admin/admins/${id}/permissions`,
                permissions: [
                    "associateRoles_admin",
                    "associatePermissions_admin",
                    "view_any_role",
                    "view_any_permission",
                ],
            },
            {
                id: "delete",
                name: "Delete",
                icon: <MdDelete className="text-lg text-red-color-primary" />,
                permissions: ["delete_admin"],
            },
        ],
        []
    );

    // Add Row
    const addRow = {
        row: <CreateAdmin />,
        permission: can("create_admin"),
    };

    // Formatting Data
    const reformattedData = admins?.data?.map((item) => {
        const { id, attributes, relationships, policies } = item;
        return {
            id,
            ...attributes,
            policies,
            roles: relationships?.roles,
            permissions: relationships?.permissions,
        };
    });

    const renderCell = useCallback(
        (row, columnKey) => {
            const cellValue = row?.[columnKey];

            switch (columnKey) {
                case "image":
                    return (
                        <Image
                            className="w-[50px] h-[50px] rounded-full object-cover"
                            src={
                                row?.image === null
                                    ? "/images/userPlaceholder.webp"
                                    : `${STORAGE_LINK}/${cellValue}`
                            }
                            loading="lazy"
                        />
                    );

                case "status":
                    return (
                        <Chip
                            className="gap-1 capitalize border-none text-default-600"
                            color={row.status ? "success" : "warning"}
                            size="sm"
                            variant="dot"
                        >
                            {cellValue ? "Active" : "Disabled"}
                        </Chip>
                    );

                case "createdAt":
                    return (
                        <span className="flex flex-col gap-2">
                            <span>
                                {formatDateTime(cellValue).formattedTime}
                            </span>
                            <span>
                                {formatDateTime(cellValue).formattedDate}
                            </span>
                        </span>
                    );
                case "updatedAt":
                    return (
                        <span className="flex flex-col gap-2">
                            <span>
                                {formatDateTime(cellValue).formattedTime}
                            </span>
                            <span>
                                {formatDateTime(cellValue).formattedDate}
                            </span>
                        </span>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center justify-start gap-2">
                            <Modal key={`modal_${row.id}`}>
                                {actions?.map(
                                    (action) =>
                                        canAll(action.permissions) && (
                                            <React.Fragment key={action.id}>
                                                {action.id ===
                                                    "associatePermissions" &&
                                                row.policies[
                                                    "associatePermissions"
                                                ] &&
                                                row.policies["associateRoles"]
                                                    ? canAll(
                                                          action.permissions
                                                      ) && (
                                                          <button
                                                              onClick={() =>
                                                                  navigate(
                                                                      action.to(
                                                                          row.id
                                                                      )
                                                                  )
                                                              }
                                                              key={action.id}
                                                          >
                                                              {action.icon}
                                                          </button>
                                                      )
                                                    : row.policies[
                                                          action.id
                                                      ] && (
                                                          <>
                                                              <Modal.Open
                                                                  opens={
                                                                      action.id
                                                                  }
                                                              >
                                                                  <button>
                                                                      {
                                                                          action.icon
                                                                      }
                                                                  </button>
                                                              </Modal.Open>
                                                              <Modal.Window
                                                                  name={
                                                                      action.id
                                                                  }
                                                              >
                                                                  {action.id ===
                                                                  "view" ? (
                                                                      action.content(
                                                                          row
                                                                      )
                                                                  ) : action.id ===
                                                                    "update" ? (
                                                                      action.content(
                                                                          row
                                                                      )
                                                                  ) : action.id ===
                                                                    "delete" ? (
                                                                      <ConfirmDelete
                                                                          rowData={
                                                                              row
                                                                          }
                                                                          onConfirm={() =>
                                                                              deleteAdmin(
                                                                                  {
                                                                                      adminId:
                                                                                          row.id,
                                                                                  }
                                                                              )
                                                                          }
                                                                          disabled={
                                                                              isDeleting
                                                                          }
                                                                          resourceName={
                                                                              row?.name
                                                                          }
                                                                      />
                                                                  ) : null}
                                                              </Modal.Window>
                                                          </>
                                                      )}
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
        [actions, isDeleting, canAll, navigate, deleteAdmin]
    );

    const [visibleColumns, setVisibleColumns] = useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );

    const totalPages = Math.ceil(admins?.meta?.total / admins?.meta?.per_page);

    return (
        <Table
            isLoading={isPending}
            columnsToCopy={["name", "email"]}
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
                    totalRows={admins?.meta?.total}
                    setSearchValue={setSearchValue}
                    placeholder={"Search with admin name or email.."}
                />
            }
            bottomContent={<FooterContent totalPages={totalPages} />}
        />
    );
}

export default AdminsTable;
