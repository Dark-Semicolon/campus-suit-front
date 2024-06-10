import { useParams, useSearchParams } from "react-router-dom";

import { parseSearchParams } from "@/utils/helpers";
import { useState } from "react";
import { Checkbox, CheckboxGroup, Spinner } from "@nextui-org/react";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { useRoles } from "../../roles/hooks/useRoles";
import { FaCrown } from "react-icons/fa";

function RolesForm({ setSelectedRoles, selectedRoles, isDisabled }) {
    const { universityId, facultyId } = useParams();

    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState("");

    const page = parseSearchParams(
        searchParams,
        "page",
        (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
        1
    );

    const { roles, isPending } = useRoles({
        universityId,
        facultyId,
        page,
        searchValue,
    });

    const totalPages = Math.ceil(roles?.meta?.total / roles?.meta?.per_page);
    return (
        <section className="flex flex-col items-center justify-center py-10">
            <div className="flex justify-center w-full mb-16">
                <Search setSearchValue={setSearchValue} />
            </div>

            {isPending ? (
                <div className="py-5 mx-auto">
                    <Spinner color="primary" />
                </div>
            ) : (
                <CheckboxGroup
                    orientation="horizontal"
                    value={selectedRoles}
                    onChange={setSelectedRoles}
                >
                    {roles?.data?.map((role, index) => (
                        <Checkbox
                            color="primary"
                            value={role.id}
                            isDisabled={isDisabled}
                            className="px-4 py-2 font-bold border-2 me-4 rounded-xl bg-yellow-color-light"
                            key={index}
                        >
                            <div className="flex gap-2">
                                <span>
                                    <FaCrown className="text-xl text-yellow-color-primary" />
                                </span>
                                <span className="text-blue-color-primary">
                                    {role.attributes.name}
                                </span>
                            </div>
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            )}

            {totalPages > 1 && !isPending && (
                <Pagination total={totalPages} className="mx-auto w-fit" />
            )}
        </section>
    );
}

export default RolesForm;
