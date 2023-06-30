import { motion, cubicBezier } from "framer-motion";

export default function AuthorHeading({
  timerduration,
}: {
  timerduration: number;
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
      hidden: { y: "-5vh", opacity: 0, rotate: -15, translateZ:'-10vh' },
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
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ perspective: "400px" }}
      >
        {[...note].map((letter, index) => (
          <motion.span
            key={index}
            className={
              letter == "r" || letter == "n"
                ? "author_child font-MonumentGroteskItalic inline-block"
                : "author_child inline-block"
            }
            variants={item}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <motion.div className="flex h-full w-full items-center justify-center flex-col pb-[10vw] uppercase text-center text-white">
      <motion.div
        className="pb-[7vw] font-MonumentGroteskRegular text-[10vw] leading-[4vw] "
        transition={{
          staggerChildren: 1,
        }}
      >
        {addSpan("harshit")}
        <br />
        {addSpan("nagpal")}
      </motion.div>
      <motion.div className=" text-[.8vw] leading-[1.5vw] whitespace-normal w-[30vw]">
        Website under Contruction. Website under Contruction. Website under
        Contruction.
      </motion.div>
    </motion.div>
  );
}
