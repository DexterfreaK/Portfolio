import React from "react";
import { motion, Variants } from "framer-motion";

interface SlideUpAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
  onAnimationComplete?: () => void;
}

/**
 * SlideUpAnimation - A reusable component that animates its children from bottom to top
 *
 * @param {React.ReactNode} children - The content to animate
 * @param {number} delay - Delay before animation starts (in seconds)
 * @param {number} duration - Duration of the animation (in seconds)
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} staggerChildren - Whether to stagger multiple children
 * @param {number} staggerDelay - Delay between each child's animation (if staggerChildren is true)
 */

const SlideDownAnimation: React.FC<SlideUpAnimationProps> = ({
  children,
  delay = 0.3,
  duration = 1.2,
  className = "",
  staggerChildren = false,
  staggerDelay = 0.1,
  onAnimationComplete,
}) => {
  // Easing function that matches var(--ease-out-expo)
  const easeInOutCirc: [number, number, number, number] = [
    0.785, 0.135, 0.15, 0.86,
  ];

  // For single child animation
  const singleChildVariants: Variants = {
    hidden: {
      transform: "translate3d(0, 0, 0)",
    },
    visible: {
      transform: "translate3d(0, 100%, 0)",
      transition: {
        duration: duration,
        ease: easeInOutCirc,
        delay: delay,
      },
    },
  };

  // For staggered children animations
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const staggerItemVariants: Variants = {
    hidden: {
      transform: "translate3d(0, 0, 0)",
    },
    visible: {
      transform: "translate3d(0, 100%, 0)",
      transition: {
        duration: duration,
        ease: easeInOutCirc,
      },
    },
  };

  // If we're not staggering children, just animate the single child
  if (!staggerChildren) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={singleChildVariants}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // If we are staggering children, wrap each child in a motion.div
  return (
    <motion.div
      className={`flex ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <div className="overflow-hidden" key={index}>
          <motion.div
            variants={staggerItemVariants}
            onAnimationComplete={onAnimationComplete}
          >
            {child}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default SlideDownAnimation;
