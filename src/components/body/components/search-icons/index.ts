import { RiGoogleFill } from "react-icons/ri";
import { BiLogoBing } from "react-icons/bi";
import { AiOutlineBaidu } from "react-icons/ai";
import React from 'react';

export const searchEngineIcons = {
  google: RiGoogleFill,
  bing: BiLogoBing,
  baidu: AiOutlineBaidu
};

export type SearchEngineType = keyof typeof searchEngineIcons;

interface SearchIconProps {
  type: SearchEngineType;
  size?: number;
  className?: string;
}
const SearchIcon: React.FC<SearchIconProps> = ({ type, size = 20, className = '' }) => {
  const IconComponent = searchEngineIcons[type];
  
  if (!IconComponent) {
    return null;
  }
  
  return React.createElement(IconComponent, { size, className });
};

export default SearchIcon;