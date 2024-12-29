import { Button } from "@/components/ui/button";
import React from "react";
import Header from "./_components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function Hero() {
  const features = [
    {
      title: "Effortless Transcription",
      subtitle: "Capture lectures, meetings, and more with ease.",
      icon: "🎙️",
    },
    {
      title: "Intelligent Organization",
      subtitle: "Tag, search, and find notes effortlessly.",
      icon: "🗂️",
    },
    {
      title: "AI-Powered Summarization",
      subtitle: "Get concise summaries of your notes in seconds.",
      icon: "📝",
    },
    {
      title: "Real-time Collaboration",
      subtitle: "Work seamlessly with others on shared notes.",
      icon: "👥",
    },
    {
      title: "Cross-Platform Sync",
      subtitle: "Access your notes anytime, anywhere.",
      icon: "📱",
    },
  ];
  return (
    <div>
      <section className="h-screen bg-gradient-to-r from-violet-200 to-pink-200">
        <Header />
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
              <Button variant={"outline"}>Learn More</Button>
            </div>
          </i>
        </div>
      </section>

      <section className="p-20 h-screen overflow-scroll bg-sky-100">
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold text-center text-blue-500">
            Features We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[4rem] ">
            {features.map((item, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <CardHeader className="flex flex-col items-center justify-center text-center cursor-pointer gap-3">
                  <h2 className="text-[3rem]" >{item.icon}</h2>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.subtitle}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
