import {
  motion,
  stagger,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import CursorViewProject from "../components/CursorViewProject";
import SlideUpAnimation from "../components/SlideUp";
import { useState, useEffect } from "react";
import React from "react";
function DoubleContactHeading() {
  const { scrollYProgress } = useScroll();
  const bottomletter = "CONTACT".split("");
  const topletter = "CONTACT".split("");

  // -- Bottom letters rotate up & come forward (z)
  const rt = (index : number) => [0.50 + index * 0.03, 0.75 + index * 0.03];

  const getBottomLetterRotation = (index: number) => {
    return useTransform(
      scrollYProgress,
      rt(index),
      [0, 90] // Rotate from 0 to 90 degrees
    );
  };
  const getBottomLetterZ = (index: number) => {
    return useTransform(
      scrollYProgress,
      rt(index),
      [0, 10] // Translate Z from 0px to 50px (example range)
    );
  };

  // -- Top letters rotate down & can also adjust z if desired
  const getTopLetterRotation = (index: number) => {
    return useTransform(
      scrollYProgress,
      rt(index),
      [90, 0] // Rotate from 90 down to 0 degrees
    );
  };
  const getTopLetterZ = (index: number) => {
    return useTransform(
      scrollYProgress,
      rt(index),
      [10, 0] // Translate Z from 50px to 0px (example range)
    );
  };

  // Map over each letter to create arrays of motion values
  const bottomLetterRotations = bottomletter.map((_, i) =>
    getBottomLetterRotation(i)
  );
  const bottomLetterZs = bottomletter.map((_, i) => getBottomLetterZ(i));
  const topLetterRotations = topletter.map((_, i) => getTopLetterRotation(i));
  const topLetterZs = topletter.map((_, i) => getTopLetterZ(i));

  return (
    <div className="w-full py-24 mb-20">
      <div className="relative overflow-hidden">
        {/* Main heading container with double text */}
        <div className="flex justify-center items-center h-[25vh] md:h-[30vh] leading-[1.5]">
          <div className="relative">
            {/* Bottom row of letters that rotate up (and move forward in Z) */}
            <div className="block text-center relative">
              {topletter.map((letter, index) => (
                <motion.div
                  key={`bottom-${index}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                    rotateX: bottomLetterRotations[index], // From 0 to 90 degrees
                    z: bottomLetterZs[index], // From 0 to some positive value
                    marginRight: "0.02em",
                  }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>

            {/* Top row of letters that rotate down (and move from z=50 back to z=0 if desired) */}
            <div className="block text-center absolute left-0 bottom-0 ">
              {bottomletter.map((letter, index) => (
                <motion.div
                  key={`top-${index}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "top",
                    transformStyle: "preserve-3d",
                    rotateX: topLetterRotations[index], // From 90 to 0 degrees
                    z: topLetterZs[index], // From 50 to 0 if desired
                    marginRight: "0.02em",
                    position: "relative",
                    top: "-0.05em", // Slight offset to align properly
                  }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Text options that will rotate
  const textOptions = [
    {
      firstLine: "SYSTEMS",
      secondLine: "ENTHUSIAST",
      id: "systems-enthusiast",
    },
    {
      firstLine: "TYPEFACE",
      secondLine: "COLLECTOR",
      id: "typeface-collector",
    },
    {
      firstLine: "MOVIE",
      secondLine: "QUOTER",
      id: "movie-quoter",
    },
  ];

  // Auto rotate text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === textOptions.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants for letter-by-letter animation
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  // Letter variants - for entering and exiting
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.6, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.2, 0.6, 0.3, 1],
      },
    },
  };
  const lenisRef = React.useRef<any>(null);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        touchInertiaMultiplier: 3,
      }}
    >
      <motion.div
        className="bg-[#F4F0F0] rounded-[50px] z-50 absolute w-[100svw] flex flex-col items-center overflow-x-hidden"
        initial={{ y: "100%" }}
        animate={{ y: "-50px" }}
        transition={{
          duration: 1.2,
          ease: [0.165, 0.84, 0.44, 1],
        }}
      >
        {/* Bio Section */}
        <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center md:items-start py-20 px-6 md:px-12">
          {/* Image Column */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="relative">
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
                ME
              </div>
              <motion.div
                className="w-full aspect-[3/4] bg-gray-300 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Replace placeholder with actual image */}
                <img
                  src="/profile.jpg"
                  alt="Harshit Nagpal"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2 md:pl-10">
            <div className="overflow-hidden">
              <SlideUpAnimation>
                <p className="text-lg font-MonumentGrotesk tracking-wide">
                  HARSHIT NAGPAL - EST 2003
                </p>
              </SlideUpAnimation>
            </div>

            <div className="h-[25vw] md:h-[12vw] mb-4 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={textOptions[currentTextIndex].id}
                  className="absolute top-0 left-0 w-full text-[8vw] md:text-[5vw] font-MonumentGroteskBold leading-none"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex flex-wrap">
                    {textOptions[currentTextIndex].firstLine
                      .split("")
                      .map((letter, index, array) => {
                        if (letter === " ") {
                          return (
                            <span
                              key={`first-${index}`}
                              className="inline-block"
                            >
                              &nbsp;
                            </span>
                          );
                        }

                        return (
                          <motion.span
                            key={`first-${index}`}
                            className="inline-block text-black"
                            variants={letterVariants}
                          >
                            {letter}
                          </motion.span>
                        );
                      })}
                  </div>

                  <div className="flex flex-wrap mt-2">
                    {textOptions[currentTextIndex].secondLine
                      .split("")
                      .map((letter, index, array) => {
                        if (letter === " ") {
                          return (
                            <span
                              key={`second-${index}`}
                              className="inline-block"
                            >
                              &nbsp;
                            </span>
                          );
                        }

                        return (
                          <motion.span
                            key={`second-${index}`}
                            className="inline-block text-black"
                            variants={letterVariants}
                          >
                            {letter}
                          </motion.span>
                        );
                      })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <SlideUpAnimation staggerChildren={true} staggerDelay={0.1}>
              <motion.p className="text-lg md:text-xl font-MonumentGrotesk mb-6">
                A designer who thinks "multi-disciplinary" is a buzzword and
                wonders why we write bios in third-person.
              </motion.p>
              <motion.p className="text-base font-MonumentGrotesk mb-6">
                I've been designing brands and digital experiences for almost a
                decade, approaching each project with equal parts strategy and
                style. Currently living in San Diego, CA, and working with the
                talented team at Five&Done in Orange County.
              </motion.p>
              <motion.p className="text-base font-MonumentGrotesk mb-6">
                When I'm not photosynthesizing in the warm glow of my computer
                screen, you can find me reading an old book, reorganizing my
                living space (again), and snacking on an unhealthy amount of
                Goldfish and trail mix.
              </motion.p>
              <motion.p className="text-base font-MonumentGrotesk">
                If you have any exciting projects to talk about, or just want to
                be friends, feel free to hit me up.
              </motion.p>
            </SlideUpAnimation>
          </div>
        </div>


        {/* Main CONTACT heading */}
        
        <DoubleContactHeading />

        {/* Two contact options */}
        <div className="w-[90vw] max-w-[1200px] flex flex-col md:flex-row mb-20">
          {/* Project option */}
          <motion.div
            className="w-full md:w-1/2 bg-black text-white p-8 md:p-12 flex flex-col justify-center items-center cursor-pointer mb-4 md:mb-0 md:mr-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="w-full max-w-md">
              <p className="text-sm uppercase tracking-wider mb-4">
                LET'S TALK ABOUT
              </p>
              <h2 className="text-5xl md:text-6xl font-MonumentGroteskBold">
                A PROJECT
              </h2>
            </div>
          </motion.div>

          {/* Something else option */}
          <motion.div
            className="w-full md:w-1/2 bg-white text-black border border-black p-8 md:p-12 flex flex-col justify-center cursor-pointer md:ml-2 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className="w-full max-w-md relative">
              <p className="text-sm uppercase tracking-wider mb-4">
                LET'S TALK ABOUT
              </p>
              <div className="flex items-center justify-between overflow-hidden relative">
                <motion.h2
                  className="text-5xl md:text-6xl font-MonumentGroteskBold"
                  animate={{
                    x: isHovered ? "-5%" : "0%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  SOMETHING ELSE
                </motion.h2>
                <motion.div
                  className="flex items-center absolute right-0"
                  initial={{ opacity: 0, x: -20, width: "0%" }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -20,
                    width: isHovered ? "15%" : "0%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform scale-150"
                  >
                    <motion.path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: isHovered ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* <CursorViewProject/> */}
    </ReactLenis>
  );
}

export default About;
