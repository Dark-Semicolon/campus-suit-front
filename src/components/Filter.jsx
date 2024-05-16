import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaChevronDown, FaFilter } from "react-icons/fa"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"

function Filter({ filterOptions }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        // Function to parse URL parameters and extract filter values
        const parseFiltersFromUrl = () => {
            const params = new URLSearchParams(location.search);
            const filters = [];

            filterOptions.forEach((filter) => {
                const paramName = `filter[${filter.field}]`;
                if (params.has(paramName)) {
                    const paramValue = params.get(paramName);
                    filters.push(paramValue);
                }
            });

            setSelectedFilters(filters);
        };

        parseFiltersFromUrl();
    }, [filterOptions]);


    function handleFilterChange(selectedValues) {
        setSelectedFilters(selectedValues);

        const newSearchParams = new URLSearchParams(searchParams);

        // Clear existing filter parameters for the selected field
        filterOptions.forEach((filter) => {
            newSearchParams.delete(`filter[${filter.field}]`);
        });

        // Add selected filter parameters
        selectedValues.forEach((selectedValue) => {
            filterOptions.forEach((filter) => {
                if (selectedValue === filter.value) {
                    newSearchParams.set(`filter[${filter.field}]`, selectedValue);
                }
            });
        });

        // If the current page is greater than 1, set it to 1
        if (newSearchParams.get('page') > 1) {
            newSearchParams.set('page', 1);
        }

        setSearchParams(newSearchParams);
    }

    return (
        <Dropdown>
            <DropdownTrigger className="flex">
                <Button
                    endContent={<FaChevronDown className="text-small" />}
                    size="md"
                    variant="flat"
                    className="font-medium text-md text-blue-color-primary"
                >
                    <FaFilter />
                    Filter
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Table filter options"
                closeOnSelect={true}
                selectionMode="multiple"
                defaultSelectedKeys={selectedFilters}
                onSelectionChange={(value) => handleFilterChange(value)}
            >
                {
                    filterOptions?.map((filter) => {
                        return <DropdownItem key={filter.value} value={filter.value}>{filter.name}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </Dropdown>
    )
}

export default Filter