import React from "react";
import Image from "next/image";
import ReloadIcon from "../../assests/reload_icon.svg";
import AttachmentIcon from "../../assests/attachment_icon.svg";
import SaveIcon from "../../assests/save_icon.svg";
import ShareIcon from "../../assests/share_icon.svg";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import MarkdownRenderer from "./MarkdownRenderer";
import { bookmarkAtom } from "@/atoms";
import { useAtom } from "jotai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDistanceToNow } from "date-fns"; 

interface AnswerCardProps {
  isLoading: boolean; 
  text: string;
  searchValue: string;
  time: string
}

function AnswerCard({isLoading, text, searchValue, time}:AnswerCardProps) {
  const [bookmarks, setBookmarks] = useAtom(bookmarkAtom);
  const handleBookmark = () => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, searchValue]);
    toast.success('Bookmark added!', {
      position: "bottom-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

 
  return (
    <div className="flex w-full max-w-full lg:max-w-[775px] flex-col bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.08)] rounded-[8px] gap-[15px] p-[20px]">
    {isLoading ?
    <Skeleton count={3} highlightColor="#803CFF" /> :
    <>
      <div className="flex gap-[15px] items-center">
        <span className="text-[18px] bg-gradient-to-r from-[#A93CFF] to-[#7A3CFF] bg-clip-text text-transparent font-bold font-roboto">
          TARS
        </span>
        <span className="text-[16px] font-normal font-roboto text-[#D9D9D94D]">
         {time && formatDistanceToNow(new Date(time), { addSuffix: true })}
        </span>
      </div>
      <div className="text-[16px] font-normal text-white font-roboto">
       {/* {text} */}
       <MarkdownRenderer text={text} />
      </div>
      <div className="flex gap-[10px] items-center">
        <div  className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image src={ReloadIcon} alt="reload_icon" width={16} height={16} />
          <span className="text-[12px] font-roboto font-medium text-[rgba(255,255,255,0.40)]">
            Rebuild
          </span>
        </div>
        <div className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image
            src={AttachmentIcon}
            alt="attachment_icon"
            width={16}
            height={16}
          />
        </div>
        <div onClick={handleBookmark} className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image src={SaveIcon} alt="save_icon" width={16} height={16} />
        </div>
        {/* <div className="flex gap-[6px] cursor-pointer shadow-custom-inset border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image src={ShareIcon} alt="share_icon" width={16} height={16} />
        </div> */}
      </div>
      </>
}
    </div>
  );
}

export default AnswerCard;
