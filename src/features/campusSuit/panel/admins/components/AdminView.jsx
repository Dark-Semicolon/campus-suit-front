import { Chip, Image } from "@nextui-org/react";
import { STORAGE_LINK } from "@/utils/constants";

function AdminView({ data }) {
  const { id, name, image, email, status } = data;
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src={image === null ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/${image}`} className="object-cover w-40 h-40 rounded-full" />
        </div>
        <span className="self-center block h-1 rounded-lg w-36 lg:w-1 lg:h-36 bg-blue-color-light"></span>
        <div className="flex flex-col gap-6 justify-between min-w-[450px] p-5 gap-y-7 gap-x-3">
          <h4 className="text-default-600">
            <span className="pr-1 text-blue-color-primary">name:</span> {name}
          </h4>
          <h4 className="text-default-600">
            <span className="pr-1 text-blue-color-primary">email:</span> {email}
          </h4>
          <h4 className="text-default-600">
            <span className="pr-1 text-blue-color-primary">id:</span> #{id}
          </h4>

          {status && (
            <div>
              <span className="pr-1 font-semibold text-blue-color-primary">Status:</span>
              <Chip className="gap-1 capitalize border-none text-default-600" color={status ? "success" : "warning"} size="md" variant="dot">
                <h4>{status == 1 ? "Active" : "Disabled"}</h4>
              </Chip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminView;
