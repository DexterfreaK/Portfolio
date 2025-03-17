import { motion } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import CursorViewProject from "../components/CursorViewProject";
import { Link } from "react-router-dom";
import { useState } from "react";

function About() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <ReactLenis root options={{ wheelMultiplier: 1.2 }}>
      <div className="w-full bg-white flex flex-col items-center overflow-x-hidden">
        {/* Bio Section */}
        <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center md:items-start py-20 px-6 md:px-12">
          {/* Image Column */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="relative">
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">ME</div>
              <motion.div
                className="w-full aspect-[3/4] bg-gray-300 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Image placeholder - replace with actual image */}
                <div className="w-full h-full bg-gray-300"></div>
              </motion.div>
            </div>
          </div>
          
          {/* Text Column */}
          <div className="w-full md:w-1/2 md:pl-10">
            <motion.p 
              className="text-sm font-MonumentGrotesk tracking-wide mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              HARSHIT NAGPAL - EST 1995
            </motion.p>
            
            <motion.h2 
              className="text-[8vw] md:text-[5vw] font-MonumentGroteskBold leading-none mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AWKWARD<br/>DANCER
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl font-MonumentGrotesk mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A designer who thinks "multi-disciplinary" is a buzzword
              and wonders why we write bios in third-person.
            </motion.p>
            
            <motion.p 
              className="text-base font-MonumentGrotesk mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I've been designing brands and digital experiences for almost a decade, approaching
              each project with equal parts strategy and style. Currently living in San Diego, CA, and
              working with the talented team at Five&Done in Orange County.
            </motion.p>
            
            <motion.p 
              className="text-base font-MonumentGrotesk mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              When I'm not photosynthesizing in the warm glow of my computer screen, you can find
              me reading an old book, reorganizing my living space (again), and snacking on an
              unhealthy amount of Goldfish and trail mix.
            </motion.p>
            
            <motion.p 
              className="text-base font-MonumentGrotesk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              If you have any exciting projects to talk about, or just want to be friends, feel free to hit
              me up.
            </motion.p>
          </div>
        </div>
        
        {/* Main CONTACT heading */}
        <motion.h1 
          className="text-[18vw] font-MonumentGroteskBold leading-none mt-20 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          CONTACT
        </motion.h1>
        
        {/* Two contact options */}
        <div className="w-[90vw] max-w-[1200px] flex flex-col md:flex-row mb-20">
          {/* Project option */}
          <motion.div 
            className="w-full md:w-1/2 bg-black text-white p-8 md:p-12 flex flex-col justify-center items-center cursor-pointer mb-4 md:mb-0 md:mr-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="w-full max-w-md">
              <p className="text-sm uppercase tracking-wider mb-4">LET'S TALK ABOUT</p>
              <h2 className="text-5xl md:text-6xl font-MonumentGroteskBold">A PROJECT</h2>
            </div>
          </motion.div>
          
          {/* Something else option */}
          <motion.div 
            className="w-full md:w-1/2 bg-white text-black border border-black p-8 md:p-12 flex flex-col justify-center cursor-pointer md:ml-2 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className="w-full max-w-md relative">
              <p className="text-sm uppercase tracking-wider mb-4">LET'S TALK ABOUT</p>
              <div className="flex items-center justify-between overflow-hidden relative">
                <motion.h2 
                  className="text-5xl md:text-6xl font-MonumentGroteskBold"
                  animate={{ 
                    x: isHovered ? "-5%" : "0%",
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                >
                  SOMETHING ELSE
                </motion.h2>
                <motion.div
                  className="flex items-center absolute right-0"
                  initial={{ opacity: 0, x: -20, width: "0%" }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -20,
                    width: isHovered ? "15%" : "0%"
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                >
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform scale-150"
                  >
                    <motion.path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="black" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: isHovered ? 1 : 0 
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.19, 1, 0.22, 1] 
                      }}
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* <CursorViewProject/> */}
    </ReactLenis>
  );
}

export default About;
