import React from 'react'
import logo from "../images/logo.png"
import { FiDownload, FiSave } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'

const EditorNavbar = ({ projectTitle, onSave, isSaving }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>
          <img className='w-[150px]' src={logo} alt="DevSphere" />
        </div>

        <p className="text-sm text-gray-400">
          File / <span className='text-white font-medium'>{projectTitle || "Untitled Project"}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            disabled={isSaving}
            className='flex items-center gap-1 p-[8px] px-[12px] btn bg-[#00AEEF] hover:bg-[#0086b3] rounded-[5px] cursor-pointer text-[14px] text-white transition disabled:opacity-50'
            title="Save (Ctrl+S)"
          >
            <FiSave />
            {isSaving ? "Saving..." : "Save"}
          </button>

          <i className='p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px] hover:bg-[#222] transition' title="Download">
            <FiDownload />
          </i>
        </div>
      </div>
    </>
  )
}

export default EditorNavbar