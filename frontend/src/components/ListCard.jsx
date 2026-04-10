import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from "../images/code.png"
import deleteImg from "../images/delete.png"
import { api_base_url } from '../helper';

const ListCard = ({ item, getProj }) => {
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
        // Refresh project list if callback provided, otherwise reload page
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
      <div className="listCard mb-2 w-full flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020] transition">
        <div
          onClick={() => navigate(`/editor/${item._id}`)}
          className='flex items-center gap-2 flex-1'
        >
          <img className='w-[80px]' src={img} alt="project" />
          <div>
            <h3 className='text-[20px]'>{item.title}</h3>
            <p className='text-[gray] text-[14px]'>
              Created on {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>
        <div>
          <img
            onClick={() => setIsDeleteModelShow(true)}
            className='w-[30px] cursor-pointer mr-4'
            src={deleteImg}
            alt="delete"
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center flex-col z-50">
          <div className="mainModel w-[25vw] bg-[#141414] rounded-lg p-[20px] shadow-lg shadow-black/50">
            <h3 className='text-2xl'>Delete this project?</h3>
            <p className='text-gray-400 text-sm mt-2'>
              "<span className='text-white'>{item.title}</span>" will be permanently deleted.
            </p>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button
                onClick={() => deleteProj(item._id)}
                className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%] hover:bg-red-700 transition'
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModelShow(false)}
                className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%] hover:bg-[#252525] transition'
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

export default ListCard;