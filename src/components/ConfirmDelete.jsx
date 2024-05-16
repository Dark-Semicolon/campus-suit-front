import Button from "@/components/Button";
import { MdDelete } from "react-icons/md";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex flex-col gap-3 w-96">
      <h4 className="text-lg">
        <span className="flex">
          <MdDelete className="text-xl text-red-color-primary" />
          {resourceName}
        </span>
      </h4>
      <p className="text-gray-500">
        Are you sure you want to delete this permanently?
        <span className="py-1 font-semibold">
          {resourceName}
        </span>
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          type="customized"
          className="px-4 py-2 text-sm font-medium text-gray-500 transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          disabled={disabled}
          onClick={onCloseModal}
        >
          <p className="px-2">Cancel</p>
        </Button>
        <Button
          type="customized"
          className="px-4 py-2 text-sm font-medium text-center text-white transition-all duration-300 bg-red-600 rounded-lg bg-red-color-primarypy-2 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          disabled={disabled}
          onClick={onConfirm}
        >
          <span className="flex">
            <MdDelete className=" text-md text-white-color" />
            <p className="px-2">Delete</p>
          </span>
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
