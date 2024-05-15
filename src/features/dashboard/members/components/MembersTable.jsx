import React, { useCallback, useState } from "react";
import { useMemo } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import { Chip, User } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { useUsers } from "../hooks/useUsers";

import {
  convertURLParams,
  formatDateTime,
  parseSearchParams,
} from "@/utils/helpers";

import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";
import Table from "../../components/Table/Table";
import HeaderContent from "../../components/Table/components/HeaderContent";
import FooterContent from "../../components/Table/components/FooterContent";
import CreateMemberForm from "./CreateMemberForm";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUser } from "../../../authentication/hooks/useUser";
import EditMemberForm from "./EditMemberForm";

import ViewMemberInfo from "./ViewMemberInfo";
import usePermission from "../../../../hooks/usePermission";
import { STORAGE_LINK } from "../../../../utils/constants";

function MembersTable() {
  const [studentCheck, setStudentCheck] = useState(false);

  const { search } = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const [perPage, setPerPage] = useState(10);
  const [searchParams] = useSearchParams();

  const { canAll, can } = usePermission();


  const includeFields = ["roles", "studentData", 'permissions'];
  const fields = [
    "id",
    "name",
    "email",
    "image",
    "status",
    "email_verified_at",
  ];

  const page = parseSearchParams(
    searchParams,
    "page",
    (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
    1
  );

  const filterAndSortAndPageQuery = convertURLParams(search);

  //Hooks

  //Get Users
  const { users, isPending } = useUsers({
    fields,
    includeFields,
    perPage,
    page,
    searchValue,
    filterAndSortAndPageQuery,
  });

  //Delete Users
  const { deleteUser, isDeleting } = useDeleteUser();

  //Get User
  const { user } = useUser();

  //Filter Options
  const filterOptions = [
    { name: "نشيط", field: "status", value: "1" },
    { name: "محذور", field: "status", value: "0" },
    { name: "ادمن", field: "admin", value: "admin" },
    { name: "طالب", field: "student", value: "student" },
  ];

  //Header Rows
  const headers = [
    { uid: "id", name: "#", sortable: true },
    { uid: "name", name: "الاسم", sortable: true },
    { uid: "grade", name: "الصف", sortable: false },
    { uid: "email", name: "الايميل", sortable: true },
    { uid: "status", name: "الحاله", sortable: true },
    { uid: "createdAt", name: "وقت الإنشاء", sortable: true },
    { uid: "phone", name: "رقم الهاتف", sortable: false },
    { uid: "actions", name: "الافعال", sortable: false },
  ];

  //Default Headers
  const INITIAL_VISIBLE_COLUMNS = [
    "id",
    "name",
    "email",
    "grade",
    "status",
    "phone",
    "actions",
  ];

  //Actions
  const actions = useMemo(
    () => [
      {
        id: "rowDetails",
        name: "رؤية",
        icon: <FaEye className="text-lg" />,
        content: (row) => <ViewMemberInfo data={row} />,
        permissions: ['read:users']
      },
      {
        id: "edit",
        name: "تعديل",
        icon: <MdEdit className="text-lg text-blue-color-primary" />,
        content: (row) => < EditMemberForm rowData={row} />,
        permissions: ['update:users']
      },
      {
        id: "delete",
        name: "حذف",
        icon: <MdDelete className="text-lg text-red-color-primary" />,
        permissions: ['delete:users']
      },
    ],
    []
  );

  //Add Row
  const addRow = {
    row: (
      <CreateMemberForm
        studentCheck={studentCheck}
        setStudentCheck={setStudentCheck}
      />
    ),
    permission: can('create:users')
  };
  //formatting Data
  const reformattedData = users?.data?.map((item) => {
    const { id, attributes, relationships, ...rest } = item;

    const { studentData, roles, permissions } = relationships || {};

    const personalData = {
      id,
      ...attributes,
      ...studentData?.attributes,
      roles: roles,
      permissions
    };

    return {
      ...rest,
      ...personalData,
    };
  });

  const renderCell = useCallback(
    (row, columnKey) => {
      const cellValue = row?.[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "full",
                size: "sm",
                src: `${STORAGE_LINK}/images/users/${row.image}`,
              }}
              classNames={{
                description: "text-default-500",
              }}
              description={row.email}
              name={cellValue}
            >
              {row?.email}
            </User>
          );

        case "status":
          return (
            <Chip
              className="gap-1 capitalize border-none text-default-600"
              color={row.status ? "success" : "warning"}
              size="sm"
              variant="dot"
            >
              {cellValue == 1 ? "مفعل" : "غير مفعل"}
            </Chip>
          );
        case "grade":
          return (
            <p className="text-center w-fit">
              {!cellValue ? <span>&mdash;</span> : cellValue == 1 ? "الثانوي الأول" : cellValue == 2 ? "الثاني الثانوي" : "الثالث الثانوي"}{" "}
            </p>
          );
        case "phone":
          return (
            <p className="text-center w-fit">
              {cellValue ? <span className="font-medium text-gray-color-primary">{cellValue}</span> : <span>&mdash;</span>}
            </p>
          );
        case "createdAt":
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
                    user?.data?.id === row?.id && action.id === "delete" || user?.data?.id === row?.id && action.id === "edit" ?
                      null
                      :
                      canAll(action.permissions) &&
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
                                onConfirm={() => deleteUser(row?.id)}
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
    [actions, isDeleting, user, canAll, deleteUser]
  );

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const totalPages = Math.ceil(users?.meta?.total / users?.meta?.per_page);

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
          totalRows={users?.meta?.total}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder={"يمكنك البحث بالاسم او الايميل او ال ID"}
        />
      }
      bottomContent={<FooterContent totalPages={totalPages} />}
    />
  );
}

export default MembersTable;
