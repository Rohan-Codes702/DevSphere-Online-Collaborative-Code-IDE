import React from "react";
import { useState } from "react";
import img from "../images/code.png";
import deleteImg from "../images/delete.png";

function ListCard() {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  return (
    <>
      {/* CARD */}
      <div className="mb-4 mx-[100px] flex items-center justify-between p-4 bg-[#141414] cursor-pointer rounded-xl hover:bg-[#202020] transition-all duration-300 shadow-md">

        <div className="flex items-center gap-4">
          <img className="w-[70px]" src={img} alt="code" />

          <div>
            <h3 className="text-[20px] text-white font-semibold">
              MyFirst Project
            </h3>
            <p className="text-gray-400 text-[14px]">
              Created in 9 days
            </p>
          </div>
        </div>

        <div>
          <img
            onClick={() => setIsDeleteModelShow(true)}
            className="w-[28px] cursor-pointer mr-4 hover:scale-110 transition-transform duration-200"
            src={deleteImg}
            alt="delete"
          />
        </div>
      </div>

      
{isDeleteModelShow && (
  <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300">

    <div className="w-[90%] sm:w-[420px] bg-gradient-to-b from-[#1f1f1f] to-[#141414] border border-[#2a2a2a] rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transform transition-all duration-300 scale-100">

     
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20 border border-red-500/40">
          <span className="text-red-500 text-3xl font-bold">!</span>
        </div>
      </div>

      <h3 className="text-2xl text-white font-semibold text-center leading-snug">
        Delete this project?
      </h3>

      <p className="text-gray-400 text-sm text-center mt-2">
        This action cannot be undone.
      </p>

      <div className="flex gap-4 mt-8">

        <button
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium tracking-wide shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.03]"
        >
          Delete
        </button>

        <button
          onClick={() => setIsDeleteModelShow(false)}
          className="flex-1 py-3 rounded-xl bg-[#1A1919] border border-[#2a2a2a] hover:bg-[#222] text-white font-medium tracking-wide transition-all duration-300 hover:scale-[1.03]"
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
    </>
  );
}

export default ListCard;