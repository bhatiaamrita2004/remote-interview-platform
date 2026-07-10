"use client";

import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import DashboardBtn from "./DasboardBtn";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 font-mono text-2xl font-semibold transition-opacity hover:opacity-80"
        >
          <CodeIcon className="size-8 text-emerald-500" />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            CodeSync
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />

          {isSignedIn ? (
            <>
              <DashboardBtn />
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal" />
              <SignUpButton mode="modal" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}