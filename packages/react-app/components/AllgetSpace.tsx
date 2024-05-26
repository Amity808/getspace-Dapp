import React,{ useState } from 'react'
import {useReadContract } from "wagmi";
import GETSPACE from "@/contract/GetSpace.json"
import HouseCard from './HouseCard';
type Props = {}

const AllgetSpace = (props: Props) => {

  // const [first, setfirst] = useState(second)

  const { data: spaceLength } = useReadContract({
    abi: GETSPACE.abi,
    address: GETSPACE.address as `0x${string}`,
    functionName: "spaceLength",
    args: [],
  })

  const spaceLen = spaceLength ? Number(spaceLength.toString()) : 0;
  console.log(spaceLen)

  const getSpacesLength = () => {
    if(!spaceLength) return null;
    const spaces = [];
    for(let i = 0; i < spaceLen; i++) {
      spaces.push(<HouseCard id={i} />)
    }
    return spaces;
  }


  return (
    <div>
      <div>
      <h2 style={{ padding: '30px', color: '#333333', textAlign: 'center', marginBottom: '40px' }}>Check Available spaces today</h2>
                <div className="courses" style={{ display: "grid", gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {getSpacesLength()}
                </div>
      </div>
    </div>
  )
}

export default AllgetSpace