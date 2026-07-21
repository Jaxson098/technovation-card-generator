'use client'

import { useState } from "react";
import TextLogo from "@/components/textLogo";
import IconLogo from "@/components/iconLogo";
import PartnershipCard from "@/components/partnershipCard";
import InnovationCard from "@/components/innovationCard";
import * as htmlToImage from 'html-to-image';
// import { toPng } from "html-to-image"
import download from "downloadjs";
import { flushSync } from "react-dom";
//colorschemes: navy, coral, sky, forest, electric, lime

export default function Home() {

  const [card_type, set_card_type] = useState("innovation")
  const [colorscheme, set_colorscheme] = useState("green")
  const [isEditing, set_is_editing] = useState(true)

  function downloadCard() {

    flushSync(()=>{set_is_editing(false)})

    htmlToImage
    .toPng(document.getElementById('card-front'), {
      pixelRatio: 1,
      width: 1080,
      height: 1920,
      canvasHeight: 1920,
      canvasWidth: 1080,
      style: {
        transform: "none",
        transformOrigin: "top left",
      },
    })
    .then((dataUrl) => {download(dataUrl, `technovision-${card_type}-card-front.png`);});

    htmlToImage
    .toPng(document.getElementById('card-back'), {
      pixelRatio: 1,
      width: 1080,
      height: 1920,
      canvasHeight: 1920,
      canvasWidth: 1080,
      style: {
        transform: "none",
        transformOrigin: "top left",
      },
    })
    .then((dataUrl) => {download(dataUrl, `technovision-${card_type}-card-back.png`); set_is_editing(true)});

  }

  return (
    <div className="flex">

      {/* sidebar section */}
      <div className="w-1/4 px-3 2xl:px-6 py-2 2xl:py-4 flex flex-col bg-secondary h-screen">
        <TextLogo className="text-primary"/>

        <div className="flex flex-wrap gap-0.5 items-center justify-center mt-2 2xl:mt-6">

          <button className={`justify-self-center ${card_type == "innovation" ? "bg-primary text-text shadow-lg hover:brightness-90" : "text-textSecondary hover:text-cream cursor-pointer"} text-base 2xl:text-xl font-castoro italic rounded-md px-3 py-1 transition-all`}
            onClick={()=>{set_card_type("innovation")}}>
            Innovation Card
          </button>

          <button className={`justify-self-center ${card_type == "partner" ? "bg-primary text-text shadow-lg hover:brightness-90" : "text-textSecondary hover:text-cream cursor-pointer"} text-base 2xl:text-xl font-castoro italic rounded-md px-3 py-1 transition-all`}
            onClick={()=>{set_card_type("partner")}}>
            Partnership Card
          </button>

        </div>

        <h2 className={`text-textSecondary font-castoro italic text-xl 2xl:text-3xl mt-1.5 2xl:mt-5`}>Theme:</h2>

        <div className="flex justify-evenly gap-3 mt-1 flex-col md:flex-row 2xl:mt-2">
          
          <IconLogo Tcolor="#FAF4EC" className={`shrink min-w-10 max-w-16 2xl:max-w-25 p-2 rounded-xl shadow-lg text-lime bg-forest border-3 border-transparent ${colorscheme == "green" ? "" : "cursor-pointer  shadow-lg hover:border-lime hover:-translate-y-1 brightness-70 hover:brightness-100"} transition-all`}
            onClick={()=>{set_colorscheme("green"); document.documentElement.dataset.theme = "green";}}
          />

          <IconLogo Tcolor="#FAF4EC" className={`shrink min-w-10 max-w-16 2xl:max-w-25 p-2 rounded-xl shadow-lg text-sky bg-electric border-3 border-transparent ${colorscheme == "blue" ? "" : "cursor-pointer  shadow-lg hover:border-sky hover:-translate-y-1 brightness-70 hover:brightness-100"} transition-all`}
            onClick={()=>{set_colorscheme("blue"); document.documentElement.dataset.theme = "blue";}}
          />

          <IconLogo Tcolor="#FAF4EC" className={`shrink min-w-10 max-w-16 2xl:max-w-25 p-2 rounded-xl shadow-lg text-coral bg-navy border-3 border-transparent ${colorscheme == "pink" ? "" : "cursor-pointer  shadow-lg hover:border-coral hover:-translate-y-1 brightness-70 hover:brightness-100"} transition-all`}
            onClick={()=>{set_colorscheme("pink"); document.documentElement.dataset.theme = "pink";}}
          />

        </div>

        <div className="flex justify-center items-center mt-auto font-instrument-sans font-extrabold">
          <button className="mt-auto bg-primary px-4 py-2 hover:brightness-120 rounded-lg text-xl cursor-pointer hover:-translate-y-1 transition-all shadow-lg" onClick={downloadCard}>Download</button>
        </div>

      </div>

      {/* card section */}
      {card_type == "innovation" ? <InnovationCard isEditing={isEditing}/> : (<PartnershipCard isEditing={isEditing}/>)}

    </div>
  );
}
// #7D7A76
//#E1DCD4