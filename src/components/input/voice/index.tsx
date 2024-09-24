import React, { useState } from "react";
import VoiceIcon from "../../../assests/voice_icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { chatDataAtom, historyAtom , loadingAtom} from "@/atoms";
import { postMessage } from "@/services/api/api";
import { usePathname } from "next/navigation";


declare global {
  interface Window {
    webkitSpeechRecognition: any;
    mozSpeechRecognition: any;
    msSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

function InputWithVoice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const [, setHistory] = useAtom(historyAtom);
  const [, setChatData] = useAtom(chatDataAtom);
  const [loading, setLoading] = useAtom(loadingAtom)
  const pathname = usePathname()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (message: string) => {
    setLoading(true)
    const onContentReceived = (newContent: string) => {
      setChatData((prevData) => {
        const lastResponseIndex = prevData.responses.length - 1;

        return {
          ...prevData,
          responses: prevData.responses.map((response, index) =>
            index === lastResponseIndex
              ? { ...response, content: response.content + newContent }
              : response
          ),
        };
      });
    };

    const onParsedChunkReceived = (parsedChunkData: any) => {
      const sources = parsedChunkData?.sources || [];

      setChatData((prevChatData) => ({
        ...prevChatData,
        responses: [
          ...prevChatData.responses,
          { sources, content: "", timestamp: new Date().toISOString() },
        ],
      }));

      setSearchQuery("");
    };

    try {
      await postMessage(message, onContentReceived, onParsedChunkReceived);
    } catch (error) {
      console.error("Error during postData call:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery) {
      if(pathname == "/") {
        router.push("/chat");
      }
      setHistory((prev) => [
        ...prev,
        { value: searchQuery, timestamp: new Date().toISOString() },
      ]);
      setChatData((prev) => ({
        ...prev,
        searchValues: [...prev.searchValues, searchQuery],
      }));
      handleSearch(searchQuery);
    }
  };

  const handleClick = () => {
    if (searchQuery) {
      if(pathname == "/") {
        router.push("/chat");
      }
      setHistory((prev) => [
        ...prev,
        { value: searchQuery, timestamp: new Date().toISOString() },
      ]);
      setChatData((prev) => ({
        ...prev,
        searchValues: [...prev.searchValues, searchQuery],
      }));
      handleSearch(searchQuery);
    }
  };

  let recognition: any;

  if (typeof window !== 'undefined' && !recognition) {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = true;
    }
  }

  const handleMicClick = () => {
    if (!recognition) return;

    console.log('is listening', isListening);
    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onend = () => {
        recognition.start();
        console.log('on end hit');
      };
    } else {
      recognition.stop();
      console.log('stop krdo');
      setIsListening(false);
    }

    let finalTranscript = "";
    let interimTranscript = "";

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        console.log("transcript", transcript);

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          setSearchQuery(finalTranscript);
        } else {
          interimTranscript += transcript;
        }

        console.log("final transcript", finalTranscript);
        console.log("interim transcript", interimTranscript);
      }
    };

    setTimeout(() => {
      console.log('stop krdo 3');
      recognition.stop();
      setIsListening(false);
    }, 15000);
  };

  return (
    <div className="relative w-full flex items-center lg:gap-[10px] gap-[5px]">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="bg-[#0c1019] font-roboto text-white rounded-[12px] h-[56px] w-full p-[2px_6px_2px_20px] border border-[rgba(255,255,255,0.10)]"
      />
      {!searchQuery && (
        <div onClick={handleMicClick} className="absolute right-[60px] cursor-pointer inset-y-0 flex items-center">
          <Image src={VoiceIcon} alt="voice_icon" />
        </div>
      )}
      <div
        onClick={handleClick}
        className="flex animated-svg cursor-pointer items-center justify-center rounded-[12px] w-[53px] h-[54px] bg-purple-gradient"
      >
        <svg
          width="18"
          height="24"
          viewBox="0 0 18 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.890625 7.14358L0.890625 9.5006H3.24765L3.24765 7.14381H5.60444V4.78701H7.81996V4.9284H10.177L10.177 2.57138H10.1765V0.214758H7.81944L7.81944 2.42999H5.60421V4.78678H3.24742L3.24742 7.14358H0.890625ZM7.81927 9.64314V12.0002H7.81962L7.81962 14.3566H10.1766V11.9996H10.1763V9.64314H7.81927ZM7.81944 9.64285L7.81944 7.28583H10.1765V9.64285H7.81944ZM10.3195 4.78598L10.3195 2.42896H12.6765L12.6765 4.78592L15.0335 4.78592V7.14289H17.3905V9.49991H15.0335V7.14294L12.6765 7.14294V4.78598H10.3195ZM7.81979 4.92869V7.28571H10.1768V4.92869H7.81979ZM7.81944 14.3569V16.7139H7.81996V19.0705H10.177L10.177 16.7135H10.1765V14.3569H7.81944ZM7.81962 19.0707L7.81962 21.4277H10.1766V19.0707H7.81962ZM7.81962 23.7852V21.4281H10.1766V23.7852H7.81962Z"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

export default InputWithVoice;
