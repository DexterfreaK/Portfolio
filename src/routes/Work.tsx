import { motion, cubicBezier } from "framer-motion";

import AuthorHeading from "../components/AuthorHeading";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";

import inter from "../assets/interbits-assets/InterbitsBG.png";
import WorkImage from "../components/WorkImage";

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
function Work() {

  
  return (
    <motion.div>
      <motion.div
        initial={{ filter: "brightness(100%)" }}
        animate={{ filter: "brightness(50%)" }}
      >
        <Home_prev />
      </motion.div>
      <motion.div
        className="bg-[#F4F0F0] rounded-3xl z-50 absolute"
        initial={{ opacity: 1, y: 2000 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: cubicBezier(0.19, 1, 0.22, 1) }}
      >
        <Navbar timerduration={0} />
        <SmoothScroll>
          <motion.div className="">
            <motion.div className="h-almost-screen max-h-[50rem] pt-[10vw]">
              <AuthorHeading timerduration={0} title={["recent", "work"]} />
            </motion.div>
            <WorkImage image={inter} />
          </motion.div>
        </SmoothScroll>
      </motion.div>
    </motion.div>
  );
}

export default Work;
