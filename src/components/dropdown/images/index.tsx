import React, { useState } from "react";
import Image from "next/image";
import PictureIcon from "../../../assests/picture_icon.svg";
import RightArrowIcon from "../../../assests/right_arrow.svg";
import AddIcon from "../../../assests/add_icon.svg";
import DownArrowIcon from "../../../assests/down_icon.svg"

function ImagesDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const ImagesColors = ["#3C3C3C", "#4D5643", "#283F3F"];

  return (
    <div
      className={`flex flex-col gap-[15px] border border-dotted border-[rgba(255,255,255,0.10)] w-[266px] rounded-[8px] p-[16px] transition-all duration-300 ${
        isDropdownOpen ? "h-[216px]" : "h-[56px]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-[10px] items-center">
          <Image src={PictureIcon} alt="picture_icon" width={24} height={24} />
          <span className="text-[rgba(255,255,255,0.10)] text-[14px] font-normal">
            Search images
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Image
            onClick={toggleDropdown}
            src={isDropdownOpen ? DownArrowIcon : RightArrowIcon}
            alt="right_arrow"
            width={16}
            height={16}
          />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="flex w-full gap-[3px] flex-wrap items-center">
          {ImagesColors.map((color, index) => (
            <div
              key={index}
              className="flex items-center rounded-[4px] justify-center w-[113px] h-[70px]"
              style={{ backgroundColor: color }}
            >
            </div>
          ))}
          <div className="flex items-center border border-dotted border-[rgba(255,255,255,0.10)] rounded-[4px] justify-center w-[113px] h-[70px]">
            <div className="flex items-center gap-[5px]">
              <span className="text-[14px] text-[rgba(255,255,255,0.80)] font-normal ">
                More
              </span>
              <Image src={AddIcon} alt="add_icon" width={16} height={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagesDropdown;
