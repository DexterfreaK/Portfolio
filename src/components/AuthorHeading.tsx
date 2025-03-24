import { motion, cubicBezier } from "framer-motion";
import SlideUpAnimation from "./SlideUp";
export default function AuthorHeading({
  timerduration,
  textcolorWhite,
  title,
  subparagraph,
  NoAnimation,
}: {
  timerduration: number;
  textcolorWhite?: boolean;
  title: Array<string>;
  subparagraph?: string;
  NoAnimation?: boolean;
}) {
  const addSpan = (note: String) => {
    const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: timerduration + 1,
          staggerChildren: 0.05,
        },
      },
    };

    const item = {
      hidden: { y: "-5vh", opacity: 0, rotate: -15, translateZ: "-10vh" },
      visible: {
        y: 0,
        translateZ: 0,
        rotate: 0,
        opacity: 1,
        transition: { ease: cubicBezier(0.19, 1, 0.22, 1), duration: 3 },
      },
    };

    return (
      <motion.div
        className="author_container"
        variants={NoAnimation ? {} : container}
        initial="hidden"
        animate="visible"
        style={{ perspective: "400px" }}
      >
        {[...note].map((letter, index) => (
          <motion.span
            key={index}
            className={
              letter == "r" || letter == "n" || letter == "w" || letter == "p"
                ? "author_child font-MonumentGroteskItalic inline-block"
                : "author_child inline-block"
            }
            variants={NoAnimation ? {} : item}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="flex h-full w-full items-center justify-center flex-col pb-[10vw] uppercase text-center text-white"
      style={{ color: textcolorWhite ? "white" : "black" }}
    >
      {/* For mobile view (default) text is larger, on md and up it's smaller */}
      <motion.div
        className="font-MonumentGroteskRegular text-[22vw] md:text-[12vw] leading-[9vw] md:leading-[4.5vw] font-black"
        transition={{
          staggerChildren: 1,
        }}
      >
        {title.map((word, index) => (
          <div key={index}>
            {addSpan(word)} <br />
          </div>
        ))}
      </motion.div>
      {/* Adjust the subparagraph text size similarly */}
      <SlideUpAnimation delay={timerduration + 1} duration={5}>
        <motion.div className="text-[2vw] md:text-[.8vw] leading-[2.1vw] md:leading-[1.5vw] whitespace-normal w-[30vw]">
          {subparagraph}
        </motion.div>
      </SlideUpAnimation>
    </motion.div>
  );
}
