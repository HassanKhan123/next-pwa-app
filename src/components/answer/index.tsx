import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReloadIcon from "../../assests/reload_icon.svg";
import AttachmentIcon from "../../assests/attachment_icon.svg";
import SaveIcon from "../../assests/save_icon.svg";
import ShareIcon from "../../assests/share_icon.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MarkdownRenderer from "./MarkdownRenderer";
import { bookmarkAtom } from "@/atoms";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDistanceToNow } from "date-fns";
import { Tooltip } from "react-tooltip";

interface AnswerCardProps {
  isLoading: boolean;
  text: string;
  searchValue: string;
  time: string;
  id: string; 
  handleRebuild: () => void
}

function AnswerCard({ isLoading, text, searchValue, time, id, handleRebuild }: AnswerCardProps) {
  const [bookmarks, setBookmarks] = useAtom(bookmarkAtom);
  const [formattedTime, setFormattedTime] = useState<string | null>(null);
  const markdownContent = MarkdownRenderer({ text });

  const handleBookmark = () => {
    if (bookmarks.includes(searchValue)) {
      toast.info("This query is already bookmarked.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    setBookmarks((prevBookmarks) => [...prevBookmarks, searchValue]);
    toast.success("Bookmark added!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    if (time) {
      const updateTime = () => {
        setFormattedTime(
          formatDistanceToNow(new Date(time), { addSuffix: true })
        );
      };

      updateTime();
      const interval = setInterval(updateTime, 60000);

      return () => clearInterval(interval);
    }
  }, [time]);

  const handleCopy = () => {
    const div = document.getElementById(`markdown-${id}`); 
    navigator.clipboard
      .writeText(div?.innerText || "")
      .then(() => {
        toast.success("Text copied to clipboard!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(() => {
        toast.error("Failed to copy text.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div className="flex w-full mb-[20px] max-w-full lg:max-w-[775px] flex-col bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.08)] rounded-[8px] gap-[15px] p-[20px]">
      {isLoading ? (
        <Skeleton count={3} highlightColor="#803CFF" />
      ) : (
        <>
          <div className="flex gap-[15px] items-center">
            <span className="text-[18px] bg-gradient-to-r from-[#A93CFF] to-[#7A3CFF] bg-clip-text text-transparent font-bold font-roboto">
              TARS
            </span>
            <span className="text-[16px] font-normal font-roboto text-[#D9D9D94D]">
              {formattedTime}
            </span>
          </div>
          <div
            id={`markdown-${id}`} // Assign unique ID
            className="text-white text-[16px] fon-normal font-roboto"
            dangerouslySetInnerHTML={markdownContent}
          />
          <div className="flex gap-[10px] items-center">
            <div onClick={handleRebuild} className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center transition-transform transform hover:bg-[rgba(255,255,255,0.1)] hover:scale-105">
              <Image
                src={ReloadIcon}
                alt="reload_icon"
                width={16}
                height={16}
              />
              <span className="text-[12px] font-roboto font-medium text-[rgba(255,255,255,0.40)]">
                Rebuild
              </span>
            </div>

            <div
              onClick={handleCopy}
              data-tooltip-id="copy-tooltip"
              data-tooltip-content={"Copy"}
              className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center transition-transform transform hover:bg-[rgba(255,255,255,0.1)] hover:scale-105"
            >
              <Image
                src={AttachmentIcon}
                alt="attachment_icon"
                width={16}
                height={16}
              />
              <Tooltip
                id="copy-tooltip"
                style={{
                  backgroundColor: "rgba(27, 27, 48, 1)",
                  color: "white",
                }}
                place="bottom"
              />
            </div>

            <div
              onClick={handleBookmark}
              data-tooltip-id="bookmark-tooltip"
              data-tooltip-content={"Bookmark"}
              className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center transition-transform transform hover:bg-[rgba(255,255,255,0.1)] hover:scale-105"
            >
              <Image src={SaveIcon} alt="save_icon" width={16} height={16} />
              <Tooltip
                id="bookmark-tooltip"
                style={{
                  backgroundColor: "rgba(27, 27, 48, 1)",
                  color: "white",
                }}
                place="bottom"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnswerCard;

