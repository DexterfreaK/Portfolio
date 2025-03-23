import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  cubicBezier,
} from "framer-motion";
import { useEffect,useState } from "react";
import s from "./timer.module.scss";
import cn from "clsx";
import SlideDownAnimation from "../SlideDown";

interface AnimatedHeaderProps {
  timerduration: number;
  duration: number;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ timerduration , duration}) => {
  const [shift, setShift] = useState(false);

  // Callback for when the slide down animations complete.
  const handleAnimationComplete = () => {
    setShift(true);
  };

  return (
    <motion.div className="flex text-white font-MonumentGroteskBold text-5xl absolute bottom-[5rem] left-[5rem]">
      <motion.div>H</motion.div>
      <SlideDownAnimation
        delay={timerduration}
        duration={duration}
        staggerChildren={true}
        staggerDelay={0.1}
        onAnimationComplete={handleAnimationComplete}
      >
        {[..."arshit"].map((letter, index) => (
          <motion.span
            key={index}
            className="author_child font-MonumentGroteskBold inline-block h-[3.5rem]"
          >
            {letter}
          </motion.span>
        ))}
      </SlideDownAnimation>
      {"\u00A0"}
      <motion.div
        // Shift the "N" element to the left by 50px when `shift` is true.
        animate={{ x: shift ? -135 : 0 }}
        transition={{
          type: "tween",
          ease: [0.215, 0.61, 0.355, 1], // Custom cubic-bezier curve
          duration: duration,
        }}
      >
        N
      </motion.div>
      <SlideDownAnimation
        delay={timerduration}
        duration={duration}
        staggerChildren={true}
        staggerDelay={0.1}
        onAnimationComplete={handleAnimationComplete}
      >
        {[..."agpal"].map((letter, index) => (
          <motion.span
            key={index}
            className="author_child font-MonumentGroteskBold inline-block h-[3.5rem]"
          >
            {letter}
          </motion.span>
        ))}
      </SlideDownAnimation>
    </motion.div>
  );
};



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
      {/* <motion.div className="flex text-white font-MonumentGroteskBold text-5xl absolute bottom-[5rem] left-[5rem] ">
        <motion.div>H</motion.div>
        <SlideDownAnimation
          delay={timerduration-2}
          duration={1.5}
          staggerChildren
          staggerDelay={0.1}
        >
          {[..."arshit"].map((letter, index) => (
            <motion.span
              key={index}
              className={
                "author_child font-MonumentGroteskBold inline-block h-[3.5rem]"
              }
            >
              {letter}
            </motion.span>
          ))}
        </SlideDownAnimation>
        {"\u00A0"}
        <motion.div>N</motion.div>
        <SlideDownAnimation
          delay={timerduration-2}
          duration={1.5}
          staggerChildren
          staggerDelay={0.1}
        >
          {[..."agpal"].map((letter, index) => (
            <motion.span
              key={index}
              className={
                "author_child font-MonumentGroteskBold inline-block h-[3.5rem]"
              }
            >
              {letter}
            </motion.span>
          ))}
        </SlideDownAnimation>
      </motion.div> */}
      <AnimatedHeader timerduration={1} duration={1}/>
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
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <TimerCount timerduration={timerduration} />
    </motion.div>
  );
}
