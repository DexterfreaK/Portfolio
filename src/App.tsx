import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
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

  // 1) Simple function to get the correct component for a path
  const getComponentForPath = (path:any) => {
    switch (path) {
      case "/":
      case "/home":
        return <Home />;
      case "/work":
        return <Work />;
      case "/about":
        return <About />;
      default:
        return <Home />;
    }
  };

  // 2) Initialize your pages array with the current pathname
  const [pages, setPages] = useState([
    {
      path: location.pathname,
      component: getComponentForPath(location.pathname),
    },
  ]);

  // 3) Loading timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), timerDuration * 1000);
    return () => clearTimeout(timer);
  }, []);

  // 4) When location changes, add the new route to the stack
  useEffect(() => {
    setPages((prev) => {
      const newPath = location.pathname;
      // If it’s the same path, do nothing
      if (prev[prev.length - 1].path === newPath) return prev;

      // Otherwise, add the new route
      return [
        ...prev,
        { path: newPath, component: getComponentForPath(newPath) },
      ];
    });
  }, [location]);

  // 5) Your original variants (unchanged)
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

  // 6) On new page’s ‘enter’ completion, remove old pages
  const handleAnimationComplete = (path:any) => {
    setPages((prev) => {
      const lastPage = prev[prev.length - 1];
      if (lastPage.path === path) {
        // Only keep the latest page
        return [lastPage];
      }
      return prev;
    });
  };

  return (
    <div className="app_container">
      <AnimatePresence mode="sync">
        {loading ? (
          <Timer
            key="loadingTimer"
            timerduration={timerDuration}
            loadingVariants={loadingVariants}
          />
        ) : (
          pages.map(({ path, component }, idx) => {
            const isLast = idx === pages.length - 1;

            return (
              <motion.div
                key={path}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onAnimationComplete={() => handleAnimationComplete(path)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 2,
                  backgroundColor: "#1d1b1b",
                }}
              >
                <motion.div
                  // Darken old pages smoothly over 0.4s
                  animate={{
                    filter: isLast ? "brightness(1)" : "brightness(0.5)",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ScrollRestoration />
                  {component}
                </motion.div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
      <Navbar timerduration={timerDuration} />
    </div>
  );
}
