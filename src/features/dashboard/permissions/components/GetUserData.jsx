import { useUsers } from './../../members/hooks/useUsers';
import { RadioGroup, Radio, cn, User, Spinner } from "@nextui-org/react";

function GetUserData({ searchValue, setUserId, userId }) {

    const { users, isPending } = useUsers({ searchValue, perPage: 5 })

    if (isPending) return (
        <div className='py-5 mx-auto'>
            <Spinner color='warning' />
        </div>
    )

    return (
        <RadioGroup value={userId} onValueChange={(e) => setUserId(e)} description="قم بإختيار الحساب الذي سوف يضاف له الصلاحيات">
            {users?.data?.map(user => {
                return (<Radio
                    key={user.id}
                    value={user.id}

                    classNames={{
                        base: cn(
                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                            "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary"
                        ),
                    }}>
                    <User
                        avatarProps={{
                            radius: "full",
                            size: "sm",
                            src: user?.attributes?.image,
                        }}
                        classNames={{
                            description: "text-default-500",
                        }}
                        description={user?.attributes?.email}
                        name={user?.attributes?.name}
                    >
                        {user?.attributes?.email}
                    </User>
                </Radio>
                )
            })}

        </RadioGroup>
    )
}

export default GetUserData


