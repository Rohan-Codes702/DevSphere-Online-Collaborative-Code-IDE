import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import image from "../images/authPageSide.png";
import { api_base_url } from "../helper";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(api_base_url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);
        // Update parent state so routing reacts immediately
        if (setIsLoggedIn) setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(data.message || "Login failed");
      }
    })
    .catch(err => {
      console.error(err);
      setError("Something went wrong. Please check your connection.");
    })
    .finally(() => {
      setLoading(false);
    });
  };

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
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[#00AEEF]"
              />
            </div>

            <div className="inputBox">
              <input
                required
                onChange={(e) => { setPwd(e.target.value); setError(""); }}
                value={pwd}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-[#00AEEF]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00AEEF] text-white py-2 rounded-md hover:bg-[#0095cc] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-500 mt-3">
              Don't have an account?
              <Link to="/signup" className="text-[#00AEEF] ml-1 font-medium">
                Sign Up
              </Link>
            </p>

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
  );
}

export default Login;