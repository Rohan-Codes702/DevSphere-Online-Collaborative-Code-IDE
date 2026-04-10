import React from 'react'
import { Link } from 'react-router-dom'

function NoPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-[120px] font-bold text-[#00AEEF] leading-none">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 mb-8">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="btnBlue rounded-[5px] px-8 py-3 text-[16px]"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NoPage
