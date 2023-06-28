import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  cubicBezier
} from "framer-motion";
import { useEffect } from "react";

export default function Timer({ timerduration }: { timerduration: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 100, {
      duration: timerduration,
      ease: cubicBezier(0.81, -0.03, 0, 1.08),
    });
    return animation.stop;
  }, []);
  return (
    <>
      <motion.div className="timer text-white font-MonumentGroteskBold text-9xl mt-[-50px] p-[5vw] cursor-wait">
        {rounded}
      </motion.div>
    </>
  );
}
