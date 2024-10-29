import React from "react";

interface LayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ leftContent, rightContent }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Left Section */}
      <div className="w-2/2 lg:w-1/2 overflow-x-auto">{leftContent}</div>
      {/* Right Section */}
      <div className="w-2/2 lg:w-1/2">{rightContent}</div>
    </div>
  );
};

export default Layout;
