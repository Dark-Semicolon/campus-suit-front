import { useState } from "react";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Button from "../../../../components/Button";

function QuizDetal({ userId, isSuccess }) {
  const [startEdit, setStartEdit] = useState(false);
  const [maxAttemptsCount, setMaxAttemptsCount] = useState(0);

  function handelMaxAttemptsCountChange(e) {
    if (maxAttemptsCount !== e.target.value)
      setMaxAttemptsCount(e.target.value);
  }
  return (
    <div>
      <div className="flex items-center gap-5 pb-3">
        <p>- نجح في الأختبار :</p>
        {isSuccess ? (
          <span className="p-2 bg-green-500 rounded-full">
            <HiOutlineCheck className="text-lg font-extrabold text-white" />
          </span>
        ) : (
          <span className="inline-block p-1 bg-red-500 rounded-full w-fit">
            <HiOutlineXMark className="text-lg font-extrabold text-white" />
          </span>
        )}
      </div>
      <p>
        - عدد مرات دخول الأمتحان :
        <span className="px-1 text-gray-color-primary">{0}</span>
      </p>
      <div>
        <label>- عدد المرات المتبيقة :</label>
        <input
          className={`mx-3 mt-3 leading-7 text-center border-2 rounded-lg outline-none w-14 border-gray-color-primary focus:border-blue-color-light ${
            !startEdit && "bg-gray-300"
          }`}
          defaultValue={maxAttemptsCount}
          type="number"
          disabled={!startEdit}
          onChange={handelMaxAttemptsCountChange}
        />
      </div>
      {!startEdit && (
        <Button type="primary" onClick={() => setStartEdit(true)}>
          تعديل
        </Button>
      )}
      {startEdit && <Button type="primary">حفظ التعديل</Button>}
    </div>
  );
}

export default QuizDetal;
