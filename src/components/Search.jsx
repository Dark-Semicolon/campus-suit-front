import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

function Search({ placeholder, setSearchValue }) {
    const [, setSearchParams] = useSearchParams();
    const [value, setValue] = useState('')

    const onSearchChange = useCallback(
        _.debounce((e) => {
            if (e.trim() || e === '') {
                setSearchParams({ page: 1 });
                setSearchValue(e);
            }
        }, 500), // Adjust debounce delay as needed 500 milliseconds
        [setSearchParams, setSearchValue]
    );

    return (
        <Input
            isClearable
            classNames={{
                base: "w-full sm:max-w-[44%] text-black",
                inputWrapper: "border-1",
            }}
            placeholder={placeholder || "Search"}
            size="sm"
            startContent={<FaSearch className="text-default-300 me-2 " />}
            variant="bordered"
            value={value}
            onClear={() => { setSearchValue(""); setValue('') }}
            onValueChange={(e) => { onSearchChange(e); setValue(e) }}
        />
    );
}

export default Search;
