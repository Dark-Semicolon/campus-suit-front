import { useSearchParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { usePagination, PaginationItemType, cn } from "@nextui-org/react";

function CustomPagination({ linksArrray, setPaginationLink }) {
  const [, setSearchParams] = useSearchParams();
  const { range, setPage, onNext, onPrevious, total } = usePagination({
    total: linksArrray?.last_page,
    showControls: true,
    siblings: 1,
    boundaries: 1,
  });

  const activePage = linksArrray?.current_page || 1;

  function handelNext() {
    if (linksArrray?.current_page <= total) {
      onNext();
      setSearchParams({ page: linksArrray?.current_page + 1 });
      setPaginationLink(linksArrray?.links[linksArrray?.current_page + 1].url);
    }
  }

  function handelPrevious() {
    if (linksArrray?.current_page >= 1) {
      onPrevious();
      setSearchParams({ page: linksArrray?.current_page - 1 });
      setPaginationLink(linksArrray?.links[linksArrray?.current_page - 1].url);
    }
  }

  function handelClick(page) {
    if (page != total || page != 0) {
      setSearchParams({ page: page });
      setPage(page);
      // setPaginationLink(linksArrray?.links[page].url)
      // const filterValues = parseLink(linksArrray?.links[page].url)
      // navigate(`?${filterValues}`)
    }
  }

  // function parseLink(link) {
  //     const queryParams = new URLSearchParams(link.split('?')[1]);
  //     const filter = [];
  //     queryParams.forEach((value, key) => {
  //         if (key.startsWith('filter[')) {
  //             const filterKey = key.slice(7, -1); // Remove 'filter[' and ']'
  //             filter.push(`${filterKey}=${value}`);
  //         }
  //     });
  //     const sort = queryParams.get('sort');
  //     const page = parseInt(queryParams.get('page'), 10) || 1;

  //     const filterText = filter.length > 0 ? `${filter.join('&')}` : '';
  //     const sortText = sort ? `sort=${sort}` : '';
  //     const pageText = `page=${page}`;

  //     const settingsArray = [filterText, sortText, pageText].filter(setting => setting !== '');
  //     return settingsArray.join('&');
  // }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex items-center gap-2">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li
                key={page}
                aria-label="next page"
                className="text-center w-9 h-9"
              >
                <button
                  className="flex items-center justify-center w-full h-full transition-all duration-75 rounded-xl text-small hover:bg-default-200"
                  onClick={handelNext}
                  disabled={activePage === total}
                >
                  <GrFormPrevious className="text-lg" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li
                key={page}
                aria-label="previous page"
                className="text-center w-9 h-9"
              >
                <button
                  className="flex items-center justify-center w-full h-full transition-all duration-75 rounded-xl text-small hover:bg-default-200"
                  onClick={handelPrevious}
                  disabled={activePage === 1}
                >
                  <MdNavigateNext className="text-lg" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li
                key={`${page}-${Math.random()}`}
                className="text-center w-9 h-9 text-gray-color-primary"
              >
                ...
              </li>
            );
          }

          return (
            <li
              key={page}
              aria-label={`page ${page}`}
              className="font-normal w-9 h-9 text-smal"
            >
              <button
                className={cn(
                  "w-full h-full rounded-xl text-small",
                  activePage === page && "bg-blue-color-light",
                  activePage !== page &&
                    "hover:bg-default-200 transition-all duration-75"
                )}
                onClick={() => handelClick(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CustomPagination;
