import { motion } from "framer-motion";

interface WorkImageProps {
  image: string;
}

export default function WorkImage(props: WorkImageProps) {
  return (
    <motion.article className="m-[1vw] ">
      <img
        className="object-contain rounded-[1rem] hover:rounded-[0rem] hover:brightness-75 transition-all duration-250 ease-in-out"
        src={props.image}
        alt="InterBits Landing Page"
      />
    </motion.article>
  );
}
