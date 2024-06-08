import { LiaUniversitySolid } from "react-icons/lia";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import ProfileHeader from "@/components/ProfileHeader";

function ViewClient({ data }) {
  const { id, name, image, email, status, universitiesCount, facultiesCount, studentsCount, professorsCount } = data;

  return (
    <div className="flex flex-col items-center justify-center gap-3">

      <ProfileHeader image={image} name={name} email={email} id={id} status={status} />

      <span className="self-center block h-1 rounded-lg w-36 bg-blue-color-light"></span>

      <main className="grid grid-cols-2 justify-items-center gap-8 min-w-[450px] p-5">
        <div className="flex gap-2">
          <LiaUniversitySolid className="text-2xl text-blue-color-primary" />
          <span className="font-semibold text-blue-color-primary">Universities: </span>
          <span>{universitiesCount}</span>
        </div>
        <div className="flex gap-2">
          <LiaUniversitySolid className="text-2xl text-blue-color-primary" />
          <span className="font-semibold text-blue-color-primary">Faculties: </span>
          <span>{facultiesCount}</span>
        </div>
        <div className="flex gap-2">
          <GiTeacher className="text-2xl text-blue-color-primary" />
          <span className="font-semibold text-blue-color-primary">Professors: </span>
          <span>{professorsCount}</span>
        </div>
        <div className="flex gap-2">
          <PiStudentFill className="text-2xl text-blue-color-primary" />
          <span className="font-semibold text-blue-color-primary">Students: </span>
          <span>{studentsCount}</span>
        </div>
      </main>

    </div>
  );
}

export default ViewClient;
