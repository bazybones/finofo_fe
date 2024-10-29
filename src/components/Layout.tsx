// src/components/Layout.tsx
import React from "react";

interface LayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ leftContent, rightContent }) => {
  return (
    <div className="flex gap-4 p-4">
      {/* Left Section */}
      <div className="w-1/2">{leftContent}</div>

      {/* Right Section */}
      <div className="w-1/2">{rightContent}</div>
    </div>
  );
};

export default Layout;
