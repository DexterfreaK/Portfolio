import "./Home.css";
import { motion } from "framer-motion";
import Timer from "../components/Timer";
import HomePage from "../components/HomePage";

function Home() {
  const timerduration = 0;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   window.addEventListener("scroll", () => navigate("/work"), false);
  // }, []);

  return (
    <motion.div className="app_container">
      <Timer timerduration={timerduration} />
      <HomePage timerduration={timerduration} />
    </motion.div>
  );
}

export default Home;
