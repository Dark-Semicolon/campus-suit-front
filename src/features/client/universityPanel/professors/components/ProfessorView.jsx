import ProfileHeader from "@/components/ProfileHeader";

function ProfessorView({ professor }) {
  const { id, name, image, email, status } = professor;
  console.log(professor);
  return (
    <div className="flex flex-col items-center justify-center gap-3 lg:w-[350px]">
      <ProfileHeader id={id} image={image} email={email} status={status} name={name} />
    </div>
  );
}

export default ProfessorView;
