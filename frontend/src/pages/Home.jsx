import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const Home = ({ setIsLoggedIn }) => {

  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [projTitle, setProjTitle] = useState("");
  const navigate = useNavigate();
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(false);

  const filteredData = data ? data.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const createProj = () => {
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId")
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsCreateModelShow(false);
          setProjTitle("");
          navigate(`/editor/${data.projectId}`);
        } else {
          alert("Something Went Wrong: " + (data.message || ""));
        }
      })
      .catch(err => console.error(err));
    }
  };

  const getProj = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setData(data.projects);
      } else {
        console.error(data.message);
      }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    getProj();
  }, []);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setUserData(data.user);
      }
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar
        isGridLayout={isGridLayout}
        setIsGridLayout={setIsGridLayout}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className='flex items-center justify-between px-[100px] my-[40px]'>
        <h2 className='text-2xl'>
          Hi, {userData ? userData.username : ""} 👋
        </h2>

        <div className='flex items-center gap-1'>
          <div className="inputBox !w-[350px]">
            <input
              type="text"
              placeholder='Search Here... !'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsCreateModelShow(true)}
            className='btnBlue rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px]'
          >
            +
          </button>
        </div>
      </div>

      {/* Projects */}
      <div className="cards">
        {
          isGridLayout ? (
            <div className='grid px-[100px]'>
              {
                filteredData.length > 0
                  ? filteredData.map((item) => (
                      <GridCard key={item._id} item={item} getProj={getProj} />
                    ))
                  : <p className="text-gray-500 px-[100px]">No projects found. Create your first project!</p>
              }
            </div>
          ) : (
            <div className='list px-[100px]'>
              {
                filteredData.length > 0
                  ? filteredData.map((item) => (
                      <ListCard key={item._id} item={item} getProj={getProj} />
                    ))
                  : <p className="text-gray-500">No projects found. Create your first project!</p>
              }
            </div>
          )
        }
      </div>

      {/* Modal */}
      {isCreateModelShow &&
        <div
          className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.5)] flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === e.currentTarget) setIsCreateModelShow(false); }}
        >
          <div className="createModel w-[25vw] min-h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">

            <h3 className='text-2xl'>Create New Project</h3>

            <div className="inputBox !bg-[#202020] mt-4">
              <input
                value={projTitle}
                onChange={(e) => setProjTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') createProj(); }}
                type="text"
                placeholder='Project Title'
                autoFocus
              />
            </div>

            <div className='flex items-center gap-[10px] w-full mt-2'>
              <button
                onClick={createProj}
                className='btnBlue rounded-[5px] w-[49%] mb-4 !p-[5px] !py-[10px]'
              >
                Create
              </button>

              <button
                onClick={() => { setIsCreateModelShow(false); setProjTitle(""); }}
                className='btnBlue !bg-[#1A1919] rounded-[5px] mb-4 w-[49%] !p-[5px] !py-[10px]'
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      }
    </>
  );
};

export default Home;