import React from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full bg-black shadow-md py-4 mt-auto z-0">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-600">
          © 2023 CS Productions. All rights reserved.
        </p>
      </div>
      <div className="flex justify-around pt-4">
        <Link href="https://www.instagram.com/christianstensoee/">
          <AiOutlineInstagram
            size={30}
            className="cursor-pointer text-white hover:text-gray-500"
          />
        </Link>
        <Link href="https://www.linkedin.com/in/christian-stens%C3%B8e/">
          <AiOutlineLinkedin
            size={30}
            className="cursor-pointer text-white hover:text-gray-500"
          />
        </Link>
        <Link href="#">
          <AiOutlineFacebook
            size={30}
            className="cursor-pointer text-white hover:text-gray-500"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
