import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="container mx-auto mt-1 sm:mt-5">
      <div className="md:flex md:gap-5">
        <div className="bg-gray-100 p-3 rounded-xl hidden lg:block w-full min-w-[280px] h-80">
          <ul className="space-y-14">
            <li className="text-gray-600 text-lg hover:text-blue-300 hover:bg-blue-100/40 px-2 rounded-md group duration-300 ease-out">
              <Link to="/" className="flex justify-between items-center">
                <span >Artificial Intelligence</span>
                <span className="hidden group-hover:block">
                  <FaArrowRight />
                </span>
              </Link>
            </li>
            <li className="text-gray-600 text-lg hover:text-blue-300 hover:bg-blue-100/40 px-2 rounded-md group duration-300 ease-out">
              <Link to="/" className="flex justify-between items-center">
                <span>Data Structure</span>
                <span className="hidden group-hover:block">
                  <FaArrowRight />
                </span>
              </Link>
            </li>
            <li className="text-gray-600 text-lg hover:text-blue-300 hover:bg-blue-100/40 px-2 rounded-md group duration-300 ease-out">
              <Link to="/" className="flex justify-between items-center">
                <span>Algorithm</span>
                <span className="hidden group-hover:block">
                  <FaArrowRight />
                </span>
              </Link>
            </li>
            <li className="text-gray-600 text-lg hover:text-blue-300 hover:bg-blue-100/40 px-2 rounded-md group duration-300 ease-out">
              <Link to="/" className="flex justify-between items-center">
                <span>Cybersecurity</span>
                <span className="hidden group-hover:block">
                  <FaArrowRight />
                </span>
              </Link>
            </li>
            
          </ul>
        </div>
        {/* carousel */}
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
        >
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src="https://f5p.63f.myftpupload.com/wp-content/uploads/2020/12/Slider-03a.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src="https://i.vimeocdn.com/video/1737453323-4aa58e62e6e71a7b86cfc042c42cf8b2d45058c71dd405dc6748c2e5404175d3-d?mw=800&mh=450&q=70"
              alt=""
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
