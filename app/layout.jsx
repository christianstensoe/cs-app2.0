import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "CS Productions",
  description: "My first web app",
  keywords: "react, jsx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='${poppins.className} bg-slat'>
        <Navbar/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
