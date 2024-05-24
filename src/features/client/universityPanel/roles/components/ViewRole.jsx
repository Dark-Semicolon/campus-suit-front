import { Chip } from "@nextui-org/react";
import RowView from "@/components/Table/components/RowView"

function ViewRole({ role }) {
    const { roleName, id, permissions } = role;

    return (
        <div className="" key={id}>
            <RowView
                name='Role Name '
                brief={roleName}
                className={"flex font-semibold"}
            />

            <RowView
                name={"permissions"}
                brief={
                    <div className="flex flex-wrap gap-4 py-5">
                        {permissions.map(permission =>
                            <Chip
                                key={permission.id}
                                variant="bordered"
                                className="py-4 mx-2 text-lg font-bold text-blue-color-primary"
                            >
                                {permission.attributes.name}
                            </Chip>)}
                    </div>
                }
            />
        </div>
    )
}

export default ViewRole