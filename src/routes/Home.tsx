import "./Home.css";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  cubicBezier,
} from "framer-motion";
import Navbar from "../components/Navbar";

function Home() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const timerduration = 0;

  useEffect(() => {
    const animation = animate(count, 100, { duration: timerduration });
    return animation.stop;
  }, []);

  return (
    <motion.div className="app_container">
      <motion.div className="timer">{rounded}</motion.div>
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
        ></motion.div>
        <Navbar />
      </motion.div>
    </motion.div>
  );
}

export default Home;
