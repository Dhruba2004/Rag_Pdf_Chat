"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PdfViewer from "../_components/PdfViewer";
import Editor from "../_components/Editor";

function WorkSpace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord,{
    fileId: fileId
  });
  useEffect(()=>{
    console.log(fileInfo);
  },[fileInfo])
 
  return (
    <div>
      <WorkSpaceHeader fileName={fileInfo?.fileName} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Editor fileId={fileId} />
        </div>
        <div>
          <PdfViewer fileUrl = {fileInfo?.fileUrl}/>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
