"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
  
      <div className="flex items-center justify-between shadow-md border p-4">
        <div>
          <Image src="/logo.svg" width={170} height={120} alt="logo" />
        </div>
        <div>
          <SignedIn>
            <Link href={"/dashboard"}>
              {" "}
              <Button> Go To Dashboard</Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
  );
}
