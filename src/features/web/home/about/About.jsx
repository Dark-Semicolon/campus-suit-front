import { Image } from "@nextui-org/react";
import Button from "../../../../components/Button";
function About() {
  return (
    <section className="relative pt-4 bg-white pb-72 md:pb-32">
      <div className="container flex flex-col items-center justify-around mx-auto gap-9 lg:flex-row">
        <div>
          <Image
            src="/images/home/about/TeacherAbout54.png"
            alt="Teacher About image"
            loading="lazy"
            decoding="async"
            disableSkeleton
            height={"100%"}
            className="w-[300px] md:w-[450px]"
          />
        </div>
        <div className="flex flex-col gap-5 px-10 text-center md:text-right lg:w-1/2">
          <h2 className="text-xl md:text-4xl text-blue-color-primary">
            <span className="text-blue-color-primary"> عن </span>مستر محمد توفيق
          </h2>
          <p className="w-full leading-7 tracking-wide text-center lg:w-9/12 md:text-right text-blue-color-primary text-pretty">
            مدرس أول في مادة الأحياء للمرحلة الثانوية وحاصل على بكالوريوس العلوم
            والتربية احنا هنا علشان نساعدك ونعرفك قد ايه الاحياء لذيذة وبسيطة
            احنا معاك لحد باب كليات الطب باذن الله دمتم في افضل حال احبكم في
            الله
          </p>
          <Button
            type="primary"
            to="/redeem"
            className="w-40 mt-3 font-semibold leading-8 text-center"
          >
            <span className="text-xl font-semibold text-white">احجز الأن</span>
          </Button>
        </div>
      </div>
      <img
        src="/images/home/about/aboutSectionWave.svg"
        alt="section wave image"
        className="absolute bottom-0 left-0 w-[200px] xl:w-[250px]"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
}

export default About;
