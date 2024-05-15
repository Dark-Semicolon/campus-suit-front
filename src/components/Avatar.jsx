import { Avatar } from "@nextui-org/react"

function AvatarComponent({ image }) {
    return (
        <Avatar isBordered radius="full" src={image || 'https://i.pravatar.cc/150?u=a04258114e29026302d'} />

    )
}

export default AvatarComponent