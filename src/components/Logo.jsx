import { Image } from "@nextui-org/react"

function Logo({ width = '200' }) {
    return (
        <div className="w-fit">
            <Image src="/images/logo/logo2.svg" alt="website Logo" width={width} height={'auto'} loading="lazy" decoding="async" />
        </div>
    )
}

export default Logo