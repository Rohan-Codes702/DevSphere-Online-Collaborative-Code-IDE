import { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { BsGridFill, BsList } from "react-icons/bs";
import { useEffect } from "react";
import { api_base_url } from "../helper";

function Navbar({ isGridLayout, setIsGridLayout, setIsLoggedIn }) {
  const [data, setData] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setData(data.user);
      }
    })
    .catch(err => console.error("Navbar fetch error:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove("lightMode");
    } else {
      document.body.classList.add("lightMode");
    }
    setIsLightMode(!isLightMode);
    setShowDropdown(false);
  };

  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] relative">
      <div className="logo">
        <Link to="/">
          <img className="w-[150px] cursor-pointer" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="links flex items-center gap-2">
        {/* Layout toggle */}
        <button
          onClick={() => setIsGridLayout && setIsGridLayout(!isGridLayout)}
          className="btnBlue !bg-transparent border border-[#333] !p-[8px] ml-2 hover:!bg-[#222]"
          title={isGridLayout ? "List View" : "Grid View"}
        >
          {isGridLayout ? <BsList className="text-[20px]" /> : <BsGridFill className="text-[18px]" />}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btnBlue !bg-transparent border border-[#333] !p-[8px] hover:!bg-[#222]"
          title="Toggle Theme"
        >
          {isLightMode ? <MdDarkMode className="text-[20px]" /> : <MdLightMode className="text-[20px]" />}
        </button>

        <button
          onClick={handleLogout}
          className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
        >
          Logout
        </button>

        <Avatar
          onClick={() => setShowDropdown(!showDropdown)}
          name={data ? data.name : "U"}
          size="40"
          round="50%"
          className="cursor-pointer ml-2"
        />
      </div>

      {showDropdown && (
        <div className="absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[180px] text-white z-50">
          <div className="py-[10px] border-b border-white/20">
            <h3 className="text-[17px] font-semibold" style={{ lineHeight: 1.3 }}>
              {data ? data.name : "User"}
            </h3>
            <p className="text-[12px] text-gray-400 truncate">{data ? data.email : ""}</p>
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 mt-3 mb-1 cursor-pointer text-red-400 hover:text-red-300 transition"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
