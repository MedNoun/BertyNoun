import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import Image from "next/image";
import { motion } from "framer-motion";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import Loader from "react-loader-spinner";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Mic({ passage, combinations, pages }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [clicked_mic, setClicked_mic] = useState(0);
  const [finish_animation, setFinish_animation] = useState(1);
  const [text, setText] = useState("Ask something !");
  const [answer, setAnswer] = useState("");
  const [command, setCommand] = useState();
  const [model, setmodel] = useState(null);
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setmodel(loadedModel);
    console.log("Model loaded");
  };

  useEffect(() => {
    loadModel();
    if (!browserSupportsSpeechRecognition) {
      setText("Your browser does not support :(");
    }
  }, []);

  function countWords(str) {
    const arr = str.split(" ");

    return arr.filter((word) => word !== "").length;
  }

  function checkCommand(text) {
    text = text.trim();
    let number_of_words = countWords(text);
    console.log("number of words : ", number_of_words);
    if (number_of_words == 1) {
      setCommand(text);
      for (let page of pages) {
        if (page.title === text) {
          console.log("this is a command really : ", text);
          return true;
        }
        console.log("this is not a command really : ", text);
      }
      return false;
    }
    for (let combination of combinations) {
      if (text.indexOf(combination) !== -1) {
        text = text.replace(combination, "");
        console.log("text replacement : ", text);
        checkCommand(text);
      }
    }
    return false;
  }

  async function handleText(text) {
    if (checkCommand(text)) {
      console.log("this is a command : ", command);
    } else {
      const answers = await model.findAnswers(text, passage);
      setAnswer(answers[0]);
      console.log(answers);
    }
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
              onClick={() => {
                setClicked_mic(0);
                setFinish_animation(0);
                SpeechRecognition.stopListening();
                let text_to_handle = transcript;
                handleText(text_to_handle);
              }}
              className="mic_photo"
              src="/images/icons/micstarts.gif"
              layout="fill"
              objectFit="cover"
            />
          ) : finish_animation == 1 ? (
            <Image
              onClick={() => {
                setClicked_mic(1);
                SpeechRecognition.startListening();
              }}
              className="mic_photo"
              src="/images/icons/mic.gif"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            setTimeout(() => {
              setFinish_animation(1);
            }, 500) && (
              <Image
                onClick={() => {
                  setClicked_mic(1);
                  SpeechRecognition.startListening();
                }}
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
        <div className="popover">{transcript ? transcript : text}</div>
      </motion.div>
    </div>
  );
}
