// ScrollRestoration.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis"; // assuming you're using reactLenis

export default function ScrollRestoration() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Reset scroll to top immediately when the path changes
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}
