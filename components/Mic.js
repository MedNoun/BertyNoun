import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Mic() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportSpeechRecognition,
  } = useSpeechRecognition();
  const [clicked_mic, setClicked_mic] = useState(0);
  const [finish_animation, setFinish_animation] = useState(1);

  if (!browserSupportSpeechRecognition) {
    return "unsupported";
  }

  let popover_onstart = {
    hidden: {
      top: "25%",
      opacity: 0,
    },
    visible: {
      opacity: 1,
      top: 0,
      transition: {
        delay: 2,
        duration: 1,
      },
    },
  };

  let mic = {};
  return (
    <div className="mic_container">
      <div className="circle">
        <Image
          className="circle"
          src="/images/icons/gradient_circle.png"
          layout="fill"
          objectFit="contain"
        />
        <motion.div initial="" animate="" variants={mic} className="mic">
          {clicked_mic == 1 ? (
            <Image
              onClick={() => {
                setClicked_mic(0);
                setFinish_animation(0);
              }}
              className="mic_photo"
              src="/images/icons/micstarts.gif"
              layout="fill"
              objectFit="cover"
            />
          ) : finish_animation == 1 ? (
            <Image
              onClick={() => setClicked_mic(1)}
              className="mic_photo"
              src="/images/icons/mic.gif"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            setTimeout(() => {
              setFinish_animation(1);
            }, 550) && (
              <Image
                onClick={() => setClicked_mic(1)}
                className="mic_photo"
                src="/images/icons/micstop.gif"
                layout="fill"
                objectFit="cover"
              />
            )
          )}
        </motion.div>
      </div>
      <motion.div initial="hidden" animate="visible" variants={popover_onstart}>
        <div className="popover">Ask something about me</div>
      </motion.div>
    </div>
  );
}
