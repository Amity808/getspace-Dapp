import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io';

const AddSpace = () => {
    const [toggle, setToggle] = useState<boolean>(false);
  const [Name, setName] = useState('')
  const [number, setNumber] = useState(0)
  const [description, setDescription] = useState('')
  const [videoImage, setVideoImage] = useState('')
  const [duration, setDuration] = useState('')

  const addSpace = async () => {

  }
  return (
    <div className="flex justify-end mt-10 mb-10">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#1E002B] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Add Space
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <form onSubmit={addSpace}>
              <div className="mb-8">
                <input
                  type="number"
                //   onChange={(e) => setNumber(e.target.value)}
                onChange={(e) => setNumber(parseInt(e.target.value, 10))}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="spaceName"
                  id="spaceName"
                  value={number}
                  placeholder="Space Name"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                //   disabled={!!loading || !isFormFilled || !recordCar}
                >
                  {/* {loading ? loading : "Register"}  */}
                </button>
                <button type="button" onClick={() => setToggle(false)}>
                  <IoCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddSpace