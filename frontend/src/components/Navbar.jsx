import { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] relative">
      
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="logo" />
      </div>

      <div className="links flex items-center gap-6 text-white">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/services">Services</Link>

        <Avatar
          name="Rohan"
          size="40"
          round="50%"
          onClick={() => setShowDropdown(!showDropdown)}
          className="cursor-pointer ml-2"
        />
      </div>

      {showDropdown && (
        <div className="absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[160px] text-white">
          <div className="py-[10px] border-b border-white">
            <h3 className="text-[17px]" style={{ lineHeight: 1 }}>
              Rohan Mane
            </h3>
          </div>

          <div className="flex items-center gap-2 mt-3 mb-2 cursor-pointer">
            <MdLightMode className="text-[20px]" />
            Light mode
          </div>

          <div className="flex items-center gap-2 mt-3 mb-2 cursor-pointer">
            <BsGridFill className="text-[20px]" />
            Layout
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;