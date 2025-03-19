import {
  motion,
  cubicBezier,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import AuthorHeading from "../components/AuthorHeading";
import inter from "../assets/interbits-assets/InterbitsBG.png";
import studydeck from "../assets/Studydeck/StudydeckMain.png";
import Main_sop from "../assets/SOP/Main.png";
import SideA_sop from "../assets/SOP/SideA.png";
import SideB_sop from "../assets/SOP/SideB.png";
import { WorkImage } from "../components/WorkImage";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import React from "react";
import { Cursor } from "../components/cursor";

const variants = {
  prev_slide_back_out: {
    duration: 1.2,
    ease: [0.165, 0.84, 0.44, 1],
  },

  work_slide_up: {
    duration: 1.2,
    ease: [0.165, 0.84, 0.44, 1],
  },
};

// Project details panel component
interface ProjectDetailsProps {
  project: {
    title: string;
    year: string;
    image: string[];
    number_of_images: number;
  } | null;
  onClose: () => void;
}

const ProjectDetailsPanel = ({ project, onClose }: ProjectDetailsProps) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#f5f0e8] text-[#3a2f2a] rounded-t-[40px] overflow-hidden flex justify-center"
      initial={{
        y: "100%",
        opacity: 1,
        width: "90%",
        left: "5%",
        right: "5%",
        height: "0vh",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: "100px",
        boxShadow: "0px -10px 50px rgba(0,0,0,0)",
      }}
      animate={{
        y: "5%",
        opacity: 1,
        width: "100%",
        left: "0%",
        right: "0%",
        height: "95vh",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        boxShadow: "0px -10px 50px rgba(0,0,0,0.1)",
      }}
      exit={{
        y: "100%",
        opacity: 1,
        scale: 0.95,
        width: "90%",
        left: "5%",
        right: "5%",
        height: "50vh",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: "100px",
        boxShadow: "0px -10px 50px rgba(0,0,0,0)",
      }}
      transition={{
        y: {
          duration: 1,
          ease: [0.165, 0.84, 0.44, 1],
        },
        width: {
          duration: 0.8,
          delay: 0.2,
          ease: [0.165, 0.84, 0.44, 1],
        },
        height: {
          duration: 0.7,
          delay: 0.1,
          ease: [0.165, 0.84, 0.44, 1],
        },
        left: {
          duration: 0.8,
          delay: 0.2,
          ease: [0.165, 0.84, 0.44, 1],
        },
        right: {
          duration: 0.8,
          delay: 0.2,
          ease: [0.165, 0.84, 0.44, 1],
        },
        scale: {
          duration: 0.5,
        },
        borderTopLeftRadius: {
          duration: 0.6,
          ease: [0.165, 0.84, 0.44, 1],
        },
        borderTopRightRadius: {
          duration: 0.6,
          ease: [0.165, 0.84, 0.44, 1],
        },
        boxShadow: {
          duration: 1.2,
        },
      }}
    >
      <div className="p-10 flex flex-col h-full relative z-10 max-w-5xl w-full">
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute right-10 top-10 bg-[#3a2f2a] bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#3a2f2a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* Content with staggered animations */}
        <div className="mt-10 max-w-4xl">
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
              ease: [0.165, 0.84, 0.44, 1],
            }}
          >
            <motion.h2
              className="text-5xl font-bold tracking-tight text-[#3a2f2a]"
              initial={{ letterSpacing: "0.2em" }}
              animate={{ letterSpacing: "0.05em" }}
              transition={{
                duration: 1.2,
                delay: 0.9,
                ease: [0.165, 0.84, 0.44, 1],
              }}
            >
              {project.title}
            </motion.h2>
          </motion.div>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#3a2f2a] to-transparent w-full my-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 1.1,
              duration: 1,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            style={{ opacity: 0.3 }}
          />

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.7,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="mt-6 text-xl flex items-center"
          >
            <span className="text-[#3a2f2a] opacity-60 mr-2">Year:</span>
            <span>{project.year}</span>
          </motion.div>

          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{
              delay: 1.3,
              duration: 0.7,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="mt-10 text-lg text-[#3a2f2a] opacity-80 leading-relaxed"
          >
            <p>
              Detailed project description will come here. This panel features
              staggered animations for content elements, a sophisticated
              coffee-white color scheme, and an elegant entrance animation.
            </p>
            <p className="mt-4">
              The animation begins small and centered, then gracefully expands
              with a refined cubic-bezier curve that creates a smooth, pleasant
              motion effect.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

function Home_prev({}) {
  return (
    <motion.div className="home absolute scale-[96%] z-0">
      <motion.div className="flex h-full w-full items-center justify-center flex-col pb-[10vw] uppercase text-center text-white mt-[5vw]">
        <AuthorHeading
          timerduration={0}
          title={["harshit", "nagpal"]}
          textcolorWhite
          NoAnimation
        />
      </motion.div>
    </motion.div>
  );
}

// GravitationalBackground component
const GravitationalBackground = () => {
  // State to track viewport size
  const [isMobile, setIsMobile] = React.useState(false);

  // Check for mobile viewport on mount and resize
  React.useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden z-0 opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      {/* First blob - transitions between yellow and orange */}
      <motion.div
        className="absolute rounded-full filter blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 70%, rgba(255,215,0,0) 100%)",
        }}
        initial={{
          x: "60%",
          y: "20%",
          width: isMobile ? "120vw" : "60vw",
          height: isMobile ? "120vw" : "60vw",
        }}
        animate={{
          x: ["60%", "40%", "65%", "35%", "60%"],
          y: ["20%", "10%", "15%", "25%", "20%"],
          scale: [1, 1.2, 0.9, 1.1, 1],
          background: [
            "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 70%, rgba(255,215,0,0) 100%)",
            "radial-gradient(circle, rgba(255,140,0,0.8) 0%, rgba(255,140,0,0.2) 70%, rgba(255,140,0,0) 100%)",
            "radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,165,0,0.2) 70%, rgba(255,165,0,0) 100%)",
            "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 70%, rgba(255,215,0,0) 100%)",
          ],
        }}
        transition={{
          duration: 60,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          times: [0, 0.2, 0.5, 0.8, 1],
          x: {
            duration: 50,
            times: [0, 0.3, 0.5, 0.7, 1],
            ease: [0.1, 0.85, 0.2, 1],
          },
          y: {
            duration: 70,
            times: [0, 0.4, 0.6, 0.8, 1],
            ease: [0.4, 0.1, 0.9, 0.2],
          },
          background: {
            duration: 40,
            ease: "easeInOut",
          },
        }}
      />

      {/* Second blob - transitions between black and purple */}
      <motion.div
        className="absolute rounded-full filter blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
        }}
        initial={{
          x: "30%",
          y: "70%",
          width: isMobile ? "110vw" : "50vw",
          height: isMobile ? "110vw" : "50vw",
        }}
        animate={{
          x: ["30%", "10%", "25%", "15%", "30%"],
          y: ["70%", "60%", "75%", "80%", "70%"],
          scale: [1, 0.9, 1.1, 0.95, 1],
          background: [
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
            "radial-gradient(circle, rgba(75,0,130,0.8) 0%, rgba(75,0,130,0.2) 70%, rgba(75,0,130,0) 100%)",
            "radial-gradient(circle, rgba(138,43,226,0.8) 0%, rgba(138,43,226,0.2) 70%, rgba(138,43,226,0) 100%)",
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
          ],
        }}
        transition={{
          duration: 75,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          times: [0, 0.25, 0.6, 0.85, 1],
          x: {
            duration: 60,
            times: [0, 0.2, 0.5, 0.8, 1],
            ease: [0.1, 0.9, 0.3, 0.7],
          },
          y: {
            duration: 80,
            times: [0, 0.3, 0.6, 0.9, 1],
            ease: [0.4, 0.1, 0.7, 0.3],
          },
          background: {
            duration: 50,
            ease: "easeInOut",
          },
        }}
      />
    </motion.div>
  );
};

function Work() {
  const [itemCount, setItemCount] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<{
    title: string;
    year: string;
    image: string[];
    number_of_images: number;
  } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lenisRef = React.useRef<any>(null);
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  // Pre-render work items
  const workItems = React.useMemo(
    () => [
      {
        image: [studydeck],
        title: "Study-Deck",
        year: "2023",
        number_of_images: 1,
      },
      {
        image: [inter],
        title: "Inter-BITS",
        year: "2023",
        number_of_images: 1,
      },
      {
        image: [Main_sop, SideA_sop, SideB_sop],
        title: "BITS Pilani Main Website",
        year: "2023",
        number_of_images: 3,
      },
    ],
    []
  );

  // Generate repeated work items with memoization
  const generateRepeatedItems = React.useCallback(() => {
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      const index = i % workItems.length;
      const item = workItems[index];
      items.push(
        <motion.div
          key={`work-item-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: isTransitioning ? 0.8 + i * 0.1 : i * 0.1,
          }}
          onClick={() => handleProjectClick(item)}
        >
          <WorkImage
            image={item.image}
            title={item.title}
            year={item.year}
            number_of_images={item.number_of_images}
          />
        </motion.div>
      );
    }
    return items;
  }, [itemCount, workItems, isTransitioning]);

  // Handle transition completion
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const lenis = useLenis(({ scroll, limit }) => {
    if (!containerRef.current || isLoading) return;

    const container = containerRef.current;
    const containerHeight = container.scrollHeight;
    const scrollPosition = scroll;
    const windowHeight = window.innerHeight;

    // Start loading more items when we're 70% through the current content
    if (scrollPosition + windowHeight > containerHeight * 0.7) {
      setIsLoading(true);
      // Add more items with a slight delay to prevent stuttering
      setTimeout(() => {
        setItemCount((prev) => prev + 3);
        setIsLoading(false);
      }, 100);
    }
  });

  const handleProjectClick = (project: {
    title: string;
    year: string;
    image: string[];
    number_of_images: number;
  }) => {
    setSelectedProject(project);
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const handleClosePanel = () => {
    setSelectedProject(null);
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  // Update Lenis scroll instance when content changes
  React.useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.resize();
    }
  }, [itemCount]);


  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        touchInertiaMultiplier: 3,
      }}
    >
      <motion.div className="relative">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          <Home_prev />
        </motion.div>

        <motion.div
          className="bg-[#F4F0F0] rounded-[50px] z-50 absolute w-[100svw]"
          initial={{ y: "100%" }}
          animate={{ y: "-50px" }}
          transition={{
            duration: 1.2,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          {/* Add the gravitational background */}
          {/* <GravitationalBackground /> */}

          <motion.div className="relative">
            <motion.div className="h-[100svh] pt-[10vw]">
              <AuthorHeading
                timerduration={0}
                title={["recent", "work"]}
                subparagraph="A COLLECTION OF WORK, PAST AND PRESENT. SOME BUILT FOR TODAY, FOR
        TOMORROW AND OTHERS FOR THE FUTURE."
              />
            </motion.div>

            <div
              ref={containerRef}
              className="parent infinite-scroll-container relative"
            >
              {generateRepeatedItems()}
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailsPanel
              project={selectedProject}
              onClose={handleClosePanel}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <Cursor />
    </ReactLenis>
  );
}

export default Work;
