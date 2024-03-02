import React from "react";
import { setTitle } from "../../../utils/setTitle";
import { Banner } from "./Banner";
import { BrandSlider } from "./BrandSlider";
import VideoComponent from './VideoComponent';
// import { FeaturedProduct } from "./FeaturedProduct";
// import { ForYouProduct } from "./ForYouProduct";
// import { Subscribe } from "./Subscribe";
// import { BestCategory } from "./BestCategory";
import {Program} from "../../../pages/User/Course/Program";

export const Home = () => {
  //set page title
  setTitle("ACSES");
  return (
    <>
      <Banner />
      <BrandSlider />
      {/* <VideoComponent/> */}
      <Program/>
    </>
  );
};
