import React from "react";
import { MainHeader } from "./MainHeader";
import { TopHeader } from "./TopHeader";
import { Landing } from "../../../pages/User/Home/Landing";

export const Headers = () => {
  const backgroundImageUrl = 'http://localhost:1337/uploads/1000_F_417784975_igb_Nz_Eo84_A9_Vr_P_Iafp_J6ho_U_Do_CVJ_656e_e3f2b8cdca.jpg';

  return (
    // <div style={{
    //   backgroundImage: `url("${backgroundImageUrl}")`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center'
    // }}>
    <div className="bg-gradient-to-r from-white to-blue-300">
      <MainHeader />
      <Landing/>  
    </div>
  );
};
