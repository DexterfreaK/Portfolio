import { motion, cubicBezier } from "framer-motion";

import AuthorHeading from "./AuthorHeading";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { easeIn } from "framer-motion/dom";

export default function HomePage({ timerduration }: { timerduration: number }) {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });


  return (
    <motion.div
      className="home_container"
      animate={{
        y: [10000, 0, 0],
      }}
      transition={{
        duration: 3,
        ease: cubicBezier(0.19, 1, 0.22, 1),
        delay: timerduration-.5,
      }}
    >
      <motion.div
        className="home"
        animate={{
          scale: [1, 1, 0.96],
          borderRadius: ["0px", "0px", "15px"],
          backgroundPosition: ["40% 20%", "99% 99%", "99% 40%", "40% 20%"],
        }}
        transition={{
          backgroundPosition: {
            repeat: Infinity,
            duration: 100,
            ease: "easeInOut",
          },
          duration: 2,
          delay: timerduration,
          ease: cubicBezier(.17,.67,.32,.86),
        }}
      >
        <AuthorHeading
          timerduration={timerduration}
          title={["harshit", "nagpal"]}
          textcolorWhite
        />
      </motion.div>
    </motion.div>
  );
}
