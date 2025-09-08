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

// ---- CometCard Component ----
// This is the hover card component you provided, adapted to be self-contained.
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Added stiffness and damping for a smoother spring effect
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

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

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

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
          boxShadow:
            "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.2 },
        }}
      >
        {children}
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            zIndex: 50,
            height: "100%",
            width: "100%",
            borderRadius: "16px",
            mixBlendMode: "overlay",
            background: glareBackground,
            opacity: 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

// ---- Main Components (Modified LatestFilm) ----

type Film = {
  title: string;
  watchedDate: string;
  link: string;
  poster: string;
} | null;

function LatestFilm() {
  const [film, setFilm] = useState<Film>(null);
  const [isHovered, setIsHovered] = useState(false); // State to track hover
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
        bottom: isMobile ? "100px" : "15px",
        color: "white",
        textShadow: "0 1px 3px rgba(0,0,0,0.2)",
        textAlign: "right",
        fontSize: isMobile ? "11px" : "14px",
        opacity: 0.9,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {film ? (
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{
            position: "relative",
            width: isMobile ? "110px" : "150px",
            height: isMobile ? "165px" : "225px", // Maintain poster aspect ratio (2:3)
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {/* Initial plain text, fades out on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            Last watched :{film.title} <br />
            Watched{" "}
            {new Date(film.watchedDate).toLocaleDateString(undefined, {
              dateStyle: "medium",
            })}
          </motion.div>

          {/* CometCard with image, fades in on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <CometCard>
              <img
                src={
                  film.poster ||
                  "https://c.tenor.com/NhSHQT9nG0oAAAAd/tenor.gif"
                }
                alt="Spider-Man Poster"
                style={{
                  borderRadius: "16px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </CometCard>
          </motion.div>
        </motion.div>
      ) : (
        // --- NEW IMPLEMENTATION START ---
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{
            position: "relative",
            width: isMobile ? "110px" : "150px",
            height: isMobile ? "165px" : "225px", // Maintain poster aspect ratio (2:3)
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {/* Initial plain text, fades out on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            No diary entries yet
          </motion.div>

          {/* CometCard with image, fades in on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <CometCard>
              <img
                src="https://c.tenor.com/NhSHQT9nG0oAAAAd/tenor.gif"
                alt="Spider-Man Poster"
                style={{
                  borderRadius: "16px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </CometCard>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Custom hook for responsive design
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};

// Weather, Spotify, and Film widget components
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
        Updated 3:17 AM
      </div>
    </motion.div>
  );
};

const SpotifyWidget = () => {
  const isMobile = useResponsiveLayout();

  return (
    <motion.div
      className="info-widget"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
      style={{
        position: "absolute",
        right: "20px",
        bottom: isMobile ? "70px" : "50px",
        color: "white",
        textShadow: "0 1px 3px rgba(0,0,0,0.2)",
        textAlign: "right",
        fontSize: isMobile ? "11px" : "14px",
        opacity: 0.9,
        zIndex: 10,
      }}
    >
      <div>♫ Song Title — Artist Name</div>
    </motion.div>
  );
};

export default function HomePage({ timerduration }: { timerduration: number }) {
  const { scrollY } = useScroll();
  const isMobile = useResponsiveLayout();

  return (
    <motion.div className="home_container">
      <motion.div
        className="home"
        animate={{
          scale: [1, 1, 0.97],
          borderRadius: ["0px", "0px", "15px"],
        }}
        transition={{
          duration: 2,
          delay: timerduration,
          ease: cubicBezier(0.17, 0.67, 0.32, 0.86),
        }}
        style={{
          position: "relative",
          overflow: "hidden",
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
            paddingBottom: isMobile ? "30px" : "20px",
          }}
        >
          <WeatherWidget />
          {/* <SpotifyWidget /> */}
          <LatestFilm />
        </div>
      </motion.div>
    </motion.div>
  );
}
