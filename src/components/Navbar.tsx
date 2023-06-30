import {
  cubicBezier,
  motion
} from "framer-motion";


export default function Navbar({
  timerduration,
}: {
  timerduration: number;
}) {
  return (
    <header className="fixed bottom-[3rem] z-[1000] w-[100%] flex justify-center">
      <motion.div
        className="relative bg-black/40 w-[15em] rounded-lg backdrop-blur-md"
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: "15em",
          opacity: 1,
        }}
        transition={{
          delay: timerduration + 1,
          ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
          duration: 1,
        }}
      >
        <ul className="flex text-white font-MonumentGroteskBold justify-around p-[.8vh]">
          <li className="pb-[15px]">
            <a href="\">Home</a>
          </li>
          <li className="pb-[15px]">
            <a href="\work">Work</a>
          </li>
          <li className="pb-[15px]">About</li>
        </ul>
        <motion.div
          className="absolute left-0 bottom-1/4 w-full h-[3px] bg-white origin-left rounded-full js-menu-line"
          style={{ transform: "translate(32px) scale(0.1, 1)" }}
        />
      </motion.div>
    </header>
  );
}