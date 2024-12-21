"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  const fileList = useQuery(api.notes.GetUserFiles, {
    userEmail: user?.primaryEmailAddress.emailAddress,
  });
  console.log(fileList);
  return (
    <div className="">
      <h2 className="font-medium text-3xl"> Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList?.length > 0 &&
          fileList.map((file, index) => (
            <Link href={"/workspace/" + file?.fileId} key={index} >
              <div
                className="flex flex-col p-5 shadow-md rounded-md items-center justify-center border cursor-pointer hover:scale-105 transition-all h-[200px]"
                key={index}
              >
                <Image src={"/pdf.png"} alt="file" width={50} height={50} />
                <h2 className="mt-3 font-medium text-lg">{file.fileName}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
