import GetUserData from "./GetUserData";
import Search from "../../../../components/Search";
import { useState } from "react";
import RolesForm from "./RolesForm";
import PermissionsForm from "./PermissionsForm";

import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import Button from "./../../../../components/Button";
import toast from "react-hot-toast";
import { useUpdateUserPermissions } from "../hooks/useUpdateUserPermissions";
import { useAddUserRoles } from "../hooks/useAddUserRoles";

function AssociateForm() {
  const [searchValue, setSearchValue] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { addUserRoles, isAdd } = useAddUserRoles();
  const { updateUserPermissions, isUpdate } = useUpdateUserPermissions();

  const handleComplete = () => {
    if (selectedRoles.length && userId)
      addUserRoles(
        { roles: selectedRoles, userId },
        {
          onSuccess: () => { },
        }
      );

    if (selectedPermissions.length && userId)
      updateUserPermissions(
        { permissions: selectedPermissions, userId },
        {
          onSuccess: () => { },
        }
      );
  };

  return (
    <section className="lg:w-[80%] mx-auto pt-20">
      <FormWizard
        shape="circle"
        color="#FFAA00"
        stepSize="sm"
        onComplete={handleComplete}
        backButtonTemplate={(handelBack) => (
          <Button type="primary" onClick={handelBack}>
            السابق
          </Button>
        )}
        nextButtonTemplate={(handleNext) => (
          <Button type="primary" onClick={handleNext}>
            التالي
          </Button>
        )}
        finishButtonTemplate={(handleComplete) => (
          <Button
            type="primary"
            onClick={handleComplete}
            disabled={isUpdate || isAdd}
          >
            حفظ
          </Button>
        )}
      >
        <FormWizard.TabContent title="أختيار الحساب" icon="ti-user">
          <div className="flex flex-col items-center justify-center gap-14 min-h-36">
            <Search
              placeholder={"يمكنك البحث عن طريق الأيميل او الأسم او ال ID"}
              setSearchValue={setSearchValue}
            />
            {searchValue && (
              <GetUserData
                searchValue={searchValue}
                setUserId={setUserId}
                userId={userId}
              />
            )}
          </div>
        </FormWizard.TabContent>

        <FormWizard.TabContent
          title="الأدوار"
          icon="ti-settings"
          isValid={userId}
          validationError={() => toast.error("يجب اختيار المستخدم أولا")}
        >
          <RolesForm
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
          />
        </FormWizard.TabContent>

        <FormWizard.TabContent title="الصلاحيات" icon="ti-check">
          <PermissionsForm
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
        </FormWizard.TabContent>
      </FormWizard>
      <style>
        {`@import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                
                .wizard-card-footer{
                    display: flex;
                    justify-content: space-between;
                    gap: 40px;
                }
                
                .clearfix::after {
                  left:0
                  content: none !important;
                }

                .react-form-wizard{
                    background-color: #fff;
                    border-radius: 31px;
                    padding: 20px 0;    
                }
                .wizard-progress-bar{
                    float: right !important;
                }
                
                `}
      </style>
    </section>
  );
}

export default AssociateForm;
