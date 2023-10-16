import { cubicBezier, motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavbarOption({ title }: { title: string }) {
  return (
    <li className="flex-1 grid place-items-center">
      <Link className="px-[18px]" to={"/" + title}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Link>
    </li>
  );
}

export default function Navbar({ timerduration }: { timerduration: number }) {
  return (
    <header className="fixed bottom-[3rem] z-[1000] w-[100%] flex justify-center">
      <motion.div
        className="relative bg-black/40 w-[15em] rounded-lg backdrop-blur-md"
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: "15em",
          opacity: 1,
        }}
        transition={{
          delay: timerduration + 1,
          ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
          duration: 1,
        }}
      >
        <ul className="flex text-white font-MonumentGroteskBold h-[55px]">
          <NavbarOption title="home" />
          <NavbarOption title="work" />
          <NavbarOption title="about" />
        </ul>
        <motion.div
          className="absolute left-0 bottom-1/4 w-full h-[3px] bg-white origin-left rounded-full js-menu-line"
          style={{ transform: "translate(32px) scale(0.1, 1)" }}
        />
      </motion.div>
    </header>
  );
}
