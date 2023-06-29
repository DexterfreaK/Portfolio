import { motion, cubicBezier } from "framer-motion";

export default function AuthorHeading({ timerduration }: { timerduration: number}) {
  
  const addSpan = (note: String) => {
    const item = {
      hidden: { y: -100, opacity: 0, rotate: -20 },
      visible: {
        y: 0,
        rotate: 0,
        opacity: 0.6,
        transition: { ease: cubicBezier(0.19, 1, 0.22, 1) }
      },
    };

    return [...note].map((letter, index) => (
      <motion.span
        key={index}
        className={
          letter == "r" || letter == "n"
            ? "author_child inline-block font-MonumentGroteskItalic"
            : "author_child inline-block"
        }
        variants={item}
      >
        {letter}
      </motion.span>
    ));
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: timerduration + 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div className="flex h-full w-full items-center justify-center flex-col pb-[10vw] uppercase text-center text-white">
      <motion.div
        className="pb-[6vw] font-MonumentGroteskRegular text-[10vw] leading-[8vw] "
        transition={{
          staggerChildren: 1,
        }}
      >
        <motion.div
          className="author_container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {addSpan("harshit")}
          <br />
          {addSpan("nagpal")}
        </motion.div>
      </motion.div>
      <motion.div className=" text-[1vw] leading-[1.5vw] whitespace-normal w-[30vw]">
        Website under Contruction. Website under Contruction. Website under
        Contruction.
      </motion.div>
    </motion.div>
  );
}
