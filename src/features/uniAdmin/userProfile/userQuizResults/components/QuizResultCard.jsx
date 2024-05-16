import { formatDateTime } from "@/utils/helpers";

function QuizResultCard({ quiz }) {
  const { isSuccess } = quiz;
  const { scorePercentage = 0, createdAt } = quiz.attributes;
  const { name, quizSuccessPercentage } = quiz.relationships.quiz.attributes;
  const lectureName = quiz?.relationships?.quiz?.relationships?.lecture?.attributes?.name;

  return (
    <div className="flex flex-col justify-between gap-4 p-8 bg-white rounded-lg w-full max-w-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <p className="w-full p-3 font-semibold rounded-lg text-md text-blue-color-primary bg-yellow-color-light">
        {lectureName} : {name}
      </p>
      <p
        className={`text-lg text-blue-color-light ${isSuccess ? "text-mint-green-color-primary" : "text-red-color-primary"
          }`}
      >
        النتيجة: <span className="font-semibold"> {scorePercentage || 0}%</span>
      </p>
      <p className="text-lg text-blue-color-light">
        درجه النجاح: <span className="font-semibold">{quizSuccessPercentage}%</span>
      </p>
      <p className="text-lg text-blue-color-light">
        تاريخ الامتحان:{" "}
        <span className="font-semibold">
          {formatDateTime(createdAt).formattedDate}
        </span>
      </p>
    </div>
  );
}

export default QuizResultCard;
