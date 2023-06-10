import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { NextAuthProvider } from "./providers";
import { Suspense } from "react";

export const metadata = {
  title: "DocGenie",
  description:
    "",
  themeColor: "#FFF",
};

export default async function RootLayout({
  children }: { 
    children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DocGenie</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}