import Pagination from "@/components/Pagination";

function FooterContent({ totalPages }) {


  return (
    <div className="flex items-center justify-center px-2 py-2">
      {totalPages && totalPages > 1 ? <Pagination
        total={totalPages}
        className="mt-5"
      /> : null}
    </div>
  );
}

export default FooterContent;
