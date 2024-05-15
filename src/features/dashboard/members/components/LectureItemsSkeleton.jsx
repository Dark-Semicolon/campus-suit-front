import { Skeleton } from "@mui/material"

function LectureItemsSkeleton() {
    return (
        <div className="flex flex-wrap items-center pt-16 pb-10 justify-evenly gap-y-8 gap-x-3" >
            <Skeleton variant="rounded" height={275} width={298} />
            <Skeleton variant="rounded" height={275} width={298} />
            <Skeleton variant="rounded" height={275} width={298} />
            <Skeleton variant="rounded" height={275} width={298} />
        </div >
    )
}

export default LectureItemsSkeleton