import EditiorNavbar from "../components/EditorNavbar";

function Editor() {
  return (
    <>
      <EditiorNavbar />

      <div className="flex">
        <div className="left w-[50%]">
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="flex items-center gap-2">
              <div className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">
                HTML
              </div>

              <div className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">
                CSS
              </div>

              <div className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">
                JavaScript
              </div>
            </div>
          </div>
          <Editor height="82vh" theme="vs=dark" defaultLanguage="javascript" ddefaultValue="//some comment"/>
        </div>

        <iframe
          id="iframe"
          className="w-1/2 min-h-[82vh] bg-white"
          title="output"
        />
      </div>
    </>
  );
}

export default Editor;
