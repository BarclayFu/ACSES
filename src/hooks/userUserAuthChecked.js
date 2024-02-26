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

export const useUserAuthChecked = () => {
  const [userAuth, setUserAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // 从 localStorage 中获取 JWT

    if (jwt) {
      // 如果 JWT 存在，认为用户已经登录
      setUserAuth(true);

      // 更新 Redux Store，你可以在这里传递必要的用户信息
      dispatch(userLoggedIn({ jwt }));
    } else {
      // 如果没有 JWT，设置认证状态为 false
      setUserAuth(false);;
    }
  }, [dispatch]);

  return userAuth;
};
