import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import image from "../../images/playstore.png";

export const Footer = () => {
  return (
    <footer className="px-2 sm:px-0">
      <div className="w-full h-auto bg-gray-100">
        <div className="container mx-auto py-4">
          <div className="grid gap-5  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="">
              <h1 className="text-2xl text-green-900 font-semibold">
                StemCodingLab
              </h1>
              <div className="space-y-2 mt-2">
                <p className="font-medium text-base">Contact Us</p>
                <div className="flex space-x-2">
                  <p className="text-2xl text-green-900">
                    <AiOutlineWhatsApp />
                  </p>
                  <div className="text-sm">
                    <p>Call Us</p>
                    <p>+1 412-426-3523</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <p className="text-2xl text-green-900">
                    <AiOutlinePhone />
                  </p>
                  <div className="text-sm">
                    <p>Fax</p>
                    <p>+1 866-578-4147</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <p className="text-2xl text-green-900">
                    <AiOutlineMail />
                  </p>
                  <div className="text-sm">
                    <p>Email Us</p>
                    <p>info@stemcodinglab.org</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-base text-green-900 font-medium">
                Popular Courses
              </h1>
              <div className="flex flex-col mt-4 font-normal">
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  Robotics/Advanced Manufacturing
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  Artificial Intelligence
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  Cybersecurity
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear">
                  Game Design & Animation
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  Healthcare/BioTech
                </Link>
              </div>
            </div>
            <div className="">
              <h1 className="text-base text-green-900 font-medium">
                Customer Services
              </h1>
              <div className="flex flex-col mt-4 font-normal">
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  About Us
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  FAQ
                </Link>
                <Link
                  to="/"
                  className="hover:text-green-900 hover:ml-1 duration-100 ease-linear"
                >
                  Privacy Policy
                </Link>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};
