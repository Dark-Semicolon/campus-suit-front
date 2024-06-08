import ProfileHeader from "@/components/ProfileHeader";
import { FaCrown } from "react-icons/fa";

function AdminView({ data }) {
  const { id, name, image, email, status, roles, permissions } = data;

  console.log(roles, permissions);
  return (
    <div className="flex flex-col gap-3 md:min-w-[450px]">
      <ProfileHeader image={image} name={name} email={email} id={id} status={status} />

      <section className="pt-5">
        <div className="flex flex-col justify-start w-full gap-2 mb-6" >
          <span className="text-xl font-semibold text-blue-color-primary">Roles:</span>
          <div className="flex flex-wrap items-center gap-3 pt-3 ms-5">
            {roles.length ? roles?.map((role, index) => (
              <div className="flex items-center gap-2 px-4 py-1 font-bold border-2 rounded-xl bg-yellow-color-light" key={index}>
                <span>
                  <FaCrown className="text-md text-yellow-color-primary" />
                </span>
                {role.attributes.name}
              </div>
            )) : <p className="italic ps-10">Not have any roles</p>}
          </div>
        </div>
        <div className="flex flex-col justify-start w-full gap-2" >

          <span className="text-xl font-semibold text-blue-color-primary">Permissions:</span>
          <div className="flex flex-wrap items-center gap-3 pt-5 ms-5">
            {permissions.length ? permissions?.map((permission, index) => (
              <div className="flex items-center gap-2 px-4 py-1 font-bold border-2 rounded-xl bg-yellow-color-light" key={index}>
                <span>
                  <FaCrown className="text-md text-yellow-color-primary" />
                </span>
                {permission.attributes.name}
              </div>
            )) : <p className="italic ps-10">Not have any permissions</p>
            }
          </div>
        </div>
      </section>

    </div>
  );
}

export default AdminView;
