"use client";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Christian Stensøe - Full-Stack Developer</title>
        <meta
          name="description"
          content="Full-stack developer and technology enthusiast creating sophisticated web applications with precision, elegance, and cutting-edge innovation."
        />
        <meta
          name="keywords"
          content="full-stack developer, web development, React, Next.js, TypeScript, Christian Stensøe"
        />
        <meta name="author" content="Christian Stensøe" />
        <meta
          property="og:title"
          content="Christian Stensøe - Full-Stack Developer"
        />
        <meta
          property="og:description"
          content="Full-stack developer and technology enthusiast creating sophisticated web applications."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://christianstensoe.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Christian Stensøe - Full-Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Full-stack developer and technology enthusiast creating sophisticated web applications."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen premium-gradient dark:premium-gradient-dark">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <ScrollProgress />
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "white",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
