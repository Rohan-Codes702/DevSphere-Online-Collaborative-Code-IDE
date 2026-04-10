import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import codeImg from '../images/code.png'
import deleteImg from '../images/delete.png'
import { api_base_url } from '../helper';

const GridCard = ({ item, getProj }) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId")
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsDeleteModelShow(false);
        if (getProj) {
          getProj();
        } else {
          window.location.reload();
        }
      } else {
        alert(data.message);
        setIsDeleteModelShow(false);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Failed to delete project");
    });
  };

  return (
    <>
      <div className="gridCard bg-[#141414] w-[270px] p-[10px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50 transition">
        <div onClick={() => navigate(`/editor/${item._id}`)}>
          <img className="w-[90px]" src={codeImg} alt="project" />
          <h3 className='text-[20px] w-[90%] line-clamp-1'>{item.title}</h3>
        </div>
        <div className='flex items-center justify-between mt-2'>
          <p className='text-[14px] text-[gray]'>
            {new Date(item.date).toDateString()}
          </p>
          <img
            onClick={() => setIsDeleteModelShow(true)}
            className='w-[30px] cursor-pointer'
            src={deleteImg}
            alt="delete"
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[90%] sm:w-[420px] bg-gradient-to-b from-[#1f1f1f] to-[#141414] border border-[#2a2a2a] rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20 border border-red-500/40">
                <span className="text-red-500 text-3xl font-bold">!</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl text-white font-semibold text-center leading-snug">
              Delete this project?
            </h3>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm text-center mt-2">
              "<span className="text-white">{item.title}</span>" will be permanently deleted.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => deleteProj(item._id)}
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
};

export default GridCard;
