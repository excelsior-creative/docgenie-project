"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white backdrop-blur-xl"
            : "bg-white"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex pl-10 pr-10 pt-3 pb-3 items-center justify-between xl:mx-auto">
          <Link href="/case" className="flex items-center font-display text-2xl no-underline">
            <Image
              src="/docgenie.png"
              alt="logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p className="logo-text">DocGenie</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
