import { useState } from "react"
import Button from "../../../../components/Button"
import { useUpdateVideoView } from "../hooks/useUpdateVideoView"
import usePermission from "../../../../hooks/usePermission"
import { useUserWatchedVideos } from "../hooks/useUserWatchedVideos"

function VideoDetail({ myViews, userId, maxViews, videoId }) {
    const [startEdit, setStartEdit] = useState(false)
    const [maxViewCount, setMaxViewCount] = useState(0)
    const { can } = usePermission()


    const { updateVideoView, isUpdating } = useUpdateVideoView()

    const filter = { field: 'lectureVideoId', value: videoId }


    const { userWatchedVideos, isPending } = useUserWatchedVideos({ userId, filter })

    const WatchedVideoId = userWatchedVideos?.data[0]?.id;

    function handelChange(e) {
        if (maxViewCount !== e.target.value)
            setMaxViewCount(e.target.value)
    }


    function onSubmit() {
        updateVideoView({ userId, WatchedVideoId, max_view_count: maxViewCount }, {
            onSuccess: () => {
                setStartEdit(false)
            }
        })

    }

    if (isPending) return <p>Loading...</p>
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="space-y-5">
                <p>
                    - عدد المرات التي شوهدت :<span className="px-1 text-gray-color-primary">{myViews}</span>
                </p>
                <div>
                    <label>
                        - أقصي حد للمشاهدة :
                    </label>
                    <input
                        className={`mx-3 mt-3 leading-7 text-center border-2 rounded-lg outline-none w-14 border-gray-color-primary focus:border-yellow-color-primary ${!startEdit && 'bg-gray-300'}`}
                        defaultValue={maxViews} type="number"
                        disabled={!startEdit || isUpdating}
                        onChange={handelChange}
                    />
                </div>
            </div>
            {!startEdit && WatchedVideoId && can('update:course:lecture:video:views') && <Button type='primary' onClick={() => setStartEdit(true)} disabled={isUpdating}>
                تعديل
            </Button>}
            {startEdit && WatchedVideoId && can('update:course:lecture:video:views') && <Button type='primary' onClick={onSubmit} disabled={isUpdating}>
                حفظ التعديل
            </Button>}
        </div>
    )
}

export default VideoDetail