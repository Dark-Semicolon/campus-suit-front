import { RiLinkedinFill } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Footer() {

  return (
    <footer className="flex flex-wrap items-center justify-center gap-3 px-2 py-5 bg-black md:justify-between md:px-16">
      <p className="text-gray-500">All Rights Reserved CampusSuit.com 2024</p>
      <ul className="flex gap-5">
        <li className="flex items-center justify-center w-10 h-10 rounded-full bg-black-color">
          <RiLinkedinFill className="text-xl text-white" />
        </li>
        <li className="flex items-center justify-center w-10 h-10 rounded-full bg-black-color">
          <FaDiscord className="text-xl text-white" />
        </li>
        <li className="flex items-center justify-center w-10 h-10 rounded-full bg-black-color">
          <FaFacebook className="text-xl text-white" />
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
