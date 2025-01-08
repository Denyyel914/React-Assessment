import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="border-t fixed bottom-0 left-0 w-full p-2 bg-white">
      <span className="text-sm font-medium text-[#43474E">
        {" "}
        {year} Placeholder org
      </span>
    </div>
  );
};

export default Footer;
