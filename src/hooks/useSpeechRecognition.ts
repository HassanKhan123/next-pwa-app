import { useState, useEffect } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    mozSpeechRecognition: any;
    msSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const useSpeechRecognition = (
  onTranscriptChange: (transcript: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition;

      if (SpeechRecognition) {
        const recognition2 = new SpeechRecognition();
        recognition2.lang = "en-US";
        recognition2.interimResults = true;
        recognition2.maxAlternatives = 1;
        recognition2.continuous = true;
        setRecognition(recognition2);
      }
    }
  }, [
    global.window?.SpeechRecognition,
    global.window?.webkitSpeechRecognition,
    global.window?.mozSpeechRecognition,
    global.window?.msSpeechRecognition,
  ]);

  const startListening = () => {
    if (!recognition) return;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      let interimText = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript + " ";
        } else {
          interimText += transcript;
        }
      }

      setFinalTranscript((prev) => prev + finalText);
      setInterimTranscript(interimText);
      onTranscriptChange(finalText || interimText);
    };

    recognition.onerror = (event: any) => {
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false)
      if (isListening) recognition.start();
    };

  };

  const stopListening = () => {
    if (!recognition) return;
    recognition.stop();
    setIsListening(false);
  };

  return {
    isListening,
    startListening,
    stopListening,
    finalTranscript,
    interimTranscript,
  };
};

export default useSpeechRecognition;
