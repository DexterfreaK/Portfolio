import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  cubicBezier,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import s from "./timer.module.scss";
import cn from "clsx";
import SlideDownAnimation from "../SlideDown";

interface AnimatedHeaderProps {
  timerduration: number;
  duration: number;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  timerduration,
  duration,
}) => {
  const [shift, setShift] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window resize
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate shift amount based on screen size
  const getShiftAmount = () => {
    if (windowWidth >= 1024) return -135;
    if (windowWidth >= 768) return -100;
    return -70;
  };

  // Callback for when the slide down animations complete
  const handleAnimationComplete = () => {
    setShift(true);
  };

  return (
    <motion.div className="flex text-white font-MonumentGroteskBold text-2xl md:text-3xl lg:text-5xl absolute bottom-[2rem] md:bottom-[3rem] lg:bottom-[5rem] left-[1rem] md:left-[2rem] lg:left-[5rem]">
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
            className="author_child font-MonumentGroteskBold inline-block h-[1.75rem] md:h-[2.5rem] lg:h-[3.5rem]"
          >
            {letter}
          </motion.span>
        ))}
      </SlideDownAnimation>
      {"\u00A0"}
      <motion.div
        animate={{ x: shift ? getShiftAmount() : 0 }}
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
            className="author_child font-MonumentGroteskBold inline-block h-[1.75rem] md:h-[2.5rem] lg:h-[3.5rem]"
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

  // Create separate height transforms for different screen sizes
  const heightAdjustedMobile = useTransform(
    progress,
    (value) => `calc(${value} - 3.5rem)`
  );
  const heightAdjustedTablet = useTransform(
    progress,
    (value) => `calc(${value} - 5rem)`
  );
  const heightAdjustedDesktop = useTransform(
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
      <motion.div className="timer text-white font-MonumentGroteskBold text-2xl md:text-3xl lg:text-[4.5rem] absolute top-[1rem] md:top-[1.5rem] lg:top-[2.5rem] left-[1rem] md:left-[2rem] lg:left-[5rem] cursor-wait">
        {rounded}
      </motion.div>

      {/* Mobile progress line */}
      <motion.div
        className={cn(
          s.progress_line,
          "bg-white absolute bottom-[2rem] right-[1.5rem] w-[1px] block md:hidden"
        )}
        style={{
          height: heightAdjustedMobile,
        }}
      />

      {/* Tablet progress line */}
      <motion.div
        className={cn(
          s.progress_line,
          "bg-white absolute bottom-[3rem] right-[4rem] w-[1.5px] hidden md:block lg:hidden"
        )}
        style={{
          height: heightAdjustedTablet,
        }}
      />

      {/* Desktop progress line */}
      <motion.div
        className={cn(
          s.progress_line,
          "bg-white absolute bottom-[5rem] right-[8.5rem] w-[2px] hidden lg:block"
        )}
        style={{
          height: heightAdjustedDesktop,
        }}
      />

      <AnimatedHeader timerduration={1} duration={1} />
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
