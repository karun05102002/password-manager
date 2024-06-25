// import  from "react";
import { useRef, useState, useEffect } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")

    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }

  }, [])


  const showPassword = () => {
    if (form.site.length > 3 && form.username > 3 && form.password > 3) {

      passwordRef.current.type = "text"
      console.log(ref.current.src)
      if (ref.current.src.includes("icons/hidden.png")) {
        ref.current.src = "icons/eye.png"
        passwordRef.current.type = "password"


      }
      else {
        ref.current.src = "icons/hidden.png"
        passwordRef.current.type = "text"

      }

    }
    else {
      toast('Error:Password not saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: "Bounce",
      });

    }
  }


  const savePassword = () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    console.log([...passwordArray, form])
    setform({ site: "", username: "", password: "" })
    // toast('Save Password successfuly', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   // transition: "Bounce",
    // });
  }
  const editPassword = (id) => {
    console.log("editing password", id)
    setform(passwordArray.filter(i => i.id == id)[0])

    setpasswordArray(passwordArray.filter(item => item.id !== id))
    // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    // console.log([...passwordArray, form])
  }
  const deletePassword = (id) => {
    console.log("deleting password", id)
    let c = confirm("do you wan to delete this password")
    if (c) {

      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      // console.log([...passwordArray, form])
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }

  const copyText = (Text) => {
    toast('Copy to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: "Bounce",
    });
    navigator.clipboard.writeText(Text)

  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      {/* bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] */}
      <ToastContainer />
      <div className=" inset-0 -z-10 h-full w-full ">

        <div className="px-2 p-20 md:mycontainer min-h-[84.5vh]  lg:mycontainer bg-slate-200 1">

          <h1 className=" text-center  text-2xl">PassOP</h1>
          <p className="text-center  "> Your own Password Manager</p>

          <div className=" flex  flex-col p-4 gap-7 items-center    ">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter Website URL"
              className=" text-black border-green-500 w-full py-1 px-4 rounded-full"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex flex-col md:flex-row w-full gap-7 ">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className=" text-black border-green-500 w-full py-1 px-4 rounded-full"
                type="text"
                name="username"
                id="username"
              />
              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className=" text-black border-green-500 w-full  py-1 px-4 rounded-full"
                  type="password"
                  name="password"
                  id="password"
                />
                <span className="  cursor-pointer  absolute right-0" onClick={showPassword}>
                  <img ref={ref} className="p-1" width={30} src="icons/eye.png" alt="" />
                </span>

              </div>

            </div>

            <button onClick={savePassword} className="flex justify-center   items-center   bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </div>
          <div className="password"></div>
          <h2 className="font-bold text-xl">Your passwords</h2>
          {passwordArray.length === 0 && <div>No Password to Show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-sm overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th>Site</th>
                <th>UserNamet</th>
                <th>Passwords</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody className="bg-green-200">
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className="text-center w-32  py-2  ">
                    <div className="flex justify-center gap-5">
                      <div >{item.site}</div>
                      <span><img className=" cursor-pointer" src="/icons/copy.png" alt="" onClick={() => { copyText(item.site) }} /></span>
                    </div>
                  </td>
                  <td className="text-center w-32 py-2  ">
                    <div className="flex justify-center gap-5">
                      <div>{item.username}</div>
                      <span><img className=" cursor-pointer" src="/icons/copy.png" alt="" onClick={() => { copyText(item.username) }} /></span>
                    </div>
                  </td>
                  <td className="text-center w-32 py-2  ">
                    <div className="flex justify-center gap-5">
                      <div>{item.password}</div>
                      <span><img className=" cursor-pointer" src="/icons/copy.png" alt="" onClick={() => { copyText(item.password) }} /></span>
                    </div>

                  </td>
                  <td className="text-center w-32 py-2  ">
                    <div className="flex justify-center gap-5">
                      {/* <div className="pt-1">Delete</div> */}
                      <div className="cursor-pointer flex w-16  h-10">

                        {/* <script src="https://cdn.lordicon.com/lordicon.js"></script> */}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30" onClick={() => { editPassword(item.id) }}>
                          <path d="M24,11l2.414-2.414c0.781-0.781,0.781-2.047,0-2.828l-2.172-2.172c-0.781-0.781-2.047-0.781-2.828,0L19,6L24,11z M17,8	L5.26,19.74c0,0,0.918-0.082,1.26,0.26c0.342,0.342,0.06,2.58,0.48,3s2.644,0.124,2.963,0.443c0.319,0.319,0.297,1.297,0.297,1.297	L22,13L17,8z M4.328,26.944l-0.015-0.007C4.213,26.97,4.111,27,4,27c-0.552,0-1-0.448-1-1c0-0.111,0.03-0.213,0.063-0.313	l-0.007-0.015L4,23l1.5,1.5L7,26L4.328,26.944z"></path>
                        </svg>



                        <span className=" mt-1 ml-1 on" onClick={() => { deletePassword(item.id) }}>
                          {/* <script src="https://cdn.lordicon.com/lordicon.js"></script> */}
                          <lord-icon

                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "height": "28px" }}>
                          </lord-icon>
                        </span>

                      </div>
                    </div>

                  </td>
                </tr>
              })}



            </tbody>
          </table>
          }

        </div>
      </div>
    </>
  );
};

export default Manager;
