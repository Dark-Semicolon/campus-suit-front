import { Image } from "@nextui-org/react"

function Logo({ width = '120' }) {
    return (
        <div className="w-fit">
            <Image src="/images/logo/logo.svg" alt="website Logo" width={width} height={'auto'} loading="lazy" decoding="async" disableSkeleton />
        </div>
    )
}

export default Logo