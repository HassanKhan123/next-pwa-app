import React, { useState } from "react";
import AddIcon from "../../assests/add_icon.svg";
import Image from "next/image";
import cx from "classnames";

interface CollapserProps {
  text: string;
}

function Collapser({ text }: CollapserProps) {
  const [isCollapserOpen, setIsCollapserOpen] = useState(false);

  const toggleCollapser = () => {
    setIsCollapserOpen(!isCollapserOpen);
  };

  return (
    <div
      className={cx(
        "flex items-center justify-between gap-[15px] border border-[rgba(255,255,255,0.08)] bg-transparent w-full rounded-[8px] p-[12px_16px_12px_16px] transition-all duration-300",
        {
          "h-[200px]": isCollapserOpen,
          "h-[68px] lg:h-[46px]": !isCollapserOpen,
        }
      )}
    >
      <span className="text-[rgba(255,255,255,0.8)] text-[16px] font-normal">
        {text}
      </span>
      <Image
        onClick={toggleCollapser}
        src={AddIcon}
        alt="add_icon"
        width={16}
        height={16}
      />
    </div>
  );
}

export default Collapser;
