import { Button } from "@/components/ui/button";
import React from "react";

function Hero() {
  return (
    <section className="h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="p-4 container mx-auto flex items-center justify-center flex-col">
        <i>
          <h1 className="text-center md:text-7xl text-3xl mt-[12rem] font-bold">
            Simplify <span className="text-red-600">PDF</span>{" "}
            <span className="text-blue-600"> Note</span> Taking With AI{" "}
          </h1>
          <div className="text-center mx-auto">
            <p className="mt-4 text-gray-700 text-xl">
              AI Note Taker is a tool that helps you take notes from your PDF
              documents. It uses AI to extract text from PDFs and summarize it
              for you
            </p>
          </div>

          <div className="mx-auto flex items-center justify-center mt-4 gap-[1rem]">
            <Button>Get Started</Button>
            <Button variant={'outline'}>Learn More</Button>
          </div>
        </i>
      </div>
    </section>
  );
}

export default Hero;
