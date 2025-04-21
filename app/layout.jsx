import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { ThemeProvider } from "../components/ui/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <div className="fixed inset-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
          <Navbar />
          <main className="flex-grow flex flex-col pt-20 relative z-10 container mx-auto px-4">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
