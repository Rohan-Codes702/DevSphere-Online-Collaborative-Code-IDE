import { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { useEffect } from "react";
import { api_base_url, toggleClass } from "../helper";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
   useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      }
      else {
        setError(data.message);
      }
    })
  }, [])
  

  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] relative">
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="logo" />
      </div>

      <div className="links flex items-center gap-2">
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contact</Link>
        <Link>Services</Link>
        <button
          
          className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
        >
          Logout
        </button>
        <Avatar
          onClick={() => {
            toggleClass(".dropDownNavbar", "hidden");
          }}
          name={data ? data.name : ""}
          size="40"
          round="50%"
          className=" cursor-pointer ml-2"
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
