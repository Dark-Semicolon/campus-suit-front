import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";

function Card({ image, year, educationalLevel, title, link }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing once it's in view
        }
      },
      { threshold: 0.9 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const buttonVariants = {
    offscreen: {
      y: -160,
      rotate: -20,
    },
    onscreen: {
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.8,
        duration: 1,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5" ref={ref}>
      <div className="flex items-center justify-center w-64 h-64 overflow-hidden border-8 rounded-full bg-blue-color-primary border-blue-color-light">
        {/* {image && <Image loading="lazy" src={image} className="w-full" alt="test" />} */}
        {!image && (
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="text-lg font-semibold text-white">الصف</p>
            <div>
              <img
                src="/images/home/ClassIcon.png"
                alt="icon for design"
                className="w-10 mx-auto"
                loading="lazy"
                decoding="async"
              />
              <Button
                type="bordered"
                className="text-white border-white rounded-md bg-blue-color-light"
              >
                {year}
              </Button>
            </div>
            <p className="text-lg font-semibold text-white">
              {educationalLevel}
            </p>
          </div>
        )}
      </div>
      <motion.div
        variants={buttonVariants}
        initial="offscreen"
        animate={isInView ? "onscreen" : "offscreen"}
        className="w-full"
      >
        <Button
          type="customized"
          to={link}
          className="w-full px-5 py-3 font-medium text-center text-white rounded-lg bg-blue-color-light "
        >
          {title}
        </Button>
      </motion.div>
    </div>
  );
}

export default Card;
