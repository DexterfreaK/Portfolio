import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "./routes/Home";
import Work from "./routes/Work";
import About from "./routes/About";
// import { Cursor } from "./components/cursor";
import { inject } from "@vercel/analytics";
import ScrollRestoration from "./components/ScrollRestoration";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";

export default function App() {
  inject();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const timerDuration = 3.5; // seconds
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/work", element: <Work /> },
    { path: "/about", element: <About /> },
  ]);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), timerDuration * 1000);
    return () => clearTimeout(timer);
  }, []);

  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  const pageVariants = {
    initial: { y: "100%", opacity: 1 },
    animate: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  if (!element) return null;

  return (
    <div className="app_container">
      <AnimatePresence mode="wait">
        {loading ? (
          <Timer
            timerduration={timerDuration}
            loadingVariants={loadingVariants}
          />
        ) : (
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: "relative",
              zIndex: 2,
              backgroundColor: "#1d1b1b",
            }}
          >
            <ScrollRestoration />
            {/* <Cursor /> */}
            {React.cloneElement(element, { key: location.pathname })}
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar timerduration={timerDuration} />
    </div>
  );
}
