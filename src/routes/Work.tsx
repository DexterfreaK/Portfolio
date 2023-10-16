import { motion, cubicBezier } from "framer-motion";

import AuthorHeading from "../components/AuthorHeading";
import Navbar from "../components/Navbar";
// import SmoothScroll from "../components/SmoothScroll";
import inter from "../assets/interbits-assets/InterbitsBG.png";
import WorkImage from "../components/WorkImage";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function Home_prev({}) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

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
    <motion.div className="">
      <motion.div
        initial={{ filter: "brightness(100%)", scale: 1 }}
        animate={{ filter: "brightness(50%)", scale: 0.98 }}
        transition={{ duration: 0.5, ease: cubicBezier(0.19, 1, 0.22, 1) }}
      >
        <Home_prev />
      </motion.div>
      <motion.div
        className="bg-[#F4F0F0] rounded-[50px] z-50 absolute w-[100svw]"
        initial={{ opacity: 1, y: 2000 }}
        animate={{ opacity: 1, y: -50 }}
        transition={{ duration: 5, ease: cubicBezier(0.19, 1, 0.22, 1) }}
      >
        {/* <SmoothScroll> */}
        <ReactLenis root>
          <motion.div className="">
            <motion.div className="h-[100svh] pt-[10vw]">
              <AuthorHeading timerduration={0} title={["recent", "work"]} />
            </motion.div>
            <WorkImage image={inter} title="Inter-BITS" year="2023" />
          </motion.div>
        </ReactLenis>
        {/* </SmoothScroll> */}
      </motion.div>
      <Navbar timerduration={0} />
    </motion.div>
  );
}

export default Work;
