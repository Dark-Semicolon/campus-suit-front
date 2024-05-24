import { useParams, useSearchParams } from "react-router-dom";

import { parseSearchParams } from "@/utils/helpers";
import { useState } from "react";
import { CheckboxGroup, Spinner } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { useRoles } from "../../roles/hooks/useRoles";

function RolesForm({ setSelectedRoles, selectedRoles }) {
  const { universityId, facultyId } = useParams();

  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const page = parseSearchParams(searchParams, "page", (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)), 1);

  const { roles, isPending } = useRoles({
    universityId,
    facultyId,
    page,
    searchValue,
  });

  const totalPages = Math.ceil(roles?.meta?.total / roles?.meta?.per_page);
  return (
    <section className="flex flex-col items-center justify-center">
      <Search setSearchValue={setSearchValue} placeholder="Search With Role Name" />

      {!isPending ? (
        <div className="flex flex-col items-center justify-center w-full gap-2 py-10 ">
          <CheckboxGroup className="gap-1" label="Select Roles" orientation="horizontal" value={selectedRoles} onChange={setSelectedRoles}>
            <div className="flex flex-wrap w-full gap-3 py-5">
              {roles.data.map((role) => {
                return (
                  <CustomCheckbox key={role.id} value={role.id}>
                    <span className="block py-2">
                      {role?.attributes?.name} {role.id}#
                    </span>
                  </CustomCheckbox>
                );
              })}
            </div>
          </CheckboxGroup>
          <p className="text-default-500 text-small">Roles Selected: {selectedRoles.join(", ")}</p>
        </div>
      ) : (
        <div className="py-5 mx-auto">
          <Spinner color="primary" />
        </div>
      )}

      {totalPages > 1 && !isPending && <Pagination total={totalPages} className="mx-auto w-fit" />}
    </section>
  );
}

export default RolesForm;
