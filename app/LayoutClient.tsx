"use client";

import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";
import { PropsWithChildren } from "react";

const LayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 px-5 md:px-10">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutClient;
