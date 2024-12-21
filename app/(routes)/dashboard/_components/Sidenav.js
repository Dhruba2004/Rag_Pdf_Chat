"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Loader2, Plus, Shield } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { UploadPdfDialog } from "./UploadPdfDialog";

const Sidenav = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="shadow-md h-screen p-7">
      <div className="flex item-center">
        <Image src="/logo.svg" width={170} height={120} alt="logo" />
      </div>
      <div className="mt-10">
        <UploadPdfDialog>
          <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
            + Upload PDF
          </Button>
        </UploadPdfDialog>

        <div className="flex items-center gap-2 p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex items-center gap-2 p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>

      <div className="absolute bottom-24 w-[80%]">
        <h2 className="text-sm mt-5">2 out 5 Pdf uploaded</h2>
        <Progress value={33} className="mt-3" />
        <h2 className="text-sm mt-3">Upgrade to upload more files</h2>
      </div>
    </div>
  );
};

export default Sidenav;
