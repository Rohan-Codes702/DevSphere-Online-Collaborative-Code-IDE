import React from "react";
import img from "../images/code.png";
import deleteImg from "../images/delete.png";

function ListCard() {
  return (
    <div className="listCard mb-2 mx-[100px] w-auto flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
      
      <div className="flex items-center gap-4">
        <img className="w-[80px]" src={img} alt="code" />

        <div>
          <h3 className="text-[20px] text-white">
            MyFirst Project
          </h3>
          <p className="text-gray-400 text-[14px]">
            Created in 9 days
          </p>
        </div>
      </div>

      <div>
        <img
          className="w-[30px] cursor-pointer mr-4"
          src={deleteImg}
          alt="delete"
        />
      </div>

    </div>
  );
}

export default ListCard;