import {
  motion
} from "framer-motion";


export default function Navbar() {

    return (
      <header className="fixed bottom-[2rem] z-[1000] w-[100%] flex justify-center">
        <motion.div className="relative bg-black/40 w-[15em] rounded-lg p-[.8vh]">
          <ul className="flex text-white font-MonumentGroteskBold justify-around">
            <li className="pb-[15px]">Home</li>
            <li className="pb-[15px]">Work</li>
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