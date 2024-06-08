import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Table as TableUi, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import Tooltip from "../Tooltip";

function Table({ bottomContent, topContent, headers, isLoading, rows, visibleColumns, renderCell, selectionMode = "none", onSelectionChange = () => null, columnsToCopy }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortDescriptor, setSortDescriptor] = useState();

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return headers;

    return headers.filter((column) => Array.from(visibleColumns)?.includes(column.uid));
  }, [visibleColumns, headers]);

  // handel Sorting Function
  function handleSort({ column, direction }) {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentSort = newSearchParams.get("sort") || "";

    const sortKeys = currentSort.split(",");

    const index = sortKeys.findIndex((key) => key.includes(column));

    if (index !== -1) {
      // Remove the existing sort key for the clicked column
      sortKeys.splice(index, 1);
    }

    // Add the new sort key for the clicked column and direction
    sortKeys.unshift(`${direction === "descending" ? "-" : ""}${column}`);

    const updatedSort = sortKeys.join(",");

    newSearchParams.set("sort", updatedSort);

    setSearchParams(newSearchParams);

    // Update the sort descriptor state
    setSortDescriptor({ column, direction });
  }

  const copyRowContents = (row, columnKey) => {
    const valueToCopy = row[columnKey] || "";
    navigator.clipboard
      .writeText(valueToCopy)
      .then(() => {
        toast.success(`${columnKey} is copied`);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  // Define the columns you want to enable copy functionality for
  return (
    <TableUi
      aria-label="Table for data and data operations"
      color="default"
      selectionMode="single"
      onSelectionChange={onSelectionChange}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[700px]",
        th: " rounded-none",
        table: `focus-visible:outline-none ${isLoading && "h-80"}`,
        td: `max-w-72 py-3 ${selectionMode !== "none" && "cursor-pointer"}`,
      }}
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      topContent={topContent}
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSortChange={handleSort}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column?.uid} align={column?.uid === "actions" ? "center" : "start"} allowsSorting={column?.sortable}>
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={isLoading ? null : "No Results"} isLoading={isLoading} loadingContent={<Spinner color="primary" labelColor="primary" />} items={rows || []}>
        {(row) => (
          <TableRow key={row?.id}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnsToCopy?.includes(columnKey) ? (
                  <Tooltip message="Copy">
                    <span onClick={() => copyRowContents(row, columnKey)} style={{ cursor: "pointer" }}>
                      {renderCell(row, columnKey)}
                    </span>
                  </Tooltip>
                ) : (
                  <span>{renderCell(row, columnKey)}</span>
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </TableUi>
  );
}

export default Table;
