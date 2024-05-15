import DNALoading from "../DNALoading";

function SpinnerFullPage() {
  return (
    <div className="relative z-50 flex items-center justify-center h-screen overflow-hidden ">
      <DNALoading />
    </div>
  );
}

export default SpinnerFullPage;
