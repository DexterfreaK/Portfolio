import { motion } from "framer-motion";
import AuthorHeading from "../components/AuthorHeading";
import Navbar from "../components/Navbar";

function Work() {
  return (
    <motion.div className="bg-[#F4F0F0] min-h-[100svh] w-[100svw]">
      <AuthorHeading timerduration={0} title={["recent", "work"]} />
      <Navbar timerduration={0} />
    </motion.div>
  );
}

export default Work;
