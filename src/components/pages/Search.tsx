import React from "react";
import Layout from "../Layout/Layout";
import Image from "next/image";
import ThreeStars from "../../assests/three_stars.svg";
import InputWithVoice from "../InputWithVoice/InputWithVoice";
import UpArrow from "../../assests/up_arrow.svg";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import { useRouter } from 'next/navigation';
import { useSearch } from "@/Context/SearchContext";


const suggestions = [
  { heading: "Lorem ipsum dolor sit amet", paragraph: "Lorem ipsum dolor sit amet, consectetur" },
  { heading: "Lorem ipsum dolor sit amet", paragraph: "Lorem ipsum dolor sit amet, consectetur" },
  { heading: "Lorem ipsum dolor sit amet", paragraph: "Lorem ipsum dolor sit amet, consectetur" },
  { heading: "Lorem ipsum dolor sit amet", paragraph: "Lorem ipsum dolor sit amet, consectetur" },
];

function Search() {
  const router = useRouter();
  const {setSearchValue} = useSearch()

  return (
    <Layout>
      <div className="flex flex-col h-[85vh] justify-start lg:justify-center items-center">
        <Image src={ThreeStars} alt="stars" />
        <h2 className="text-white lg:text-[34px] text-[24px] font-medium">
          Unlock Every Answer
        </h2>
        <div className="flex order-2 lg:order-1 w-full lg:w-[660px] items-center justify-center lg:gap-[10px] gap-[5px] mt-[30px]">
          <InputWithVoice />
          <div className="flex items-center justify-center rounded-full w-[53px] h-[54px] bg-purple-gradient">
            <Image src={UpArrow} alt="up_arrow" />
          </div>
        </div>
        <div className="flex order-1 lg:order-2 w-full lg:w-[660px] mt-[30px] items-center justify-center flex-wrap gap-[10px]">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index} 
            heading={suggestion.heading}
            paragraph={suggestion.paragraph}
            navigateToChat={() =>  {
              router.push('/chat')
              setSearchValue(suggestion.heading)}
            }
          />
        ))}
        </div>
      </div>
    </Layout>
  );
}

export default Search;
