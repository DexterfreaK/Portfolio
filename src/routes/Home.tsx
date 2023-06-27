
import "./home.css";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";


function Home() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 3 });
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
          duration: 1.5,
          delay: 3,
        }}
      >
        <motion.div
          className="home"
          animate={{
            scale: [1, 1, 0.95],
            borderRadius: ["0px", "0px", "15px"],
            backgroundPosition: ["40% 20%", "99% 99%", "99% 40%", "40% 20%"],
          }}
          transition={{
            backgroundPosition: {
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut",
            },
            duration: 1.5,
            delay: 3.5,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Home;
