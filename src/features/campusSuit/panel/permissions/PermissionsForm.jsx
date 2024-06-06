import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { parseSearchParams } from '@/utils/helpers';

import { Checkbox, CheckboxGroup, Spinner } from "@nextui-org/react";
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';
import { usePermissions } from "./hooks/usePermissions";

function PermissionsForm({ isDisabled = false, setSelectedPermissions, selectedPermissions }) {
  const [searchValue, setSearchValue] = useState('')

  const [searchParams] = useSearchParams();

  const page = parseSearchParams(
    searchParams,
    "page",
    (value) => Math.max(parseInt(value, 10), 1),
    1
  );

  const { permissions, isPending } = usePermissions({ page, perPage: 30, searchValue });

  const totalPages = Math.ceil(permissions?.meta?.total / permissions?.meta?.per_page);

  const groupPermissionsByPostfix = (permissions) => {
    return permissions.reduce((acc, permission) => {
      const postfix = permission.attributes.name.split('_').pop();
      if (!acc[postfix]) {
        acc[postfix] = [];
      }
      acc[postfix].push(permission);
      return acc;
    }, {});
  };

  const groupedPermissions = groupPermissionsByPostfix(permissions?.data || []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPermissions(permissions?.data?.map(p => p.id) || []);
    } else {
      setSelectedPermissions([]);
    }
  };

  const handleSelectGroup = (postfix, e) => {
    const groupPermissions = groupedPermissions[postfix].map(p => p.id);
    if (e.target.checked) {
      setSelectedPermissions(prev => [...new Set([...prev, ...groupPermissions])]);
    } else {
      setSelectedPermissions(prev => prev.filter(id => !groupPermissions?.includes(id)));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-5">

      <Search setSearchValue={setSearchValue} />

      {isPending ? (
        <div className='py-5 mx-auto'>
          <Spinner color='primary' />
        </div>
      ) : (
        <section className="w-full pt-10">
          <Checkbox
            color="primary"
            isSelected={selectedPermissions?.length === permissions?.data?.length}
            onChange={handleSelectAll}
            isDisabled={isDisabled}


          >
            <span className="font-bold text-blue-color-primary">Select All Permissions</span>
          </Checkbox>
          <div className="flex flex-wrap w-full gap-12 py-10">
            {Object.keys(groupedPermissions).map(postfix => (
              <div key={postfix} className="flex flex-col items-start justify-start gap-5 py-5">
                <Checkbox
                  color="primary"
                  isSelected={groupedPermissions[postfix].every(p => selectedPermissions?.includes(p.id))}
                  onChange={(e) => handleSelectGroup(postfix, e)}
                  isDisabled={isDisabled}
                  className="font-semibold capitaliz"
                >
                  Select All {postfix} Permissions
                </Checkbox>
                <CheckboxGroup
                  className="gap-10"
                  orientation="vertical"
                  value={selectedPermissions}
                  onChange={setSelectedPermissions}
                >
                  {groupedPermissions[postfix].map(permission =>
                    <Checkbox
                      key={permission.id}
                      color="primary"
                      value={permission.id}
                      isDisabled={isDisabled}
                    >
                      <span>{permission.attributes.name}</span>
                    </Checkbox>)}
                </CheckboxGroup>
              </div>
            ))}
          </div>
        </section>
      )}
      {(totalPages > 1 && !isPending) && (
        <Pagination total={totalPages} className='mx-auto w-fit' />
      )}
    </section>
  );
}

export default PermissionsForm;
