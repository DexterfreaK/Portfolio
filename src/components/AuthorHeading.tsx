import { motion } from "framer-motion";

export default function AuthorHeading() {
  return (
    <motion.div className="flex h-full w-full items-center justify-center flex-col pb-[10vw] uppercase text-center">
      <motion.div className="pb-[6vw] font-MonumentGroteskRegular text-white text-[10vw] leading-[8vw] ">
        Harshit
        <br />
        Nagpal
      </motion.div>
      <motion.div className="text-white text-[1vw] leading-[1.5vw] whitespace-normal w-[30vw]">
        Website under Contruction. Website under Contruction. Website
        under Contruction.
      </motion.div>
    </motion.div>
  );
}
