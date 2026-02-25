import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";

function Home() {
  const [isGridLayout, setIsGridLayout] = useState(false);

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-2xl font-semibold">
          Hi, Rohan 👏
        </h2>

        <div className="flex items-center gap-3">
          <div className="inputBox w-[350px]">
            <input
              type="text"
              placeholder="Search Here...!"
              className="w-full p-2 rounded border outline-none"
            />
          </div>

          <button className="btnBlue rounded-[5px] text-[20px] px-[10px] py-[5px]">
            +
          </button>

          <button
            onClick={() => setIsGridLayout(!isGridLayout)}
            className="border px-3 py-2 rounded"
          >
            {isGridLayout ? "List" : "Grid"}
          </button>
        </div>
      </div>

      <div className="cards">
        {isGridLayout ? (
          <div className="grid grid-cols-3 gap-5">
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            
          </div>
        )}
      </div>
    </>
  );
}

export default Home;