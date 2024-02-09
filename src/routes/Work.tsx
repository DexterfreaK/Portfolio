import { motion, cubicBezier } from "framer-motion";
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
    duration: 2,
    ease: cubicBezier(0.19, 1, 0.22, 1),
  },

  work_slide_up: {
    duration: 2,
    ease: cubicBezier(0.19, 1, 0.22, 1),
  },
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

function Work() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Ensure gridRef.current is not null before calling repeatItems
    if (ref.current) {
      repeatItems(ref.current, 3);
    }
  }, []);

  const repeatItems = (parentEl: HTMLElement, total = 0) => {
    const items: HTMLElement[] = [...parentEl.children] as HTMLElement[];

    for (let i = 0; i <= total - 1; ++i) {
      var cln = items[i].cloneNode(true) as HTMLElement;
      parentEl.appendChild(cln);
    }
  };

  return (
    <ReactLenis root>
      <motion.div className="">
        <motion.div
          initial={{ filter: "brightness(100%)", scale: 1 }}
          animate={{ filter: "brightness(50%)", scale: 0.98 }}
          transition={{
            duration: variants.prev_slide_back_out.duration,
            ease: variants.prev_slide_back_out.ease,
          }}
        >
          <Home_prev />
        </motion.div>

        <motion.div
          className="bg-[#F4F0F0] rounded-[50px] z-50 absolute w-[100svw]"
          initial={{ opacity: 1, y: 2000 }}
          animate={{ opacity: 1, y: -50 }}
          transition={{
            duration: variants.work_slide_up.duration,
            ease: variants.work_slide_up.ease,
          }}
        >
          <motion.div className="">
            <motion.div className="h-[100svh] pt-[10vw]">
              <AuthorHeading
                timerduration={0}
                title={["recent", "work"]}
                subparagraph="A COLLECTION OF WORK, PAST AND PRESENT. SOME BUILT FOR TODAY, FOR
        TOMORROW AND OTHERS FOR THE FUTURE."
              />
            </motion.div>

            <div className="parent" >
              <WorkImage
                image={[studydeck]}
                title="Study-Deck"
                year="2023"
                number_of_images={1}
              />
              <WorkImage
                image={[inter]}
                title="Inter-BITS"
                year="2023"
                number_of_images={1}
              />
              <WorkImage
                image={[Main_sop, SideA_sop, SideB_sop]}
                title="BITS Pilani Main Website"
                year="2023"
                number_of_images={3}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <Cursor />
    </ReactLenis>
  );
}

export default Work;
