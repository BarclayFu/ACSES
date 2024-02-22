import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="container mx-auto mt-1 sm:mt-5 h-[30rem]">
      <div className="md:flex md:gap-5">
        <div className="bg-gray-100 p-3 rounded-xl hidden lg:block w-full min-w-[280px] h-[30rem]">
          <ul className="space-y-1">
            <li className="text-gray-600 text-sm hover:text-orange-600 hover:bg-red-100/40 px-2 rounded-md group duration-300 ease-out">
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
          className="w-200 h-[40rem]"
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
              src="https://icms-image.slatic.net/images/ims-web/ba823c57-436b-4b77-8f58-dc5205af1e80.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src="https://icms-image.slatic.net/images/ims-web/befb2d4d-9ee3-4da2-bbbf-1befc1670150.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src="https://icms-image.slatic.net/images/ims-web/08cb6ccd-b909-4c15-9421-c25b26e73644.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src="https://icms-image.slatic.net/images/ims-web/7de73341-dee6-4793-a51d-367929293352.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
