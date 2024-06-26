import React, { useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import { ethers } from 'ethers';
import { peanut } from "@squirrel-labs/peanut-sdk"
import { useAccount } from 'wagmi';
import { publicClient } from "@/helpers/clients"
const GeneratepaymentLink = () => {
    const [toggle, setToggle] = useState(false);

    const { address } = useAccount();
  
  const [number, setNumber] = useState(0)
  
  // const [signer, setSigner] = useState(null);

  const [link, setLink] = useState(
    "https://peanut.to/claim?c=5&v=v3&i=243&p=xChtaH9t3ONAZczD&t=sdk"
  );

  const [linkStatus, setLinkStatus] = useState(null);
  const [claimTx, setClaimTx] = useState(null);
  // const [link, setlink] = useState('')



  const createPaymentLink = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    if (!signer) throw new Error("Connect wallet first");
    console.log(signer)

    const network = signer.provider.getNetwork()
    const chainId = (await network).chainId;

    window.signer = signer;

    const { link, txHash} = await peanut.createLink({
      structSigner: {
        signer: signer
      },
      linkDetails: {
        chainId: chainId,
        tokenAmount: number,
        tokenDecimals: 18,
        tokenType: 0,
      }
      // si
    })
    
    setLink(link)
  }

  const chainId = publicClient.getChainId()
  const createPaymentLinkv1 = async (e) => {

    const linkDetails = {
      chainId: chainId,
      tokenAmount: number,
      tokenType: 0,
      tokenDecimals: 18,
    }

    const password = await peanut.getRandomString(16)

    const preparedTransactions = await peanut.prepareDepositTxs({
      address: address,
      linkDetails,
      passwords: [password],
    })

    const transactionHashes = [];

    for (const unsignedTx of preparedTransactions.unsignedTxs) {
      const convertedTx = peanut.peanutToEthersV5Tx(unsignedTx)

      const signedTx = await 
    }


  }

  console.log(link)
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
            <form onSubmit={createPaymentLink}>
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
                  <IoMdCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GeneratepaymentLink