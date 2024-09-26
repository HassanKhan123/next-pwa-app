import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import Layout from "../layout";
import AppKitProvider from "@/context";
import { ToastContainer } from "react-toastify";
import { Head } from "next/document";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Search Engine",
  description: "The fastest AI search engine, by TARS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
       <link rel="icon" href="/favicon.ico" />
       </head>
      <body className={`lg:p-[10px] overflow-auto lg:overflow-hidden p-[0px] ${inter.className}`}>
        <AppKitProvider>
          <JotaiProvider>
            <ToastContainer />
            <Layout>{children}</Layout>
          </JotaiProvider>
        </AppKitProvider>
      </body>
    </html>
  );
}


