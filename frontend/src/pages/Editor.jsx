import React, { useEffect, useState } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdLightMode } from 'react-icons/md';
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_base_url } from '../helper';
import { useParams } from 'react-router-dom';

const EditorPage = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n</head>\n<body>\n\n</body>\n</html>");
  const [cssCode, setCssCode] = useState("body {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}");
  const [jsCode, setJsCode] = useState('console.log("Hello World")');
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  const [isSaving, setIsSaving] = useState(false);

  const { projectID } = useParams();

  const changeTheme = () => {
    if (isLightMode) {
      document.body.classList.remove("lightMode");
    } else {
      document.body.classList.add("lightMode");
    }
    setIsLightMode(!isLightMode);
  };

  const run = () => {
    const iframe = document.getElementById("iframe");
    if (!iframe) return;

    const code = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>
          try {
            ${jsCode}
          } catch(e) {
            console.error(e);
          }
        <\/script>
      </body>
      </html>
    `;

    iframe.srcdoc = code;
  };

  // Auto run on code change
  useEffect(() => {
    const timeout = setTimeout(run, 300);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // Get project on mount
  useEffect(() => {
    if (!projectID) return;

    fetch(api_base_url + "/getProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.project) {
        setHtmlCode(data.project.htmlCode || "");
        setCssCode(data.project.cssCode || "");
        setJsCode(data.project.jsCode || "");
        setProjectTitle(data.project.title || "Untitled Project");
      } else {
        console.error("Failed to load project:", data.message);
      }
    })
    .catch(err => console.error("getProject error:", err));
  }, [projectID]);

  // Save on Ctrl+S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectID, htmlCode, cssCode, jsCode]);

  const saveProject = () => {
    if (isSaving) return;
    setIsSaving(true);

    fetch(api_base_url + "/updateProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
        htmlCode,
        cssCode,
        jsCode
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Project saved successfully ✅");
      } else {
        alert("Failed to save: " + (data.message || "Unknown error"));
      }
    })
    .catch(err => {
      console.error(err);
      alert("Failed to save project");
    })
    .finally(() => setIsSaving(false));
  };

  return (
    <>
      <EditorNavbar projectTitle={projectTitle} onSave={saveProject} isSaving={isSaving} />

      <div className="flex">

        <div className={isExpanded ? "w-full" : "w-1/2"}>

          <div className="flex items-center justify-between w-full bg-[#1A1919] h-[50px] px-[40px]">

            <div className="flex gap-2">
              <div
                onClick={() => setTab("html")}
                className={`cursor-pointer p-[6px] px-[10px] transition ${tab === "html" ? "bg-[#00AEEF] text-white" : "bg-[#1E1E1E]"}`}
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className={`cursor-pointer p-[6px] px-[10px] transition ${tab === "css" ? "bg-[#00AEEF] text-white" : "bg-[#1E1E1E]"}`}
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className={`cursor-pointer p-[6px] px-[10px] transition ${tab === "js" ? "bg-[#00AEEF] text-white" : "bg-[#1E1E1E]"}`}
              >
                JS
              </div>
            </div>

            <div className="flex gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme} title="Toggle theme">
                <MdLightMode />
              </i>
              <i className="text-[20px] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} title="Expand/Collapse">
                <AiOutlineExpandAlt />
              </i>
            </div>

          </div>

          {/* Monaco Editor */}
          <Editor
            height="82vh"
            theme={isLightMode ? "vs-light" : "vs-dark"}
            language={tab === "html" ? "html" : tab === "css" ? "css" : "javascript"}
            value={tab === "html" ? htmlCode : tab === "css" ? cssCode : jsCode}
            onChange={(value) => {
              if (tab === "html") setHtmlCode(value || "");
              else if (tab === "css") setCssCode(value || "");
              else setJsCode(value || "");
            }}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
          />

        </div>

        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-1/2 min-h-[82vh] bg-white"
            title="output"
            sandbox="allow-scripts"
          />
        )}
      </div>
    </>
  );
};

export default EditorPage;