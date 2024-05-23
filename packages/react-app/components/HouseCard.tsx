import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define the shape of the props for the HouseCard component
interface HouseCardProps {
 portImg: string;
 textProject: string;
 gitlink: string;
 website: string;
 projectDetail: string;
}

const HouseCard: React.FC<HouseCardProps> = ({ portImg, textProject, gitlink, website, projectDetail }) => {
 return (
    <div className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 m-3">
      <Image
        src={portImg}
        alt="jordans"
        height="400"
        width="400"
        className="object-contain"
      />
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        {textProject}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {projectDetail}
      </p>
      <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
    <Link target="_blank" href={website}>Visit</Link>
    <Link target="_blank" href={gitlink} className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
          Github
        </Link>
      </button>
    </div>
 );
}

export default HouseCard;
