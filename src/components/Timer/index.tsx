import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  cubicBezier,
} from "framer-motion";
import { useEffect } from "react";
import s from "./timer.module.scss";
import cn from "clsx";

import SlideDownAnimation from "../SlideDown";

export function TimerCount({ timerduration }: { timerduration: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const progress = useTransform(count, [0, 100], ["0%", "100%"]);
  const heightAdjusted = useTransform(
    progress,
    (value) => `calc(${value} - 7.5rem)`
  );

  useEffect(() => {
    const animation = animate(count, 100, {
      duration: timerduration,
      ease: cubicBezier(0.81, -0.03, 0, 1.08),
    });
    return animation.stop;
  }, []);
  return (
    <>
      <motion.div className="timer text-white font-MonumentGroteskBold text-[4.5rem] absolute top-[2.5rem] left-[5rem] cursor-wait">
        
        {rounded}
      </motion.div>

      <motion.div
        className={cn(
          s.progress_line,
          "bg-white absolute bottom-[5rem] right-[8.5rem] w-[2px] "
        )}
        style={{
          height: heightAdjusted,
        }}
      />

      <motion.div className="text-white font-MonumentGroteskBold text-5xl absolute bottom-[5rem] left-[5rem] ">
        <SlideDownAnimation delay={timerduration-1} duration={3}>Harshit Nagpal</SlideDownAnimation>
      </motion.div>
    </>
  );
}

export default function Timer({
  timerduration,
  loadingVariants,
}: {
  timerduration: number;
  loadingVariants: any;
}) {
  return (
    <motion.div
      key="loading-screen"
      className={cn(s.timer_container)}
      variants={loadingVariants}
      initial="initial"
      exit="exit"
      style={{ position: "fixed", inset: 0, zIndex: 1 }}
    >
      <TimerCount timerduration={timerduration} />
    </motion.div>
  );
}
