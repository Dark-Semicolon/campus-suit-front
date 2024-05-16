import { useParams } from "react-router-dom";
import { HiOutlineCheck } from "react-icons/hi2";
import { FaClipboardQuestion } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import VideoDetail from "./VideoDetail";
import QuizDetal from "./QuizDetal";

import usePermission from "../../../../hooks/usePermission";

function Item({ data }) {
  const { userId } = useParams();

  const { can } = usePermission();

  const {
    attributes: { type, name },
    maxViews,
    myViews,
    isAttended,
    isSuccess,
    relationships: { video },
  } = data;

  return (
    <Card className="w-[298px] h-[275px] pt-3">
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-3">
          {type === "video" && (
            <BiSolidVideos className="text-4xl text-blue-color-light" />
          )}
          {type === "quiz" && (
            <FaClipboardQuestion className="text-4xl text-blue-color-light" />
          )}
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">
              {type === "video" ? "فيديو" : "إختبار"}
            </p>
          </div>
        </div>
        {isAttended ? (
          <span className="p-2 rounded-full bg-blue-color-light">
            <HiOutlineCheck className="text-2xl font-bold text-white" />
          </span>
        ) : (
          <span className="block w-10 h-10 border-2 border-dashed rounded-full border-gray-color-primary"></span>
        )}
      </CardHeader>
      <Divider />
      <CardBody className="text-right">
        {can("read:course:lecture:video:views") && type === "video" && (
          <VideoDetail
            maxViews={maxViews}
            myViews={myViews}
            userId={userId}
            videoId={video?.id}
          />
        )}
        {can("read:course:lecture:quiz:attempts") && type === "quiz" && (
          <QuizDetal isSuccess={isSuccess} userId={userId} />
        )}
      </CardBody>
    </Card>
  );
}

export default Item;
