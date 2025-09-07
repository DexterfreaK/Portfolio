import { motion, cubicBezier } from "framer-motion";
import AuthorHeading from "./AuthorHeading";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { easeIn } from "framer-motion/dom";
import React from "react";
import { useState, useEffect } from "react";

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
    // <a href={film.link} target="_blank" rel="noopener noreferrer">
    //   {film.poster && (
    //     <img
    //       src={film.poster}
    //       alt={film.title}
    //       width={200}
    //       height={300}
    //       style={{ borderRadius: 8 }}
    //     />
    //   )}
    //   <div style={{ marginTop: 8 }}>

    //   </div>
    // </a>

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
        zIndex: 10,
      }}
    >
      {film ? (
        <div>
          <strong>{film.title}</strong>
          <br />
          Watched{" "}
          {new Date(film.watchedDate).toLocaleDateString(undefined, {
            dateStyle: "medium",
          })}
        </div>
      ) : (
        <div>No diary entries yet</div>
      )}
    </motion.div>
  );
}


// Custom hook for responsive design
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initially and on resize
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
        Updated 10:30 AM
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
        position: 'absolute',
        right: '20px',
        bottom: isMobile ? '70px' : '50px',
        color: 'white',
        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
        textAlign: 'right',
        fontSize: isMobile ? '11px' : '14px',
        opacity: 0.9,
        zIndex: 10
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
    <motion.div
      className="home_container"
      // animate={{
      //   y: [1000, 0],
      // }}
      // transition={{
      //   duration: 2,
      //   ease: cubicBezier(0.19, 1, 0.22, 1),
      //   delay: timerduration,
      // }}
    >
      <motion.div
        className="home"
        animate={{
          scale: [1, 1, 0.97],
          borderRadius: ["0px", "0px", "15px"],
          // backgroundPosition: ["40% 20%", "99% 99%", "99% 40%", "40% 20%"],
        }}
        transition={{
          // backgroundPosition: {
          //   repeat: Infinity,
          //   duration: 100,
          //   ease: "easeInOut",
          // },
          duration: 2,
          delay: timerduration,
          ease: cubicBezier(0.17, 0.67, 0.32, 0.86),
        }}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* <video id="myVideo" autoPlay muted loop>
          <source src="./intro.mp4" type="video/mp4" />
        </video> */}
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
          <LatestFilm  />
        </div>
      </motion.div>
    </motion.div>
  );
}
