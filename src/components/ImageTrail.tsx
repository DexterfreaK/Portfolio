import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type for the image objects in the trail effect
type TrailImage = {
  id: number;
  src: string;
  x: number;
  y: number;
  startRotation: number;
  endRotation: number;
};

// Your array of images
const trailImages: string[] = [
  "/fun-times/1.jpg",
  "/fun-times/2.jpg",
  "/fun-times/3.jpg",
  "/fun-times/4.jpg",
  "/fun-times/5.jpg",
  "/fun-times/6.jpg",
  "/fun-times/7.jpg",
  "/fun-times/8.jpg",
  "/fun-times/9.jpg",
  "/fun-times/10.jpg",
  "/fun-times/11.jpg",
  "/fun-times/12.jpg",
  "/fun-times/13.jpg",
  "/fun-times/14.jpg",
  "/fun-times/15.jpg",
  "/fun-times/16.jpg",
  "/fun-times/17.jpg",
  "/fun-times/18.jpg",
  "/fun-times/19.jpg",
  "/fun-times/20.jpg",
  "/fun-times/21.jpg",
  "/fun-times/22.jpg",
  "/fun-times/23.jpg",
  "/fun-times/24.jpg",
  "/fun-times/25.jpg",
  "/fun-times/26.jpg",
  "/fun-times/27.jpg",
  "/fun-times/28.jpg",
  "/fun-times/29.jpg",
  "/fun-times/30.jpg",
  "/fun-times/31.jpg",
  "/fun-times/32.jpg",
  "/fun-times/33.jpg",
    "/fun-times/34.jpg",
    "/fun-times/35.jpg",
    "/fun-times/36.jpg",
    "/fun-times/37.jpg",
    "/fun-times/38.jpg",
    "/fun-times/39.jpg",
];

interface ImageTrailProps {
  children: ReactNode;
}

export const ImageTrail: React.FC<ImageTrailProps> = ({ children }) => {
  const [images, setImages] = useState<TrailImage[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isThrottled = useRef<boolean>(false);
  // MODIFICATION: Add a ref to store the src of the last shown image.
  const lastImageSrc = useRef<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isThrottled.current || !containerRef.current) return;

    isThrottled.current = true;
    setTimeout(() => {
      isThrottled.current = false;
    }, 50);

    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // MODIFICATION: Logic to select a new, unique image source.
    let newSrc: string;
    // Handle the edge case of having 1 or 0 images.
    if (trailImages.length <= 1) {
      newSrc = trailImages[0] || "";
    } else {
      // Loop until we find an image that's different from the last one.
      do {
        newSrc = trailImages[Math.floor(Math.random() * trailImages.length)];
      } while (newSrc === lastImageSrc.current);
    }

    // Update the ref with the new source for the next mouse move.
    lastImageSrc.current = newSrc;

    const newImage: TrailImage = {
      id: Date.now(),
      src: newSrc, // Use the new, guaranteed-to-be-different source
      x: cursorX,
      y: cursorY,
      startRotation: Math.random() * 40 - 20,
      endRotation: Math.random() * 40 - 20,
    };

    setImages((prev) => [...prev, newImage]);

    setTimeout(() => {
      setImages((prev) => prev.filter((img) => img.id !== newImage.id));
    }, 1800);
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {children}
      <AnimatePresence>
        {images.map((img) => (
          <motion.img
            key={img.id}
            src={img.src}
            alt="Image Trail"
            className="w-40 h-auto absolute rounded-lg object-cover shadow-2xl"
            style={{
              left: img.x,
              top: img.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{
              scale: 0,
              rotate: img.startRotation,
            }}
            animate={{
              scale: 1.1,
              rotate: img.endRotation,
            }}
            exit={{
              scale: 0,
              rotate: img.startRotation,
              transition: { duration: 0.6, ease: [0.7, 0, 0.25, 1] },
            }}
            transition={{
              scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 1.8, ease: "linear" },
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
