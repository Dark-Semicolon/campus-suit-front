import { useCallback } from "react";
import Filter from "@/components/Filter";
import ClearParamsButton from "@/components/ClearParamsButton";
import VisibleColumns from "./VisibleColumns";
import CreateButton from "./CreateButton";
import ItemPearPage from "./ItemPearPage";
import Search from "@/components/Search";

function HeaderContent({ filterOptions, visibleColumns, setVisibleColumns, headers, totalRows, rowsNumber, setRowsNumber, addRow, searchValue, setSearchValue, placeholder }) {
  const onRowsPerPageChange = useCallback(
    (e) => {
      setRowsNumber(Number(e.target.value));
    },
    [setRowsNumber]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3 py-5">
        {setSearchValue ? <Search searchValue={searchValue} setSearchValue={setSearchValue} placeholder={placeholder} /> : null}
        <div className="flex flex-row flex-wrap gap-3">
          {addRow && addRow.permission && <CreateButton addRow={addRow} />}

          {visibleColumns && <VisibleColumns visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} headers={headers} />}

          {filterOptions && <Filter key="filter" filterOptions={filterOptions} />}

          {filterOptions && <ClearParamsButton />}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold text-blue-color-primary text-md">Total {totalRows || 0} Rows</span>

        <ItemPearPage rowsNumber={rowsNumber} onChange={onRowsPerPageChange} />
      </div>
    </div>
  );
}

export default HeaderContent;
