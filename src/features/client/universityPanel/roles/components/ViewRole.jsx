import { Chip } from "@nextui-org/react";
import RowView from "../../components/Table/components/RowView"

function ViewRole({ role }) {
    const { roleName, id, permissions } = role;

    return (
        <div className="" key={id}>
            <RowView
                name='أسم الدور'
                brief={roleName}
                className={"flex"}
            />

            <RowView
                name={"الصلاحيات"}
                brief={
                    <div className="flex flex-wrap gap-4 py-5">
                        {permissions.map(permission =>
                            <Chip
                                key={permission.id}
                                variant="bordered"
                                className="mx-2 text-lg font-semibold text-blue-color-primary"
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