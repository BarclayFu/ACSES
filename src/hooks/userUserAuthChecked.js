// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { userLoggedIn } from "../features/auth/userAuthSlice";

// export const useUserAuthChecked = () => {
//   const [userAuth, setUserAuth] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const localUserAuth = JSON.parse(localStorage.getItem("userAuth"));

//     if (localUserAuth?.user && localUserAuth?.accessToken) {
//       dispatch(userLoggedIn(localUserAuth));
//       setUserAuth(true);
//     }

//     setUserAuth(true);
//   }, [dispatch]);

//   return userAuth;
// };

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/userAuthSlice";
import axios from 'axios';

export const useUserAuthChecked = () => {
  const [userAuth, setUserAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    const jwt = localStorage.getItem("jwt"); // 从 localStorage 中获取 JWT

    if (jwt) {
      // 如果 JWT 存在，认为用户已经登录
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`; // 设置 axios 请求头
      const response = await axios.get("http://localhost:1337/api/users/me");
      if (response.status === 200) {
        setUserAuth(true);
        console.log(response.data);
        dispatch(userLoggedIn({ jwt }));
      }else{
        localStorage.removeItem("jwt");
        setUserAuth(false);
      }
    } else {
      // 如果没有 JWT，设置认证状态为 false
      localStorage.removeItem("jwt");
      setUserAuth(false);;
    }
  }, [dispatch]);

  return userAuth;
};
