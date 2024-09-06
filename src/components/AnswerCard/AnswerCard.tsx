import React from "react";
import Image from "next/image";
import ReloadIcon from "../../assests/reload_icon.svg";
import AttachmentIcon from "../../assests/attachment_icon.svg";
import SaveIcon from "../../assests/save_icon.svg";
import ShareIcon from "../../assests/share_icon.svg";

function AnswerCard() {
  return (
    <div className="flex w-full max-w-full lg:max-w-[775px] flex-col bg-[#863CFF26] rounded-[20px] gap-[15px] p-[20px]">
      <div className="flex gap-[15px] items-center">
        <span className="text-[18px] bg-gradient-to-r from-[#A93CFF] to-[#7A3CFF] bg-clip-text text-transparent font-bold font-[avenir]">
          TARS
        </span>
        <span className="text-[16px] font-normal font-[avenir] text-[#D9D9D94D]">
          11sec now
        </span>
      </div>
      <div className="text-[16px] font-normal text-white font-[avenir]">
        The current price of Solana (SOL) is approximately $139.98 USD, with a
        24-hour trading volume of about $2.27 billion USD. Over the past 24
        hours, the price has seen a decline of roughly 3.82%
      </div>
      <div className="flex gap-[10px] items-center">
        <div className="flex gap-[6px] border border-[rgba(255,255,255,0.10)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image src={ReloadIcon} alt="reload_icon" width={16} height={16} />
          <span className="text-[12px] cursor-pointer font-[avenir] font-medium text-[rgba(255,255,255,0.40)]">
            Rebuild
          </span>
        </div>
        <div className="flex gap-[6px] border border-[rgba(255,255,255,0.10)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image
            src={AttachmentIcon}
            alt="attachment_icon"
            width={16}
            height={16}
          />
        </div>
        <div className="flex gap-[6px] border border-[rgba(255,255,255,0.10)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image src={SaveIcon} alt="save_icon" width={16} height={16} />
        </div>
        <div className="flex gap-[6px] border border-[rgba(255,255,255,0.10)] rounded-[20px] p-[8px_16px_8px_16px] items-center">
          <Image src={ShareIcon} alt="share_icon" width={16} height={16} />
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
