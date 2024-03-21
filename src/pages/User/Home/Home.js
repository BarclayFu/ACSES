import React from "react";
import { setTitle } from "../../../utils/setTitle";
// import { FeaturedProduct } from "./FeaturedProduct";
// import { ForYouProduct } from "./ForYouProduct";
// import { Subscribe } from "./Subscribe";
// import { BestCategory } from "./BestCategory";
import {Program} from "../../../pages/User/Course/Program";
import { Landing } from "./Landing";

export const Home = () => {
  //set page title
  setTitle("ACSES");
  return (
    <>
      <Landing/>  
      <Program/>
    </>
  );
};
