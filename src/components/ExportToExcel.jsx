import fileDownload from "js-file-download";
import * as XLSX from "xlsx";
import Button from "./Button";
import { FaDownload } from "react-icons/fa6";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);

    // Set the width of the first column to 20
    ws["!cols"] = [{ width: 30 }];

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    fileDownload(data, `${fileName}.${fileExtension}`);
  };

  return (
    <Button
      type="customized"
      className="flex gap-2 p-4 text-center text-white rounded-lg bg-mint-green-color-primary"
      onClick={() => exportToCSV(apiData, fileName)}
      name="download material item button"
    >
      <FaDownload className="text-lg text-white " /> Dowunload
    </Button>
  );
};
