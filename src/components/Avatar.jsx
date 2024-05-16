import { Avatar } from "@nextui-org/react"

function AvatarComponent({ image }) {
    return (
        <Avatar isBordered radius="full" src={image || 'images/userPlaceholder.png'} />

    )
}

export default AvatarComponent