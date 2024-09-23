import React from "react";
import SearchIcon from "../../../assests/search_icon.svg";
import Image from "next/image";


interface SearchInputProps {
  value: string;
  onChange: (input: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full flex items-center">
      <div className="absolute left-5 inset-y-0 flex items-center">
        <Image src={SearchIcon} alt="search_icon" />
      </div>
      <input
        type="text"
        value={value}
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
        className="text-white bg-[#1B1B30] pl-[50px] rounded-[12px] h-[54px] w-full border border-[rgba(255,255,255,0.10)]"
      />
    </div>
  );
}

export default SearchInput;
