import { motion, cubicBezier } from "framer-motion";
import Navbar from "./Navbar";
import AuthorHeading from "./AuthorHeading";

export default function HomePage({ timerduration }: { timerduration: number }) {
  return (
    <motion.div
      className="home_container"
      animate={{
        y: [1000, 0, 0],
      }}
      transition={{
        duration: 2.5,
        ease: cubicBezier(0.19, 1, 0.22, 1),
        delay: timerduration,
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
            duration: 10,
            ease: "easeInOut",
          },
          duration: 2,
          delay: timerduration,
          ease: cubicBezier(0.19, 1, 0.22, 1),
        }}
      >
        <AuthorHeading />
      </motion.div>
      <Navbar />
    </motion.div>
  );
}
