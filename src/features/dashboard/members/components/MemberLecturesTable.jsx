import { useCallback, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Table from "../../components/Table/Table";
import FooterContent from "../../components/Table/components/FooterContent";
import HeaderContent from "../../components/Table/components/HeaderContent";
import { Chip } from "@nextui-org/react";
import { convertURLParams, formatDateTime, parseSearchParams } from "@/utils/helpers";
import { useUserLectures } from "../hooks/useUserLectures";
import { formatCurrency, secondsToTime } from './../../../../utils/helpers';

function MemberLecturesTable() {

    const { search } = useLocation()
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const { userId } = useParams();
    const navigate = useNavigate()


    const page = parseSearchParams(
        searchParams,
        "page",
        (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
        1
    );


    const include = { field: "VideosDuration", value: "true" }

    const filterAndSortAndPageQuery = convertURLParams(search);

    const { userLectures, isPending } = useUserLectures({ userId, filterAndSortAndPageQuery, include, page, perPage, searchValue })

    //headerRows
    const headers = [
        { uid: "id", name: "#", sortable: true },
        { uid: "name", name: "الاسم", sortable: true },
        { uid: "visibility", name: "الحاله", sortable: true },
        { uid: "price", name: "السعر", sortable: true },
        { uid: "videosDuration", name: "مجموع الساعات", sortable: true },
        { uid: "courseId", name: "رقم الوحد", sortable: true },
        { uid: "createdAt", name: "وقت الإنشاء", sortable: true },
        { uid: "updatedAt", name: "اخر تحديث", sortable: true },
    ];

    //defaultHeaders
    const INITIAL_VISIBLE_COLUMNS = [
        "id",
        "name",
        "visibility",
        "price",
        "videosDuration",
        "courseId",
        "createdAt",
        "updatedAt",
    ];


    //formatting Data for the data
    const reformattedData = userLectures?.data?.map((item) => {
        const { id, attributes, videosDuration } = item;
        return {
            id,
            ...attributes,
            videosDuration: secondsToTime(videosDuration)
        };
    });

    const renderCell = useCallback(
        (row, columnKey) => {
            const cellValue = row?.[columnKey];
            switch (columnKey) {

                case "price":
                    return cellValue !== 0 ? (
                        <span className="text-green-700">{formatCurrency(cellValue)}</span>
                    ) : (
                        <span className="text-green-700">ببلاش</span>
                    );
                case "visibility":
                    return (
                        <Chip
                            className="gap-1 capitalize border-none text-default-600"
                            color={row.visibility ? "success" : "warning"}
                            size="sm"
                            variant="dot"
                        >
                            {cellValue == 1 ? "مفعل" : "غير مفعل"}
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

                default:
                    return cellValue;
            }
        },
        []
    );

    const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));

    const totalPages = Math.ceil(userLectures?.meta?.total / userLectures?.meta?.per_page);

    return (
        <Table
            isloading={isPending}
            rows={reformattedData}
            headers={headers}
            visibleColumns={visibleColumns}
            renderCell={renderCell}
            selectionMode="single"
            onSelectionChange={(rowData) => {
                const selectedRowData = reformattedData?.find(row => row.id == rowData.currentKey);
                if (selectedRowData) {
                    navigate(`/admin/members/${userId}/courses/${selectedRowData?.courseId}/lectures/${selectedRowData.id}`);
                }
            }}
            topContent={
                < HeaderContent
                    headers={headers}
                    rowsNumber={perPage}
                    setRowsNumber={setPerPage}
                    setSearchValue={setSearchValue}
                    placeholder="يمكنك البحث بأسم الحصة او الوصف او ID"
                    totalRows={userLectures?.meta?.total}
                />
            }
            bottomContent={< FooterContent totalPages={totalPages} />}
        />
    )
}

export default MemberLecturesTable