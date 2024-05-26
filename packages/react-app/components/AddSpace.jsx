// 'use client'
import { useState, useRef } from "react";
import {
  useWriteContract,
  useSimulateContract,
  useAccount,
  useReadContract,
} from "wagmi";
import GETSPACE from "../contract/GetSpace.json";
import { IoMdCloseCircle } from "react-icons/io";
import useLoading from "@/hooks/useLoading";
import { toast } from "react-toastify";

const AddSpace = () => {
  const [toggle, setToggle] = useState(false);
  const [Name, setName] = useState("");
  const [spaceAddress, setSpaceAddress] = useState("");
  const [description, setDescription] = useState("");
  const [videoImage, setVideoImage] = useState("");
  const [duration, setDuration] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState("");


  const inputFile = useRef(null)
  const { address } = useAccount()

  const { isLoading: isLoadCreate, startLoading: startLoadCreate, stopLoading: stopLoadCreate } = useLoading()

  
  // const uploadFilePinata = async () => {
  //   const pri = process.env.NEXT_NEXT_PINATA_JWT
  //   console.log("Nets",pri)
  //   try {
  //     setUploading(true);
  //     // const data = new FormData();
  //     // data.set('file', filetoUpload);
  //     // const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     Authorization: `Bearer ${process.env.NEXT_PINATA_JWT}`,
  //     // },
  //     //   body: data,
  //     // });

  //     // const resData = await res.json();
  //     // console.log(resData);
  //     // setCid(resData.IpfsHash);
  //     const formData = new FormData();
  //     formData.append("file", videoImage);
  //     const metadata = JSON.stringify({
  //       name: "File name",
  //     });
  //     formData.append("pinataMetadata", metadata);

  //     const options = JSON.stringify({
  //       cidVersion: 0,
  //     });
  //     formData.append("pinataOptions", options);

  //     const res = await fetch(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOWZlZWY3NS1kNzYyLTQ1YWUtYWVmOS1lODVmN2E1MTVlMzkiLCJlbWFpbCI6ImJvbGFyaW53YW11aGRzb2RpcTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJlZWE3ODdlZDc3M2UzYzIzNTJhIiwic2NvcGVkS2V5U2VjcmV0IjoiYWY5ZTg2OTViODkxNzY5YTM2YWIxZDRmNmExYmYzODc4ZDI1OWE4MzU0NmE5Mjg1YzMwYzc1ZjFhZTA3NzEwMCIsImlhdCI6MTcxNjUzNjY0N30.zYyXRIn88YbNG4qDtAZgh1SzRBuCWTgTvDJ0fDC6l4k`,
  //         },
  //         body: formData,
  //       }
  //     );
  //     const resData = await res.json();
  //     console.log(resData);
  //     setUploading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setUploading(false);
  //     alert("Error uploading file video");
  //   }
  // };


  const handleChange = (e) => {
    setVideoImage(e.target.files[0]);
    uploadFilePinata();
  }

  // string memory _name, string memory _spaceAddress, string memory _paymentLink, string memory _description, uint256 _duration, string memory _videoImage

  // duration is meant for the minimum duration of year
  const { data: simulateCreateSpace, error: simulateerror } = useSimulateContract({
    abi: GETSPACE.abi,
    address: GETSPACE.address,
    functionName: "registerSpace",
    args: [Name, spaceAddress, description, duration, videoImage]
  });

  console.log(simulateerror)

  const { writeContractAsync } = useWriteContract();

  const addSpace = async (e) => {
    e.preventDefault();
    startLoadCreate();
    try {
      // uploadFilePinata();
      if(!simulateCreateSpace) throw new Error("Error simulating ");
      // await writeContractAsync(simulateCreateSpace?.request);
      await writeContractAsync(simulateCreateSpace?.request),
      // toast.promise(
      //   {
      //     loading: "Creating Space",
      //     success: "Space created successfully",
      //     error: "Error creating space",
      //   },
      // )
      stopLoadCreate()
    } catch (error) {
      stopLoadCreate();
      toast.error("Unexpected error from the server")
      console.log(error);
    }
  };
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
                  placeholder="Space Address"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="description"
                  id="description"
                  placeholder="Space Description"
                />
              </div>

              <div className="mb-8">
                <input
                  type="number"
                  onChange={(e) => setDuration(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="duraion"
                  id="duration"
                  placeholder="Maximum duration"
                />
              </div>
              <div className="mb-8">
              <input
                  type="text"
                  onChange={(e) => setVideoImage(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="vide link"
                  id="video link"
                  placeholder="video link"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  disabled={isLoadCreate}
                >
                  {isLoadCreate ? "Loading..." : "Add space"}  
                </button>
                <button type="button" onClick={() => setToggle(false)}>
                  <IoMdCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSpace;
