import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GETSPACE from "@/contract/GetSpace.json"
import { toast } from "react-toastify";
import {
  useWriteContract,
  useSimulateContract,
  useAccount,
  useReadContract
} from "wagmi";
import useLoading from "@/hooks/useLoading";
import { truuncateAddress } from "@/helpers/trucateAddress"

import { useParams } from 'next/navigation'
import GeneratepaymentLink from "@/components/GeneratepaymentLink";
// Define the shape of the props for the SpaceDetail component
interface SpaceDetailProps {
  params: Number
}

interface SpaceData {
  name: string;
  spaceAddress: string;
  Owner: string;
  paymentLink: string;
  description: string;
  amountpaid: string;
  currentAmount: string;
  spaceStatus : string;
  duration: number;
  videoImage: string;
}

interface SpaceType {
  name: string;
  spaceAddress: string;
  Owner: string; // Note: JavaScript property names are camelCased, but TypeScript allows PascalCase for interfaces/types
  paymentLink: string;
  description: string;
  amountpaid: number; // Assuming these are numbers, adjust accordingly
  currentAmount: number;
}



const SpaceDetail: React.FC<SpaceDetailProps> = ({ params }: SpaceDetailProps) => {
    const paramss = useParams<{ tag: string; item: string }>()
    console.log(paramss)
    const id = params
  const { writeContractAsync } = useWriteContract()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);

  // const {data: simulateSPaces } = useSimulateContract({
  //   abi: GETSPACE.abi,
  //   address: GETSPACE.address as `0x${string}`,
  //   functionName: "_space",
  //   args: [id]
  // })

  const { data: fetchSpace } = useReadContract({
    abi: GETSPACE.abi,
    address: GETSPACE.address as `0x${string}`,
    functionName: "_space",
    args: [paramss?.id]
  })


  const getSpaceDb = useCallback(() => {
    if (!fetchSpace) return null;
    setSpaceData({
      name: fetchSpace[0],
      spaceAddress: fetchSpace[1],
      Owner: fetchSpace[2],
      paymentLink: fetchSpace[3],
      description: fetchSpace[4],
      amountpaid: fetchSpace[5],
      currentAmount: fetchSpace[6],
      spaceStatus  : fetchSpace[7],
      duration: fetchSpace[8],
      videoImage  : fetchSpace[9],
    })
  }, [fetchSpace])


  useEffect(() => {
    getSpaceDb()
  }, [getSpaceDb])

  if (!spaceData) return null;

  return (
    <div>
        <div className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 m-3">
      {/* <Image
        // src={portImg}
        alt="jordans"
        height="400"
        width="400"
        className="object-contain"
      /> */}
      <video width="400" height="400" autoPlay muted controls controlsList="nodownload">
          <source src={spaceData.videoImage} type="video/mp4" />
          </video>
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            {spaceData.name}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {spaceData.description}
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <Link target="_blank" href={'/'}>{truuncateAddress(spaceData.Owner)}</Link>
          </button>
        </div>
        <div>
            <h3>Generate Payment</h3>
            <div>
                <GeneratepaymentLink />
            </div>
        </div>
    </div>
        );
}

        export default SpaceDetail;