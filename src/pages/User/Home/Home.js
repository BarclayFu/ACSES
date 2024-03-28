import React from "react";
import { setTitle } from "../../../utils/setTitle";
import {Program} from "../../../pages/User/Course/Program";

export const Home = () => {
  //set page title
  setTitle("ACSES");
  return (
    <div className="bg-white">
      <Program/>
    </div>
  );
};
