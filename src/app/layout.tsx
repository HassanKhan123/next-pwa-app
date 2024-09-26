import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import Layout from "../layout";
import AppKitProvider from "@/context";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

const roboto_mano = Roboto_Mono({
  subsets: ['latin'],
  variable: '--roboto-mano',
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "AI Search Engine",
  description: "AI Search Engine The fastest AI search engine, by TARS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`lg:p-[10px] overflow-auto lg:overflow-hidden p-[0px] ${roboto_mano.className}`}>
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


