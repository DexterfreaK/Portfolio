import {
  motion,
  stagger,
  AnimatePresence,
  useScroll,
  useTransform,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import CursorViewProject from "../components/CursorViewProject";
import SlideUpAnimation from "../components/SlideUp";
import { useState, useEffect } from "react";
import React from "react";
import AuthorHeading from "../components/AuthorHeading";

type Film = {
  title: string;
  watchedDate: string;
  link: string;
  poster: string;
} | null;


function LatestFilm() {
  const [film, setFilm] = useState<Film>(null);

  useEffect(() => {
    fetch("/api/latest-film")
      .then((r) => r.json())
      .then(setFilm)
      .catch(() => setFilm(null));
  }, []);

  if (!film) return <p>No diary entries yet.</p>;

  return (
    <a href={film.link} target="_blank" rel="noopener noreferrer">
      {film.poster && (
        <img
          src={film.poster}
          alt={film.title}
          width={200}
          height={300}
          style={{ borderRadius: 8 }}
        />
      )}
      <div style={{ marginTop: 8 }}>
        <strong>{film.title}</strong>
        <br />
        Watched{" "}
        {new Date(film.watchedDate).toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
      </div>
    </a>
  );
}
function DoubleContactHeadingtimer() {
  // 1) Create a motion value for our "progress"
  const progress = useMotionValue(0);

  // 2) Set up a simple timer that loops progress from 0 to 1
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Increase progress in small increments
      current += 0.01;
      if (current > 1) {
        current = 0; // Loop back to 0 after hitting 1
      }
      progress.set(current);
    }, 10); // Adjust interval time to change speed of animation

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [progress]);

  const bottomLetters = "DABC".split("");
  const topLetters = "ABCDDDDD".split("");

  // --- Adjust these ranges to tweak the timing of each letter
  const rt = (index: number) => [0.5 + index * 0.03, 0.75 + index * 0.03];
  const rt2 = (index: number) => [0.4 + index * 0.03, 0.65 + index * 0.03];

  // --- Bottom letters rotate up & come forward (z)
  const getBottomLetterRotation = (index: number) =>
    useTransform(progress, rt2(index), [0, 90]);
  const getBottomLetterZ = (index: number) =>
    useTransform(progress, rt2(index), [0, 10]);

  // --- Top letters rotate down & move backward (z)
  const getTopLetterRotation = (index: number) =>
    useTransform(progress, rt(index), [90, 0]);
  const getTopLetterZ = (index: number) =>
    useTransform(progress, rt(index), [10, 0]);

  // Create arrays of transforms
  const topLetterRotations = topLetters.map((_, i) => getTopLetterRotation(i));
  const topLetterZs = topLetters.map((_, i) => getTopLetterZ(i));
  const bottomLetterRotations = bottomLetters.map((_, i) =>
    getBottomLetterRotation(i)
  );
  const bottomLetterZs = bottomLetters.map((_, i) => getBottomLetterZ(i));

  // Calculate the maximum width needed for both rows
  const maxLetters = Math.max(topLetters.length, bottomLetters.length);

  // Create arrays of the correct length with empty spaces for positioning
  const paddedTopLetters = [...topLetters];
  const paddedBottomLetters = [...bottomLetters];

  while (paddedTopLetters.length < maxLetters) {
    paddedTopLetters.push("");
  }
  while (paddedBottomLetters.length < maxLetters) {
    paddedBottomLetters.push("");
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        {/* Main heading container with double text */}
        <div className="flex justify-center items-center leading-[0.55] h-[10rem]">
          <div className="relative" style={{ width: "max-content" }}>
            {/* Top row of letters */}
            <div className="block text-center relative whitespace-nowrap">
              {paddedTopLetters.map((letter, index) => (
                <motion.div
                  key={`top-${index}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                    rotateX:
                      index < topLetterRotations.length
                        ? topLetterRotations[index]
                        : 0,
                    z: index < topLetterZs.length ? topLetterZs[index] : 0,
                    marginRight: "0.02em",
                    width: letter === "" ? "0.5em" : "auto",
                    visibility: letter === "" ? "hidden" : "visible",
                  }}
                >
                  {letter || " "}
                </motion.div>
              ))}
            </div>
            {/* Bottom row of letters */}
            <div className="block text-center absolute left-0 bottom-0 whitespace-nowrap">
              {paddedBottomLetters.map((letter, index) => (
                <motion.div
                  key={`bottom-${index}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "top",
                    transformStyle: "preserve-3d",
                    rotateX:
                      index < bottomLetterRotations.length
                        ? bottomLetterRotations[index]
                        : 0,
                    z:
                      index < bottomLetterZs.length ? bottomLetterZs[index] : 0,
                    marginRight: "0.02em",
                    position: "relative",
                    top: "-0.05em",
                    width: letter === "" ? "0.5em" : "auto",
                    visibility: letter === "" ? "hidden" : "visible",
                  }}
                >
                  {letter || " "}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function DoubleContactHeadingtimer2() {
  // Define an array of words to cycle through
  const words = ["ABCDDDDD", "DEF", "GHIJ"];

  // 1) Create motion values for our "progress" and current word index
  const progress = useMotionValue(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [nextWordIndex, setNextWordIndex] = useState(1);

  // Get current word and next word
  const currentWord = words[currentWordIndex];
  const nextWord = words[nextWordIndex];

  // Split into letters for animation
  const bottomLetters = currentWord.split("");
  const topLetters = nextWord.split("");

  // Calculate the maximum length needed for both rows
  const maxLength = Math.max(...words.map((word) => word.length));

  // Create arrays of the correct length with empty spaces for positioning
  const paddedTopLetters = [...topLetters];
  const paddedBottomLetters = [...bottomLetters];

  while (paddedTopLetters.length < maxLength) {
    paddedTopLetters.push("");
  }
  while (paddedBottomLetters.length < maxLength) {
    paddedBottomLetters.push("");
  }

  // 2) Set up a timer that cycles through the words
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Increase progress in small increments
      current += 0.01;

      // When animation completes, change words
      if (current > 1) {
        current = 0; // Reset progress

        // Update word indices
        const newCurrentIndex = (currentWordIndex + 1) % words.length;
        const newNextIndex = (newCurrentIndex + 1) % words.length;

        setCurrentWordIndex(newCurrentIndex);
        setNextWordIndex(newNextIndex);
      }

      progress.set(current);
    }, 25); // Adjust interval time to change speed of animation

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [progress, currentWordIndex, words.length]);

  // --- Adjust these ranges to tweak the timing of each letter
  const rt = (index: number) => [0.5 + index * 0.03, 0.75 + index * 0.03];
  const rt2 = (index: number) => [0.4 + index * 0.03, 0.65 + index * 0.03];

  // --- Bottom letters rotate up & come forward (z)
  const getBottomLetterRotation = (index: number) =>
    useTransform(progress, rt2(index), [0, 90]);
  const getBottomLetterZ = (index: number) =>
    useTransform(progress, rt2(index), [0, 10]);

  // --- Top letters rotate down & move backward (z)
  const getTopLetterRotation = (index: number) =>
    useTransform(progress, rt(index), [90, 0]);
  const getTopLetterZ = (index: number) =>
    useTransform(progress, rt(index), [10, 0]);

  // Create arrays of transforms
  const topLetterRotations = paddedTopLetters.map((_, i) =>
    getTopLetterRotation(i)
  );
  const topLetterZs = paddedTopLetters.map((_, i) => getTopLetterZ(i));
  const bottomLetterRotations = paddedBottomLetters.map((_, i) =>
    getBottomLetterRotation(i)
  );
  const bottomLetterZs = paddedBottomLetters.map((_, i) => getBottomLetterZ(i));

  return (
    <div className="w-[100rem]">
        <div className="flex justify-center items-center leading-[0.7] h-[20rem]">
          <div className="relative" style={{ width: "max-content" }}>
            {/* Top row of letters (next word) */}
            <div className="block text-center absolute left-0 bottom-0 whitespace-nowrap">
              {paddedTopLetters.map((letter, index) => (
                <motion.div
                  key={`top-${index}-${nextWordIndex}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                    rotateX: topLetterRotations[index],
                    z: topLetterZs[index],
                    marginRight: "0.02em",
                    width: letter === "" ? "0.5em" : "auto",
                    visibility: letter === "" ? "hidden" : "visible",
                  }}
                >
                  {letter || " "}
                </motion.div>
              ))}
            </div>
            {/* Bottom row of letters (current word) */}
            <div className="block text-center absolute left-0 bottom-0 whitespace-nowrap">
              {paddedBottomLetters.map((letter, index) => (
                <motion.div
                  key={`bottom-${index}-${currentWordIndex}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "top",
                    transformStyle: "preserve-3d",
                    rotateX: bottomLetterRotations[index],
                    z: bottomLetterZs[index],
                    marginRight: "0.02em",
                    position: "relative",
                    // top: "-0.05em",
                    width: letter === "" ? "0.5em" : "auto",
                    visibility: letter === "" ? "hidden" : "visible",
                  }}
                >
                  {letter || " "}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

function DCHT() {
  const words = ["ABCDDDDD", "DEF", "GHIJ"];

  // 1) Create motion values for our "progress" and current word index
  const progress = useMotionValue(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [nextWordIndex, setNextWordIndex] = useState(1);

  // Get current word and next word
  const currentWord = words[currentWordIndex];
  const nextWord = words[nextWordIndex];

  // Split into letters for animation
  const bottomLetters = currentWord.split("");
  const topLetters = nextWord.split("");

  // Calculate the maximum length needed for both rows
  const maxLength = Math.max(...words.map((word) => word.length));

  // Create arrays of the correct length with empty spaces for positioning
  const paddedTopLetters = [...topLetters];
  const paddedBottomLetters = [...bottomLetters];
  while (paddedTopLetters.length < maxLength) paddedTopLetters.push("");
  while (paddedBottomLetters.length < maxLength) paddedBottomLetters.push("");

  // 2) Set up a timer that cycles through the words
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 0.01;
      if (current > 1) {
        current = 0;
        const newCurrentIndex = (currentWordIndex + 1) % words.length;
        const newNextIndex = (newCurrentIndex + 1) % words.length;
        setCurrentWordIndex(newCurrentIndex);
        setNextWordIndex(newNextIndex);
      }
      progress.set(current);
    }, 25);

    return () => clearInterval(interval);
  }, [progress, currentWordIndex, words.length]);

  // --- Adjust these ranges to tweak the timing of each letter
  const rt = (index:number) => [0.5 + index * 0.03, 0.75 + index * 0.03];
  const rt2 = (index: number) => [0.4 + index * 0.03, 0.65 + index * 0.03];

  // --- Bottom letters rotate up & come forward (z)
  const getBottomLetterRotation = (index: number) =>
    useTransform(progress, rt2(index), [0, 90]);
  const getBottomLetterZ = (index: number) =>
    useTransform(progress, rt2(index), [0, 10]);

  // --- Top letters rotate down & move backward (z)
  const getTopLetterRotation = (index: number) =>
    useTransform(progress, rt(index), [90, 0]);
  const getTopLetterZ = (index: number) =>
    useTransform(progress, rt(index), [10, 0]);

  // Create arrays of transforms
  const topLetterRotations = paddedTopLetters.map((_, i) =>
    getTopLetterRotation(i)
  );
  const topLetterZs = paddedTopLetters.map((_, i) => getTopLetterZ(i));
  const bottomLetterRotations = paddedBottomLetters.map((_, i) =>
    getBottomLetterRotation(i)
  );
  const bottomLetterZs = paddedBottomLetters.map((_, i) => getBottomLetterZ(i));

  return (
    /**
     * You can position .relative and .inline-block however you like.
     * For instance, wrap this in <div className="flex justify-center">,
     * or remove inline-block if you prefer a full-width container, etc.
     */
    <div className="relative inline-block">
      {/* Next word (top letters) */}
      <div className="absolute left-0 bottom-0 whitespace-nowrap">
        {paddedTopLetters.map((letter, index) => (
          <motion.span
            key={`top-${index}-${nextWordIndex}`}
            style={{
              transformOrigin: "bottom",
              transformStyle: "preserve-3d",
              rotateX: topLetterRotations[index],
              z: topLetterZs[index],
            }}
            className={`
              inline-block 
              mr-[0.02em]
              ${letter === "" ? "invisible w-[0.5em]" : ""}
            `}
          >
            {letter || " "}
          </motion.span>
        ))}
      </div>

      {/* Current word (bottom letters) */}
      <div className="absolute left-0 bottom-0 whitespace-nowrap">
        {paddedBottomLetters.map((letter, index) => (
          <motion.span
            key={`bottom-${index}-${currentWordIndex}`}
            style={{
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              rotateX: bottomLetterRotations[index],
              z: bottomLetterZs[index],
            }}
            className={`
              inline-block 
              mr-[0.02em]
              ${letter === "" ? "invisible w-[0.5em]" : ""}
            `}
          >
            {letter || " "}
          </motion.span>
        ))}
      </div>
    </div>
  );
}



function DoubleContactHeading() {
  const { scrollYProgress } = useScroll();
  const bottomletter = "Get In Touch".split("");
  const topletter = "Get In Touch".split("");

  // -- Bottom letters rotate up & come forward (z)
  const rt = (index: number) => [0.5 + index * 0.03, 0.75 + index * 0.03];
  const rt2 = (index: number) => [0.4 + index * 0.03, 0.65 + index * 0.03];

  const getBottomLetterRotation = (index: number) => {
    return useTransform(
      scrollYProgress,
      rt2(index),
      [0, 90] // Rotate from 0 to 90 degrees
    );
  };

  const getBottomLetterZ = (index: number) => {
    return useTransform(
      scrollYProgress,
      rt2(index),
      [0, 10] // Translate Z from 0px to 10px
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
      [10, 0] // Translate Z from 10px to 0px
    );
  };

  // Map over each letter to create arrays of motion values
  const topLetterRotations = topletter.map((_, i) => getTopLetterRotation(i));

  const topLetterZs = topletter.map((_, i) => getTopLetterZ(i));

  const bottomLetterRotations = bottomletter.map((_, i) =>
    getBottomLetterRotation(i)
  );

  const bottomLetterZs = bottomletter.map((_, i) => getBottomLetterZ(i));

  // Calculate the maximum width needed for both rows
  const maxLetters = Math.max(topletter.length, bottomletter.length);

  // Create arrays of the correct length with empty spaces for positioning
  const paddedTopLetters = [...topletter];
  const paddedBottomLetters = [...bottomletter];

  // Fill with empty strings to match the maximum length
  while (paddedTopLetters.length < maxLetters) {
    paddedTopLetters.push("");
  }

  while (paddedBottomLetters.length < maxLetters) {
    paddedBottomLetters.push("");
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        {/* Main heading container with double text */}
        <LatestFilm/>
        <div className="flex justify-center items-center leading-[0.55] h-[10rem]">
          <div className="relative" style={{ width: "max-content" }}>
            {/* Top row of letters */}
            <div className="block text-center relative whitespace-nowrap">
              {paddedTopLetters.map((letter, index) => (
                <motion.div
                  key={`top-${index}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                    rotateX:
                      index < topLetterRotations.length
                        ? topLetterRotations[index]
                        : 0,
                    z: index < topLetterZs.length ? topLetterZs[index] : 0,
                    marginRight: "0.02em",
                    width: letter === "" ? "0.5em" : "auto", // Give invisible letters width
                    visibility: letter === "" ? "hidden" : "visible", // Hide but preserve space
                  }}
                >
                  {letter || " "}
                </motion.div>
              ))}
            </div>

            {/* Bottom row of letters */}
            <div className="block text-center absolute left-0 bottom-0 whitespace-nowrap">
              {paddedBottomLetters.map((letter, index) => (
                <motion.div
                  key={`bottom-${index}`}
                  style={{
                    fontSize: "10vw",
                    fontFamily: "Monument Grotesk Bold",
                    fontWeight: "bold",
                    display: "inline-block",
                    transformOrigin: "top",
                    transformStyle: "preserve-3d",
                    rotateX:
                      index < bottomLetterRotations.length
                        ? bottomLetterRotations[index]
                        : 0,
                    z:
                      index < bottomLetterZs.length ? bottomLetterZs[index] : 0,
                    marginRight: "0.02em",
                    position: "relative",
                    top: "-0.05em",
                    width: letter === "" ? "0.5em" : "auto", // Give invisible letters width
                    visibility: letter === "" ? "hidden" : "visible", // Hide but preserve space
                  }}
                >
                  {letter || " "}
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
      firstLine: "CAFFEINE",
      secondLine: "MAESTRO",
      id: "caffeine-maestro",
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
    {
      firstLine: "ROYAL WITH",
      secondLine: "CHEESE",
      id: "royal-with-cheese",
    },
  ];

  // Auto rotate text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === textOptions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

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
          {/* Text Column */}
          <div className="w-full md:w-7/12 md:pr-10">
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
              <motion.p className="text-lg md:text-xl font-MonumentGroteskRegular mb-6">
                Veniam consectetur ut eu consectetur ea aliqua aliquip mollit
                exercitation. Est anim laboris et Lorem pariatur cupidatat id
                laborum est anim. Non ullamco dolor voluptate exercitation elit
                Lorem commodo ex Lorem ad elit reprehenderit et deserunt. Cillum
                nisi ipsum in reprehenderit eu enim proident enim voluptate.
                Officia magna eiusmod dolore tempor aliquip nostrud in tempor
                anim aliquip aute pariatur ut.
              </motion.p>
              <motion.p className="text-base font-MonumentGroteskRegular mb-6">
                Veniam consectetur ut eu consectetur ea aliqua aliquip mollit
                exercitation. Est anim laboris et Lorem pariatur cupidatat id
                laborum est anim. Non ullamco dolor voluptate exercitation elit
                Lorem commodo ex Lorem ad elit reprehenderit et deserunt. Cillum
                nisi ipsum in reprehenderit eu enim proident enim voluptate.
                Officia magna eiusmod dolore tempor aliquip nostrud in tempor
                anim aliquip aute pariatur ut.
              </motion.p>
              <motion.p className="text-base font-MonumentGroteskRegular mb-6">
                Veniam consectetur ut eu consectetur ea aliqua aliquip mollit
                exercitation. Est anim laboris et Lorem pariatur cupidatat id
                laborum est anim. Non ullamco dolor voluptate exercitation elit
                Lorem commodo ex Lorem ad elit reprehenderit et deserunt. Cillum
                nisi ipsum in reprehenderit eu enim proident enim voluptate.
                Officia magna eiusmod dolore tempor aliquip nostrud in tempor
                anim aliquip aute pariatur ut.
              </motion.p>
              <motion.p className="text-base font-MonumentGroteskRegular">
                Veniam consectetur ut eu consectetur ea aliqua aliquip mollit
                exercitation. Est anim laboris et Lorem pariatur cupidatat id
                laborum est anim. Non ullamco dolor voluptate exercitation elit
                Lorem commodo ex Lorem ad elit reprehenderit et deserunt. Cillum
                nisi ipsum in reprehenderit eu enim proident enim voluptate.
                Officia magna eiusmod dolore tempor aliquip nostrud in tempor
                anim aliquip aute pariatur ut.
              </motion.p>
            </SlideUpAnimation>
          </div>

          {/* Image Column */}
          <div className="w-full md:w-5/12 mb-10 md:mb-0 md:pl-10">
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
        </div>
        <div className="SomeInfo p-10 font-MonumentGroteskRegular">
          <SlideUpAnimation staggerChildren={true} staggerDelay={0.1}>
            <motion.p className="text-lg md:text-xl font-MonumentGrotesk mb-6">
              Aliqua adipisicing dolor et. Laborum incididunt labore qui
              excepteur enim sit minim ut. Aliquip incididunt tempor cillum
              velit et tempor. Amet dolore labore nulla dolore occaecat esse
              nostrud. Cillum aute proident commodo. Elit dolor nostrud ullamco
              elit laborum eu sint et deserunt officia elit id. Ut velit eu
              fugiat excepteur commodo eiusmod quis.
            </motion.p>
            <motion.p className="text-base font-MonumentGrotesk mb-6">
              Aliqua adipisicing dolor et. Laborum incididunt labore qui
              excepteur enim sit minim ut. Aliquip incididunt tempor cillum
              velit et tempor. Amet dolore labore nulla dolore occaecat esse
              nostrud. Cillum aute proident commodo. Elit dolor nostrud ullamco
              elit laborum eu sint et deserunt officia elit id. Ut velit eu
              fugiat excepteur commodo eiusmod quis.
            </motion.p>
            <motion.p className="text-base font-MonumentGrotesk mb-6">
              Aliqua adipisicing dolor et. Laborum incididunt labore qui
              excepteur enim sit minim ut. Aliquip incididunt tempor cillum
              velit et tempor. Amet dolore labore nulla dolore occaecat esse
              nostrud. Cillum aute proident commodo. Elit dolor nostrud ullamco
              elit laborum eu sint et deserunt officia elit id. Ut velit eu
              fugiat excepteur commodo eiusmod quis.
            </motion.p>
            <motion.p className="text-base font-MonumentGrotesk">
              If you have any exciting projects to talk about, or just want to
              be friends, feel free to hit me up.
            </motion.p>
          </SlideUpAnimation>
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
