import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MedNoun({ url }) {
  let animation_third = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 0.1,
      left: 100,
      transition: {
        delay: 0.75,
      },
    },
  };
  let animation_second = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 0.2,
      left: 50,
      transition: {
        delay: 0.5,
      },
    },
  };

  return (
    <div className="images-container">
      <motion.div initial="hidden" animate="visible" variants={animation_third}>
        <div className="image-container third">
          <Image src={url} layout="fill" objectFit="contain" />
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animation_second}
      >
        <div className="image-container second">
          <Image src={url} layout="fill" objectFit="contain" />
        </div>
      </motion.div>
      <div className="image-container">
        <Image src={url} layout="fill" objectFit="contain" />
      </div>
    </div>
  );
}
