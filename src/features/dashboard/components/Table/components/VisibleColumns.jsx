import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { FaChevronDown } from "react-icons/fa"

function VisibleColumns({ visibleColumns, setVisibleColumns, headers }) {
    return (
        <Dropdown>
            <DropdownTrigger className="flex">
                <Button
                    endContent={<FaChevronDown className="text-small" />}
                    size="md"
                    variant="flat"
                    className="font-medium text-md text-blue-color-primary"
                >
                    Columns
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Table visible Columns"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={visibleColumns}
                onSelectionChange={setVisibleColumns}
            >
                {headers.map((header) => (
                    <DropdownItem key={header.uid} className="capitalize">
                        {header.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default VisibleColumns