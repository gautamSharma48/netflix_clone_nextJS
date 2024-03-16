import React from "react";

interface NavbarItemsProps {
  label: string;
  onClick?: () => void;
}

const NavbarItems: React.FC<NavbarItemsProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </div>
  );
};

export default NavbarItems;
