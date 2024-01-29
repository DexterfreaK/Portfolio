import { motion } from "framer-motion";
import CursorViewProject from "./CursorViewProject";
export interface gridProperty {
  main: layoutMain;
}

export enum layoutMain {
  fullscreen = "",
  three = "grid-cols-3 gap-4",
}

enum fullscreen {
  fullscreen = "",
}
enum three_section {
  left_major = " col-span-2 ",
  right_minor = " col-span-1 ",
}
const layoutImage = {
  fullscreen,
  three_section,
};
interface WorkImageProps {
  image: string;
  title: string;
  year: string;
  number_of_images: number;
}

interface eachWorkImageProps {
  image: string;
  title: string;
  year: string;
  gridFormat?: string;
}

export function WorkImage(props: WorkImageProps) {
  return (
    <>
      {props.number_of_images == 1 && (
        <motion.article className={"grid m-[1vw]"}>
          <WorkImageSection
            props={{
              image: props.image,
              title: props.title,
              year: props.year,
            }}
          />
        </motion.article>
      )}

      {props.number_of_images == 3 && (
        <motion.article className={"grid grid-cols-3"}>
          <WorkImageSection
            props={{
              image: props.image,
              title: props.title,
              year: props.year,
              gridFormat: "col-span-2 m-[1vw]",
            }}
          />
          <motion.article className={"grid grid-rows-1 "}>
            <WorkImageSection
              props={{
                image: props.image,
                title: props.title,
                year: props.year,
                gridFormat: "m-[1vw]",
              }}
            />
            <WorkImageSection
              props={{
                image: props.image,
                title: props.title,
                year: props.year,
                gridFormat: "m-[1vw]",
              }}
            />
          </motion.article>
        </motion.article>
      )}
    </>
  );
}

function WorkImageSection({ props }: { props: eachWorkImageProps }) {
  return (
    <motion.article
      className={
        "cursor-none relative font-MonumentGroteskMedium text-white object-fill " +
        props.gridFormat
      }
    >
      <img className="rounded-[1rem]" src={props.image} alt={props.title} />
      {/* <CursorViewProject /> */}
      <motion.div
        className="absolute top-0 w-full h-full opacity-0 bg-black rounded-[1rem]"
        whileHover={{
          opacity: 0.55,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <motion.div className="opacity-100">
          <motion.div className="absolute bottom-[30px] w-[100%] text-center p-[3vw] text-[3vw]">
            {props.title}
          </motion.div>
          <motion.div className="absolute top-0 w-[100%] flex justify-between py-[1vh] text-[1vw]">
            <motion.div className="_"></motion.div>
            <motion.div className="flex mt-[10px] mr-[20px]">
              {props.year}
              <motion.div className="h-[1vw] w-[1vw] bg-white rounded-full m-[.6vw]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
