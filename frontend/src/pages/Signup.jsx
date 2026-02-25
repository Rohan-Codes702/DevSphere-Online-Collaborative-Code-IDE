import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import image from '../images/authPageSide.png'

function Signup() {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (!username || !name || !email || !pwd) {
      setError("All fields are required");
      return;
    }

    const userData = {
      username,
      name,
      email,
      password: pwd
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setError("");
    navigate("/login");
  }
    return (
  <div className="w-full min-h-screen flex flex-col lg:flex-row">

    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        <div className="flex justify-center lg:justify-start">
          <img className="w-[250px]" src={logo} alt="logo" />
        </div>

        <form onSubmit={submitForm} className="mt-10 space-y-5">

          <div className="inputBox">
            <input
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[#00AEEF]"
            />
          </div>

          <div className="inputBox">
            <input
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[#00AEEF]"
            />
          </div>

          <div className="inputBox">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[#00AEEF]"
            />
          </div>

          <div className="inputBox">
            <input
              required
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[#00AEEF]"
            />
          </div>

          <p className="text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="text-[#00AEEF] ml-1 font-medium">
              Login
            </Link>
          </p>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#00AEEF] text-white py-2 rounded-md hover:bg-[#0095cc] transition"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="hidden lg:block lg:w-1/2">
      <img
        className="h-full w-full object-cover"
        src={image}
        alt="signup visual"
      />
    </div>

  </div>
  )
}

export default Signup