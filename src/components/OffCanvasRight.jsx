import { useState, createContext, useContext } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

// Create a context for managing the offcanvas state
const OffcanvasContext = createContext();

const OffcanvasProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <OffcanvasContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </OffcanvasContext.Provider>
  );
};

const useOffcanvas = () => {
  const context = useContext(OffcanvasContext);
  if (!context) {
    throw new Error("useOffcanvas must be used within an OffcanvasProvider");
  }
  return context;
};

const Offcanvas = ({ id, children }) => {
  const { isOpen, toggleOpen } = useOffcanvas();

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center p-4 text-sm font-semibold text-gray-800 border border-transparent rounded-full bg-blue-color-light size-7 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-overlay={`#${id}`}
        onClick={toggleOpen}
      >
        <span className="sr-only">Close modal</span>
        <svg
          className="flex-shrink-0 size-6"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <div
        id={id}
        className={`hs-overlay transition-all duration-300 transform fixed inset-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } right-0 top-0 start-0 max-w-xs w-full z-80 bg-white border-e dark:bg-gray-800 dark:border-gray-700`}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </>
  );
};

const OffcanvasHeader = ({ children }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
      {children}
    </div>
  );
};

const OffcanvasTitle = ({ children }) => {
  return (
    <h3 className="font-bold text-gray-800 dark:text-white">{children}</h3>
  );
};

const OffcanvasBody = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const OffcanvasCloseButton = ({ id }) => {
  const { toggleOpen } = useOffcanvas();

  return (
    <button
      type="button"
      className="flex items-center justify-center text-sm font-semibold text-gray-800 border border-transparent rounded-full size-7 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      data-hs-overlay={`#${id}`}
      onClick={toggleOpen}
    >
      <span className="sr-only">Close modal</span>
      <svg
        className="flex-shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
};

export {
  OffcanvasProvider,
  Offcanvas,
  OffcanvasBody,
  OffcanvasCloseButton,
  OffcanvasTitle,
  OffcanvasHeader,
};
