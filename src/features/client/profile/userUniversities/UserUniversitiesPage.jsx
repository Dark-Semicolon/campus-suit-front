import { useSearchParams } from "react-router-dom";
import { HiOutlineVideoCamera } from "react-icons/hi";

import Pagination from "@/components/Pagination";
import HeroLinks from "@/components/HeroLinks";

import { parseSearchParams } from "@/utils/helpers";
import { useUserUniversities } from "./hooks/useUserUniversities";
import LoaderPage from "@/components/LoaderPage";
import UniCard from "./components/UniCard";
import CreateButton from "@/components/CreateButton";
import CreateUniversity from "./components/CreateUniversity";

function UserUniversitiesPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const perPage = 5;

    const page = parseSearchParams(searchParams, "page", (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)), 1);

    const { userUniversities, isPending } = useUserUniversities({
        perPage,
        page,
    });
    if (isPending) return <LoaderPage />;

    const totalPages = Math.ceil(userUniversities?.meta.total / userUniversities?.meta.per_page);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="pt-3 pb-10 space-y-5">
                <h2 className="text-xl md:text-3xl text-blue-color-primary">
                    My<span className="text-blue-color-light"> Universities</span>
                </h2>
                <HeroLinks
                    pages={[
                        { name: "My Universities", link: `user/Universities` },
                        { name: "Home", link: "/" },
                        { name: "Profile", link: "/user/profile" },
                    ]}
                />
                <div className="py-5">
                    <CreateButton addRow={<CreateUniversity />} />
                </div>
            </div>
            {userUniversities?.data?.length ? (
                <div className="flex flex-wrap gap-6">
                    {userUniversities?.data?.map(university => <UniCard university={university} key={university?.id} />)}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 h-dvh">
                    <span>
                        <HiOutlineVideoCamera className="text-4xl" />
                    </span>
                    <div>
                        <p className="text-2xl font-bold text-blue-color-primary">You have not purchased any university yet.</p>
                    </div>
                </div>
            )}
            {totalPages > 1 && (
                <div className="flex items-center justify-center mt-5">
                    <Pagination setSearchParams={setSearchParams} page={page} total={totalPages} paginationKey="page" />
                </div>
            )}
        </div>
    );
}

export default UserUniversitiesPage;
