// src/components/TravelGlobe.tsx
import Globe from "react-globe.gl";
import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const trips = [
  { lat: 31.634, lng: 74.8723, label: "Amritsar", date: "JAN 2030", size: 2.0 },
  { lat: 19.076, lng: 72.8777, label: "Mumbai", date: "JAN 2030", size: 2.0 },
  { lat: 51.5072, lng: -0.1276, label: "London", date: "JAN 2030", size: 1.0 },
  {
    lat: 1.3521,
    lng: 103.8198,
    label: "Singapore",
    date: "JAN 2030",
    size: 1.0,
  },
  { lat: 25.6649, lng: 91.9029, label: "Umiam", date: "JAN 2030", size: 1.0 },
  { lat: 28.3711, lng: 75.5878, label: "Pilani", date: "JAN 2030", size: 1.0 },
  {
    lat: 12.9629,
    lng: 77.5775,
    label: "Bangalore",
    date: "JAN 2030",
    size: 1.0,
  },
  {
    lat: 49.2402,
    lng: 6.9969,
    label: "Saarbrucken, Germany",
    date: "JAN 2030",
    size: 1.0,
  },

  { lat: 51.2093, lng: 3.2247, label: "Bruges", date: "JAN 2030", size: 1.0 },
  { lat: 50.0755, lng: 14.4378, label: "Prague", date: "JAN 2030", size: 1.0 },
  {
    lat: 41.9028,
    lng: 12.4964,
    label: "Rome & Vatican City",
    date: "JAN 2030",
    size: 1.0,
  },
  { lat: 40.8518, lng: 14.2681, label: "Naples", date: "JAN 2030", size: 1.0 },

  {
    lat: 52.3676,
    lng: 4.9041,
    label: "Amsterdam",
    date: "JAN 2030",
    size: 1.0,
  },
];

// Pre-calculate arcs between consecutive trips for journey visualization
const arcs = trips.slice(0, -1).map((trip, i) => ({
  startLat: trip.lat,
  startLng: trip.lng,
  endLat: trips[i + 1].lat,
  endLng: trips[i + 1].lng,
  color: ["#111D1F", "#23393B", "#23393B"][i] || "#23393B",
}));

export default function TravelGlobe() {
  const globeRef = useRef<any>();
  const [globeReady, setGlobeReady] = useState(false);
  const { scrollYProgress } = useScroll();

  // Map scroll progress [0 → 1] to rotation [0 → 360°]
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Optimize globe initialization
  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      const controls = globe.controls();

      // Disable zoom functionality
      controls.enableZoom = false;
      controls.autoRotate = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.3;

      // Set initial view
      globe.pointOfView({ lat: 30, lng: 30, altitude: 2.2 }, 0);

      setGlobeReady(true);
    }
  }, []);

  // Handle scroll-based rotation
  useMotionValueEvent(rotation, "change", (val) => {
    if (globeReady && globeRef.current) {
      // Only update if globe is not being dragged
      const controls = globeRef.current.controls();
      if (!controls.mouseButtons.LEFT) {
        globeRef.current.pointOfView(
          { lat: 30, lng: val, altitude: 2.2 },
          0 // Instant transition for smooth scroll sync
        );
      }
    }
  });

  // Custom HTML marker for more aesthetic pins
  const htmlElements = useCallback((d: any) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="
        position: relative;
        animation: float 3s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, #fff 0%, #ff914d 40%, #ff6b35 100%);
          border-radius: 50%;
          box-shadow: 0 0 20px #ff914d, 0 0 40px #ff6b3580;
          animation: pulse 2s ease-in-out infinite;
        "></div>
        <div style="
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
          border: 1px solid #ff914d40;
        ">
          <div style="font-weight: bold;">${d.label}</div>
          <div style="color: #ff914d; font-size: 9px;">${d.date}</div>
        </div>
      </div>
    `;

    // Add hover effect
    el.style.cursor = "pointer";
    el.onmouseenter = () => {
      const tooltip = el.querySelector("div > div:last-child") as HTMLElement;
      if (tooltip) {
        tooltip.style.opacity = "1";
      }
    };
    el.onmouseleave = () => {
      const tooltip = el.querySelector("div > div:last-child") as HTMLElement;
      if (tooltip) {
        tooltip.style.opacity = "0";
      }
    };

    return el;
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 20px #ff914d, 0 0 40px #ff6b3580;
          }
          50% { 
            transform: scale(1.2);
            box-shadow: 0 0 30px #ff914d, 0 0 60px #ff6b3580;
          }
        }
      `}</style>

      <div className="w-screen relative">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          // HTML elements for custom pins
          htmlElementsData={trips}
          htmlElement={htmlElements}
          htmlAltitude={0.01}
          // Arcs for journey paths
          arcsData={arcs}
          arcColor="color"
          arcDashLength={1}
          arcDashGap={0.1}
          arcDashAnimateTime={7000}
          arcStroke={0.5}
          arcAltitudeAutoScale={0.3}
          // Performance optimizations
          enablePointerInteraction={true}
          animateIn={false}
          waitForGlobeReady={false}
          rendererConfig={{
            antialias: false, // Disable for better performance
            alpha: true,
            powerPreference: "high-performance",
          }}
          // Atmosphere settings
          atmosphereColor="#A0854B"
          atmosphereAltitude={0.9}
          showAtmosphere={true}
        />

        {/* Gradient overlay for aesthetic effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>
      </div>
    </>
  );
}
