"use client";

import Footer from "@/components/sections/Footer";
import Navbar from "../components/sections/Navbar";
import { PropsWithChildren } from "react";

const LayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-7 md:px-12">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutClient;
