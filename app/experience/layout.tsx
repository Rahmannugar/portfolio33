import React from "react";

export const generateMetadata = () => {
  return {
    title: "Experience",
    description: "My entire work experience history",
  };
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
