import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import Modal from "@/components/Modal";
import Btn from "@/components/Button";

function CreateButton({ addRow }) {
  if (addRow.to)
    return (
      <Btn type="primary" className="rounded-lg" to={addRow.to}>
        <span className="flex items-center justify-center gap-1">
          Create
          <FaPlus />
        </span>
      </Btn>
    );

  return (
    <Modal>
      <>
        <Modal.Open opens="addRow">
          <Button
            className="text-lg font-medium text-white rounded-lg bg-blue-color-light"
            endContent={<FaPlus />}
            size="md"
          >
            Create
          </Button>
        </Modal.Open>
        <Modal.Window name="addRow">{addRow.row}</Modal.Window>
      </>
    </Modal>
  );
}

export default CreateButton;
