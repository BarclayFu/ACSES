import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import { HiAcademicCap } from "react-icons/hi2";
export const MainHeader = () => {
  const userAccessToken = localStorage.getItem("jwt");
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSerach, setMobileSearch] = useState(false);
  const [profile, setProfile] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    
    fetch('https://vivid-bloom-0edc0dd8df.strapiapp.com/api/users/me?populate=Avatar&populate=Background', { // 修改这个URL为你的API地址
      headers: {
        'Authorization': `Bearer ${userAccessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setProfile(data);
    })
    .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const avatarUrl = profile && profile.Avatar ? `${profile.Avatar.url}` : '默认头像地址';


  return (
    <div className="w-full h-20 text-gray-100  px-2 sm:px-0 ">
      <div className="container mx-auto flex w-full h-full items-center justify-between space-x-3 relative">
        <div className="flex items-center space-x-3">
          {/* mobile left side menu */}
          <div
            className="sm:hidden block"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
          </div>
          {/* mobile menu */}
          {mobileMenu && (
            <MobileMenu setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
          )}
          {/* logo area */}
          <div className="xl:min-w-[300px]">
            <Link to="/">
              <div className="flex text-2xl text-black font-sans-serif">
                <span><HiAcademicCap/></span>
                <span> STEM Coding Lab</span>
              </div>
            </Link>
          </div>
        </div>
        
        {/* right side */}
        <div className="flex items-center space-x-3 relative">
          {userAccessToken ? (
            <>
              <div className="flex items-center space-x-2 group hover:cursor-pointer" >
                 <Link
                    to="/profile"
                    className="flex hover:bg-orange-700/50 p-2 rounded-md ease-out duration-100">
                    <span>
                      <img
                        src={avatarUrl}
                        alt="Profile"
                        className="rounded-full"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </span>
                    
                </Link>
                
                <span className="text-base mx-2">|</span>
                <div className="flex hover:bg-orange-700/50 p-2 text-black rounded-md ease-out duration-100">
                  <LogoutButton className="flex hover:bg-orange-700/50 p-2 rounded-md ease-out duration-100"/>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center">
              <Link
                to="/login"
                className="flex hover:bg-orange-700/50 p-2 text-black rounded-md ease-out duration-100"
              >
                <span className="text-2xl text-black pr-1">
                  <AiOutlineUser />
                </span>
                <span className="text-base font-medium">Login</span>
              </Link>
              
            </div>
            
          )}

          {/* search icon for small devices */}
          <button
            type="submit"
            className="pr-2 text-lg text-white block sm:hidden"
            onClick={() => setMobileSearch(!mobileSerach)}
          >
            <BsSearch />
          </button>

        </div>
      </div>
      {/* this form for mobile devices */}
      {/* <div className={mobileSerach ? "block" : "hidden"}>
        <form
          className="sm:hidden block w-full absolute top-3 left-0"
          onSubmit={searchHeandler}
        >
          <div className="flex items-center bg-gray-200 rounded-md ring-1 ring-emerald-800 mx-2">
            <input
              type="search"
              name="search"
              value={searchValue}
              placeholder="Search Product..."
              className="bg-transparent text-black px-2 py-2 focus:outline-none"
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button type="submit" className="pr-3 text-lg text-[#f85606]">
              <BsSearch />
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

const LogoutButton = () => {
  const dispatch = useDispatch(); // 如果使用Redux
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除用户状态
    dispatch({ type: 'LOGOUT' }); // 例如，使用Redux dispatch来清除用户状态

    // 清除认证信息，如JWT或cookies
    localStorage.removeItem('jwt'); // 假设JWT存储在localStorage中
    // 或者：cookies.remove('jwt'); // 如果使用cookies

    // 重定向到登录页面或其他页面
    navigate('/login');
  };

  return <button className="text-base font-medium" onClick={handleLogout}>Logout</button>;
};
