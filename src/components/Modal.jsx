import { HiX } from "react-icons/hi";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useOutSideClick from "../hooks/useClickOutside";

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = (name) => setOpenName(name);

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens: openWindowName }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);

    const ref = useOutSideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <div className="fixed top-0 left-0 z-[1300] w-full h-full transition-all duration-500 bg-opacity-50 backdrop-blur">
            <div
                className="fixed w-[95%] px-5 py-12 max-h-[80%] overflow-scroll transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg lg:w-fit md:p-12 top-1/2 left-1/2 dark:bg-gray-900"
                ref={ref}
            >
                <button
                    onClick={close}
                    className="absolute p-1 transition-all duration-200 transform translate-x-2 bg-transparent border-none rounded-sm top-3 right-6 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                    <HiX className="text-3xl" />
                </button>

                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
