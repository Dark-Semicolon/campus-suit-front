import { useSearchParams } from "react-router-dom";
import { parseSearchParams } from '@/utils/helpers';
import { Checkbox, CheckboxGroup, Spinner } from "@nextui-org/react";
import Pagination from './../../../../components/Pagination';
import { usePermissions } from "../hooks/usePermissions";
import { usePermissionCategories } from "../hooks/usePermissionCategories";
import permissionsTranslations from './permissionsTranslations.json';

function PermissionsForm({ setSelectedPermissions, selectedPermissions }) {
  const [searchParams] = useSearchParams();
  const page = parseSearchParams(
    searchParams,
    "page",
    (value) => Math.max(parseInt(value, 10), 1),
    1
  );

  const includeFields = ["category", "roles"];

  const { permissions, isPending: isPermissionsPending } = usePermissions({ page, perPage: 30, includeFields });
  const { permissionCategories, isPending: isLoadingCategories } = usePermissionCategories();

  const renderPermissions = () => {
    return permissionCategories.data.map(category => {
      const categoryPermissions = permissions.data.filter(permission => permission.relationships.category.attributes.name === category.attributes.name);
      if (categoryPermissions.length > 0) {
        return (
          <div key={category.id} className="flex flex-col w-full pt-10">
            <p className="text-lg font-bold text-blue-color-primary">{permissionsTranslations[category.attributes.name]?.name} :</p>
            <div className="flex flex-wrap  w-[50%] gap-10 py-5">
              {categoryPermissions.map(permission => (
                <Checkbox
                  key={permission.id}
                  color="warning"
                  value={permission.id}
                >
                  <span className="mx-2">{permissionsTranslations[category.attributes.name].permissions[permission.attributes.name]}</span>
                </Checkbox>
              ))}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  const totalPages = Math.ceil(permissions?.meta?.total / permissions?.meta?.per_page);

  return (
    <section className="flex flex-col items-center justify-center py-5">

      {(isPermissionsPending || isLoadingCategories) ? (
        <div className='py-5 mx-auto'>
          <Spinner color='warning' />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-2 py-10 text-right">
          <CheckboxGroup
            className="gap-1"
            label="قم بإختيار الأدوار"
            orientation="horizontal"
            value={selectedPermissions}
            onChange={setSelectedPermissions}
          >
            {renderPermissions()}
          </CheckboxGroup>
        </div>
      )}
      {(totalPages > 1 && !isLoadingCategories && !isPermissionsPending) && (
        <Pagination total={totalPages} className='mx-auto w-fit' />
      )}
    </section>
  );
}

export default PermissionsForm;
