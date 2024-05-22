import { Pagination as PaginationNext } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Pagination({ className, total, paginationKey = "page", data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(paginationKey)
    ? parseInt(searchParams.get(paginationKey), 10) < 1
      ? 1
      : parseInt(searchParams.get(paginationKey), 10)
    : 1;

  const isLargeScreen = useMediaQuery({ minWidth: 768 });

  const handleChange = (newPage) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(paginationKey, newPage);

    const paramsObject = Object.fromEntries(searchParams.entries());

    setSearchParams(paramsObject, { state: data });
  };

  return (
    <PaginationNext
      showControls
      total={total}
      initialPage={parseInt(page, 10)}
      page={parseInt(page, 10)}
      onChange={handleChange}
      color="primary"
      size={isLargeScreen ? "lg" : "sm"} // Use "md" on large screens, "sm" otherwise
      isCompact
      boundaries={0}
      siblings={1}
      className={`${className}`}
    />
  );
}

export default Pagination;
