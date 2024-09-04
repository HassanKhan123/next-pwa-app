import React, { useState } from "react";
import SearchIcon from "../../assests/search_icon.svg";
import Image from "next/image";

function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="relative w-full flex items-center">
      <div className="absolute left-5 inset-y-0 flex items-center">
        <Image src={SearchIcon} alt="search_icon" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="text-white bg-[#140926] pl-[50px] rounded-full h-[54px] w-full border border-[rgba(255,255,255,0.10)]"
      />
    </div>
  );
}

export default SearchInput;
