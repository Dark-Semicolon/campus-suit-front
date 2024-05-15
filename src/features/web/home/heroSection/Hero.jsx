import { HiChevronDown } from "react-icons/hi2";
import SpecialButton from "@/components/specialButton/SpecialButton";
import styles from "./Hero.module.css";

function Hero() {
  // Scroll To botton function
  function handleClick() {
    const screenHeight = window.innerHeight;
    window.scrollTo({
      top: screenHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      {/* Disktop viwe  */}
      <section
        className={`relative hidden md:flex w-full overflow-hidden h-screen md:h-[750px] 2xl:h-[800px] justify-between bg-blue-color-dark ${styles.Hero}`}
        aria-label="Hero section"
      >
        <div className="flex flex-col items-start justify-center text-white ps-3 lg:ps-28">
          <h2 className="text-4xl">مــــستر محمد توفيق 👋</h2>
          <p className="pt-5 text-lg w-72 text-wrap text-gray-color-light">
            مدرس أول في مادة الأحياء للمرحلة الثانوية و حاصل علي بكالوريوس
            العلوم و التربية
          </p>
          <div className="mt-10">
            <SpecialButton>احجز الأن</SpecialButton>
          </div>
        </div>
        <div className="relative top-48 lg:top-0">
          <img
            src="/images/home/hero/teacher.svg"
            alt="teacher image"
            className="lg:w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
        <button
          className="absolute p-2 border-2 rounded-xl bottom-14 right-1/2"
          aria-label="button for scrolling down in the website"
          onClick={handleClick}
        >
          <HiChevronDown
            color="white"
            size={"25px"}
            className="font-medium animate-bounce"
          />
        </button>
      </section>

      {/* Mobile viwe  */}
      <section
        className={`md:hidden w-full  overflow-hidden h-screen min-h-[760px] flex flex-col justify-end items-start ps-5 bg-blue-color-dark ${styles.HeroMobile}`}
      >
        <div className="flex flex-col items-start w-full text-white">
          <div className="text-center h-[20px]">
            <h2 className="text-2xl">مــــستر محمد توفيق 👋</h2>
            <p className="w-64 pt-3 text-base text-wrap text-gray-color-light">
              مدرس أول في مادة الأحياء للمرحلة الثانوية و حاصل علي بكالوريوس
              العلوم و التربية
            </p>
            <div className="mt-6">
              <SpecialButton>
                <span className="font-semibold text-blue-color-primary">
                  احجز الأن
                </span>
              </SpecialButton>
            </div>
          </div>

          <div className="relative flex self-end justify-end top-5">
            <img
              src="/images/home/hero/teacher.svg"
              width={"100%"}
              className="w-72"
              alt="teacher image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
