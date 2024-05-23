import React, { useState } from 'react'
import { useWriteContract, useSimulateContract, useAccount, useReadContract } from "wagmi"
import GETSPACE from "../../contract/GetSpace.json"
const AddSpace = () => {

  const [toggle, setToggle] = useState(false);
  const [Name, setName] = useState('')
  const [spaceAddress, setSpaceAddress] = useState('')
  const [description, setDescription] = useState('')
  const [videoImage, setVideoImage] = useState('')
  const [duration, setDuration] = useState('')


  const { data: simulateCreateSpace} = useSimulateContract({
    abi: GETSPACE.abi,
    address: GETSPACE.address,
    functionName: "registerSpace",
    args: []
  })

  const { writeContractAsync } = useWriteContract();

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
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="spaceName"
                  id="spaceName"
                  value={Name}
                  placeholder="Space Name"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setSpaceAddress(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="space address"
                  id="space address"
                  placeholder="Car Image"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="plateNumber"
                  id="plateNumber"
                  placeholder="Enter Car Plate Number"
                />
              </div>

              <div className="mb-8">
                <input
                  type="number"
                  onChange={(e) => setDuration(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="booking prices"
                  id="bookingprice"
                  placeholder="Minimum booking price"
                />
                <input
                  type="file"
                  onChange={(e) => setVideoImage(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="booking prices"
                  id="bookingprice"
                  placeholder="Minimum booking price"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  // disabled={!!loading || !isFormFilled || !recordCar}
                >
                  {/* {loading ? loading : "Register"}  */}  Add space
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