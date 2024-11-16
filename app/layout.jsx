import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "CS Productions",
  description: "My first web app",
  keywords: "react, jsx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} bg-slate-100 dark:bg-gray-700 text-black dark:text-white flex flex-col min-h-screen relative`}
        style={{
          backgroundImage: "url('/images/ice_age_baby_improved_quality.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="fixed inset-0 bg-slate-100 dark:bg-gray-700 opacity-75"></div>
        <Navbar />
        <main className="flex-grow flex flex-col pt-24 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
