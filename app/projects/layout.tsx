import React from "react";

export const generateMetadata = () => {
  return {
    title: "Projects",
    description: "My personal projects and contributions",
  };
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
