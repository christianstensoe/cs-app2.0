import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineFacebook,
} from "react-icons/ai";
import "./globals.css";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to CS Productions</h1>
      <p className="mb-4">
        This is a sample landing page with dummy content to enable scrolling.
      </p>
      {[...Array(20)].map((_, i) => (
        <p key={i} className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      ))}
    </div>
  );
}
