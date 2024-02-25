import React from "react";
import { setTitle } from "../../../utils/setTitle";
import { Banner } from "./Banner";
import { BrandSlider } from "./BrandSlider";
// import { FeaturedProduct } from "./FeaturedProduct";
// import { ForYouProduct } from "./ForYouProduct";
// import { Subscribe } from "./Subscribe";
// import { BestCategory } from "./BestCategory";

export const Home = () => {
  //set page title
  setTitle("ACSES");
  return (
    <>
      <Banner />
      <BrandSlider />
    </>
  );
};
