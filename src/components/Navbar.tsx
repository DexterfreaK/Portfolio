import { cubicBezier, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavbarStore, NavbarState } from "../store";

function NavbarOption({ title, state }: { title: string; state: NavbarState }) {
  
  const setNavbarCurrentState = useNavbarStore(
    (state) => state.setNavbarCurrentState
  );
  return (
    <li className="flex-1 grid place-items-center">
      <Link
        className="px-[18px]"
        to={"/" + title}
        onClick={() => {
          setNavbarCurrentState(state);
        }}
      >
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Link>
    </li>
  );
}



export default function Navbar({
  timerduration,
  animateOff,
}: {
  timerduration: number;
  animateOff?: boolean;
}) {


  const NavbarCurrentState = useNavbarStore(
    (state) => state.NavbarCurrentState
  );

  return (
    <header className="fixed bottom-[2rem] z-[1000] w-[100%] flex justify-center">
      <motion.div
        className="relative bg-black/40 w-[15em] rounded-lg backdrop-blur-md"
        initial={{
          width: animateOff ? "15em" : "0em",
          opacity: animateOff ? 1 : 0,
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
        <ul className="flex text-white font-MonumentGroteskBold text-[14px] h-[45px]">
          <NavbarOption title="home" state={NavbarState.Home} />
          <NavbarOption title="work" state={NavbarState.Work} />
          <NavbarOption title="about" state={NavbarState.About} />
        </ul>
        <motion.div
          className="absolute left-0 bottom-[10px] w-full h-[3px] bg-white origin-left rounded-full js-menu-line"
          animate={{
            transform: NavbarCurrentState,
          }}
          transition={{
            duration: 1,
            ease: cubicBezier(0.19, 1, 0.22, 1),
          }}
        />
      </motion.div>
    </header>
  );
}
