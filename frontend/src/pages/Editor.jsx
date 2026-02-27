import React, { useEffect, useState } from 'react';
import EditiorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdLightMode } from 'react-icons/md';
import { AiOutlineExpandAlt } from "react-icons/ai";

const Editior = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");

  const changeTheme = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      document.body.classList.add("lightMode");
    } else {
      document.body.classList.remove("lightMode");
    }
  };

  const run = () => {
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.srcdoc = `${htmlCode}<style>${cssCode}</style><script>${jsCode}</script>`;
    }
  };

  // Run code whenever code changes
  useEffect(() => {
    const timeout = setTimeout(run, 200);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // Ctrl+S listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log("Ctrl+S pressed - Save functionality here");
        // You can call your save API here
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditiorNavbar />
      <div className="flex">
        <div className={`${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-10">
            <div className="flex items-center gap-2">
              <div onClick={() => setTab("html")} className="tab cursor-pointer p-2 bg-[#1E1E1E] text-[15px]">HTML</div>
              <div onClick={() => setTab("css")} className="tab cursor-pointer p-2 bg-[#1E1E1E] text-[15px]">CSS</div>
              <div onClick={() => setTab("js")} className="tab cursor-pointer p-2 bg-[#1E1E1E] text-[15px]">JavaScript</div>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme}><MdLightMode /></i>
              <i className="text-[20px] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}><AiOutlineExpandAlt /></i>
            </div>
          </div>

          <Editor
            onChange={(value) => {
              if (tab === "html") setHtmlCode(value || "");
              if (tab === "css") setCssCode(value || "");
              if (tab === "js") setJsCode(value || "");
            }}
            height="82vh"
            theme={isLightMode ? "vs-light" : "vs-dark"}
            language={tab}
            value={tab === "html" ? htmlCode : tab === "css" ? cssCode : jsCode}
          />
        </div>

        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-1/2 min-h-[82vh] bg-white text-black"
            title="output"
          />
        )}
      </div>
    </>
  );
};

export default Editior;