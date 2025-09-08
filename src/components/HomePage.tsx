"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useScroll,
  cubicBezier,
} from "framer-motion";
import AuthorHeading from "./AuthorHeading"; // Assuming this component exists and is in the correct path

// ---- Reusable UI Components ----

/**
 * A 3D interactive card that tilts and shines based on cursor position.
 * It wraps child components to provide the effect.
 */
const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs to smoothly animate the mouse position values
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  // Transformations that map mouse position to 3D rotation and translation
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );
  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`]
  );

  // Transformation for the soft glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      className={className}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "16px",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 25px 50px -12px",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 },
        }}
      >
        {children}
        {/* The soft glare overlay */}
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            zIndex: 50,
            height: "100%",
            width: "100%",
            borderRadius: "16px",
            background: glareBackground,
          }}
        />
      </motion.div>
    </div>
  );
};

/**
 * A reusable component for the "glassmorphism" card style.
 */
const GlassCard = ({
  children,
  isMobile,
}: {
  children: React.ReactNode;
  isMobile: boolean;
}) => (
  <div
    style={{
      backgroundColor: "rgba(30, 30, 30, 0.3)",
      padding: isMobile ? "10px" : "12px",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "white",
      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      cursor: "pointer",
    }}
  >
    {children}
  </div>
);

// ---- Main Components ----

type Film = {
  title: string;
  watchedDate: string;
  link: string;
  poster: string;
} | null;

function LatestFilm() {
  const [film, setFilm] = useState<Film>(null);
  const isMobile = useResponsiveLayout();


  useEffect(() => {
    fetch("/api/latest-film")
      .then((r) => r.json())
      .then(setFilm)
      .catch(() => setFilm(null));
  }, []);

  return (
    <motion.div
      className="info-widget"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
      style={{
        position: "absolute",
        right: "30px",
        bottom: isMobile ? "60px" : "15px",
        zIndex: 10,
      }}
    >
      {film ? (
        <CometCard>
          <GlassCard isMobile={isMobile}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "12px" : "16px",
                textAlign: "right",
                fontSize: isMobile ? "11px" : "13px",
                lineHeight: 1.6,
              }}
            >
              <div>
                Last watched: {film.title}
                <br />
                <span
                  style={{
                    opacity: 0.75,
                    fontSize: isMobile ? "10px" : "12px",
                  }}
                >
                  Watched{" "}
                  {new Date(film.watchedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <img
                src={film.poster}
                alt={film.title}
                style={{
                  width: isMobile ? "45px" : "50px",
                  height: isMobile ? "67.5px" : "75px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  display: "block",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </GlassCard>
        </CometCard>
      ) : (
        <GlassCard isMobile={isMobile}>
          <div
            style={{ padding: "0 4px", fontSize: isMobile ? "11px" : "12px" }}
          >
            No diary entries yet
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
}

// ---- Utility Hooks & Widgets ----

const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const WeatherWidget = () => {
  const isMobile = useResponsiveLayout();
  return (
    <motion.div
      className="info-widget"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
      style={{
        position: "absolute",
        left: "30px",
        bottom: isMobile ? "120px" : "15px",
        color: "white",
        textShadow: "0 1px 3px rgba(0,0,0,0.2)",
        fontSize: isMobile ? "11px" : "14px",
        opacity: 0.9,
        zIndex: 10,
      }}
    >
      <div>Saarbrücken, Saarland, Germany</div>
      <div
        style={{
          fontSize: isMobile ? "9px" : "12px",
          marginTop: "5px",
          opacity: 0.7,
        }}
      >
        Updated 3:56 AM
      </div>
    </motion.div>
  );
};

// ---- Main Page Component ----

export default function HomePage({ timerduration }: { timerduration: number }) {
  const isMobile = useResponsiveLayout();
  return (
    <motion.div className="home_container">
      <motion.div
        className="home"
        animate={{ scale: [1, 1, 0.97], borderRadius: ["0px", "0px", "15px"] }}
        transition={{
          duration: 2,
          delay: timerduration,
          ease: cubicBezier(0.17, 0.67, 0.32, 0.86),
        }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          width: "100%",
        }}
      >
        <AuthorHeading
          timerduration={timerduration}
          title={["harshit", "nagpal"]}
          textcolorWhite
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isMobile ? "10px" : "20px",
            paddingBottom: isMobile ? "60px" : "20px",
          }}
        >
          <WeatherWidget />
          <LatestFilm />
        </div>
      </motion.div>
    </motion.div>
  );
}
