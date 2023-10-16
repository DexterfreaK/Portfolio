import { motion } from "framer-motion";

interface WorkImageProps {
  image: string;
  title: string;
  year: string;
}

export default function WorkImage(props: WorkImageProps) {
  return (
    <motion.article className="m-[1vw] relative font-MonumentGroteskMedium text-white">
      <img
        className="object-contain rounded-[1rem] hover:rounded-[0rem] hover:brightness-75 transition-all duration-250 ease-in-out w-[100vw]"
        src={props.image}
        alt="InterBits Landing Page"
      />
      <motion.div
        className=" absolute top-0 w-full h-full opacity-0"
        whileHover={{
          opacity: 1,
          transition: { duration: 1 },
        }}
      >
        <motion.div className="absolute bottom-0 w-[100%] text-center p-[3vw] text-[3vw]">
          {props.title}
        </motion.div>
        <motion.div className="absolute top-0 w-[100%] flex justify-between py-[1vh] text-[1vw]">
          <motion.div></motion.div>
          <motion.div className="flex">
            {props.year}
            <motion.div className="h-[1vw] w-[1vw] bg-white rounded-full m-[.6vw]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
