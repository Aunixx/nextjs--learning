import React from "react";
// import "./slider.scss";
import { FaReact, FaNode } from "react-icons/fa6";
import {
  FaAngular,
  FaHtml5,
  FaCss3,
  FaVuejs,
  FaWordpress,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {
  SiTypescript,
  SiThreedotjs,
  SiTailwindcss,
  SiChakraui,
  SiMui,
  SiStorybook,
  SiRedux,
  SiWebflow,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { DiBootstrap } from "react-icons/di";

const Slider = () => {
  const icons = [
    { id: 1, icon: <FaReact /> },
    { id: 2, icon: <FaAngular /> },
    { id: 3, icon: <FaHtml5 /> },
    { id: 4, icon: <FaCss3 /> },
    { id: 5, icon: <IoLogoJavascript /> },
    { id: 6, icon: <SiTypescript /> },
    { id: 7, icon: <TbBrandNextjs /> },
    { id: 8, icon: <FaVuejs /> },
    { id: 9, icon: <FaNode /> },
    { id: 10, icon: <SiThreedotjs /> },
    { id: 11, icon: <SiTailwindcss /> },
    { id: 12, icon: <DiBootstrap /> },
    { id: 13, icon: <SiChakraui /> },
    { id: 14, icon: <SiMui /> },
    { id: 15, icon: <SiStorybook /> },
    { id: 16, icon: <SiRedux /> },
    { id: 17, icon: <SiWebflow /> },
    { id: 18, icon: <FaWordpress /> },
  ];
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the icons array
  const shuffledIcons = shuffleArray([...icons]);
  const arrayWithDuplicates = [...shuffledIcons, ...shuffledIcons];

  return (
    <div className="slider">
      {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
        <div
          key={item}
          className={`${
            index % 2 === 0 ? "slide-track-opposite" : "slide-track"
          } ${index % 3 === 0 ? "speed" : ""}`}
        >
          {arrayWithDuplicates.map((item) => (
            <div className="slide" key={item.id}>
              {item.icon}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Slider;
