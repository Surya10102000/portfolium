import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./_components/SessionWrapper";
import dbConnect from "@/lib/connectDB";
import ReduxProvider from "./_components/ReduxProvider";
import NavbarWrapper from "./_components/navbar/NavbarWrapper";
import Provider from "./_components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolium",
  description: "Get Portfolio website in Seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dbConnect();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" 
      integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==" 
      crossOrigin="anonymous" 
      referrerPolicy="no-referrer" />
      </head>

      <ReduxProvider>
        <SessionWrapper>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased thin-scrollbar overscroll-none h-screen scroll-smooth`}
          >
            <Provider>
              <NavbarWrapper />
              {children}
            </Provider>
          </body>
        </SessionWrapper>
      </ReduxProvider>
    </html>
  );
}
