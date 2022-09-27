import React, { useState } from "react";
import "regenerator-runtime/runtime";
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
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [clicked_mic, setClicked_mic] = useState(0);
  const [finish_animation, setFinish_animation] = useState(1);

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

  function handleStart() {
    setClicked_mic(1);
    SpeechRecognition.startListening();
  }

  function handleStop() {
    setClicked_mic(0);
    setFinish_animation(0);
    SpeechRecognition.stopListening();
  }

  return (
    <div className="mic_container">
      <div className="circle">
        <Image
          key="1"
          className="circle"
          src="/images/icons/gradient_circle.png"
          layout="fill"
          objectFit="contain"
        />
        <motion.div className="mic">
          {clicked_mic == 1 ? (
            <Image
              key="2"
              onClick={handleStop}
              className="mic_photo"
              src="/images/icons/micstarts.gif"
              layout="fill"
              objectFit="cover"
            />
          ) : finish_animation == 1 ? (
            <Image
              key="3"
              onClick={handleStart}
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
                key="4"
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
        <div className="popover">
          {transcript ? transcript : "Ask something about me"}
        </div>
      </motion.div>
    </div>
  );
}
