import "./Home.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Timer from "../components/Timer";
import HomePage from "../components/HomePage";
import { Cursor } from "../components/cursor";

function Home() {
  const timerduration = 3;
  const navigate = useNavigate();

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // console.log("Wheel event detected", e.deltaY);
    // You can add a threshold if needed.
    if (e.deltaY > 0) {
      navigate("/work");
    }
  };


  return (
    <motion.div className="outer_home_container" onWheel={handleWheel}>
      {/* <Timer timerduration={timerduration} /> */}
      <HomePage timerduration={0} />
      {/* <Cursor /> */}
    </motion.div>
  );
}

export default Home;
