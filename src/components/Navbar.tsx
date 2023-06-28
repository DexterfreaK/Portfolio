import {
  motion
} from "framer-motion";


export default function Navbar() {

    return (
      <header className="fixed bottom-[3rem] z-[1000] w-[100%] flex justify-center">
        <motion.div className="relative bg-black/40 w-[15em] rounded-lg p-[1vh]">
          <ul className="flex text-white font-MonumentGroteskBold justify-around">
            <li className="pb-[15px]">Home</li>
            <li className="pb-[15px]">Work</li>
            <li className="pb-[15px]">About</li>
          </ul>
        </motion.div>
      </header>
    );

}