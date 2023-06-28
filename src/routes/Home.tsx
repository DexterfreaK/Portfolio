import "./Home.css";
import { motion } from "framer-motion";
import Timer from "../components/Timer";
import HomePage from "../components/HomePage";

function Home() {

  const timerduration = 1;
  
  return (
    <motion.div className="app_container">
      <Timer timerduration={timerduration} />
      <HomePage timerduration={timerduration} />
    </motion.div>
  );
}

export default Home;
