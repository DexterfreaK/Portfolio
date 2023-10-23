import { motion, cubicBezier } from "framer-motion";
import AuthorHeading from "../components/AuthorHeading";
import inter from '../assets/interbits-assets/InterbitsBG.png'
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import CursorViewProject from "../components/CursorViewProject";

function About() {
  return (
    <ReactLenis root>
      <CursorViewProject/>
    </ReactLenis>
  );
}

export default About;
