import { motion } from "framer-motion";

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
        "relative font-MonumentGroteskMedium text-white " + props.gridFormat
      }
    >
      <img
        className="object-contain rounded-[1rem] hover:rounded-[0rem] hover:brightness-75 transition-all duration-250 ease-in-out w-[100vw]"
        src={props.image}
        alt="InterBits Landing Page"
      />
      <motion.div
        className=" absolute top-0 w-full h-full opacity-0"
        whileHover={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
      >
        <motion.div className="absolute bottom-0 w-[100%] text-center p-[3vw] text-[3vw]">
          {props.title}
        </motion.div>
        <motion.div className="absolute top-0 w-[100%] flex justify-between py-[1vh] text-[1vw]">
          <motion.div></motion.div>
          <motion.div className="flex">
            {props.year}
            <motion.div className="h-[1vw] w-[1vw] bg-white rounded-full m-[.6vw]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
