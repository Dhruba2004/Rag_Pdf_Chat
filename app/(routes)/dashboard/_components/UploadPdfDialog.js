"use client";
import React, { useState } from "react";
import uuid4 from "uuid4";
import { Input } from "@/components/ui/input";
import { useAction, useMutation } from "convex/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export const UploadPdfDialog = ({ children }) => {
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const AddNewFile = useMutation(api.fileStorage.AddFileEntry);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [loading, setLoading] = useState(false);
  const [open,setOpen]= useState(false);

  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const onUpload = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("StorageId", storageId);
    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId: storageId });

    const resp = await AddNewFile({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "Untitled File",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress.emailAddress,
    });
    console.log(resp);

    const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(ApiResp.data.result);
    await embeddDocument({
      splitText: ApiResp.data.result,
      fileId:fileId
    });

    setLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={()=>setOpen(true)} className="w-full">
            + Upload PDF File          
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Your Pdf file</DialogTitle>
            <DialogDescription asChild>
              <div>
                <h2 className="mt-5">Select a file to upload</h2>
                <div className="mt-1 gap-2 p-3 rounded-md border ">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => onFileSelect(event)}
                  />
                </div>
                <div className="mt-2">
                  <label>File Name</label>
                  <Input
                    placeholder="Enter file name"
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button disabled={loading} onClick={onUpload}>
              {loading ? <Loader2 className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
