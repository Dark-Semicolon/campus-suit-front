import { Skeleton, Stack } from "@mui/material";
import HeroLinks from "./HeroLinks";

function Hero({ title, description, pagesLinks, isLoading }) {
  return (
    <section className="py-3 bg-center bg-cover px-7 bg-hero bg-blue-color-dark">
      <div className="container flex items-center justify-between mx-auto h-[400px]">
        <div className="flex flex-col gap-5 mt-10">
          {isLoading && (
            <>
              <Stack
                spacing={1}
                className="w-full"
                sx={{
                  "& .MuiSkeleton-root": {
                    bgcolor: "#818181",
                  },
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  className="w-[200px] md:w-[200px] lg:w-[300px"
                />
              </Stack>
              <Stack
                spacing={1}
                className="w-full"
                sx={{
                  "& .MuiSkeleton-root": {
                    bgcolor: "#818181",
                  },
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  className="w-[120px] md:w-[150px] lg:w-[100px]"
                />
              </Stack>
              <Stack
                spacing={1}
                className="w-full"
                sx={{
                  "& .MuiSkeleton-root": {
                    bgcolor: "#818181",
                  },
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  className="w-[250px] md:w-[250px] lg:w-[350px]"
                />
              </Stack>
            </>
          )}
          {!isLoading && (
            <>
              <HeroLinks pages={pagesLinks} isHero={true} />
              <h2 className="mt-4 text-3xl text-yellow-color-primary">
                {title}
              </h2>
              <h3 className="text-3xl text-white">{description}</h3>
            </>
          )}
        </div>
        <img
          src="/images/courses/teacherImage.png"
          className="w-[470px] self-end hidden md:block"
          alt="teacher avatar image"
          decoding="async"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default Hero;
