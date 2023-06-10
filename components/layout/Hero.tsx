'use client'
import React from 'react'
import {useTypewriter} from 'react-simple-typewriter';
import Image from "next/image";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import UserDropdown from "@/components/layout/user-dropdown";
import { Session } from "next-auth";
import useScroll from "@/lib/hooks/use-scroll";

function Hero({session}: {session: Session | null}) {
    const [text, count] = useTypewriter({
        words: [
            "DOCGENIE",
            "Your documentation engine.",
        ],
        loop: true,
    });
    const { SignInModal, setShowSignInModal } = useSignInModal();
    const scrolled = useScroll(50);
  return (
    <div>
        <SignInModal />
        <div className='border border-red-500 rounded-full h-[260px] w-[200px]'/>
        <h1 className='text-8xl flex justify-center'>
        <Image
                src="/docgenie.png"
                alt="logo"
                width="110"
                height="110"
        ></Image>
            <span>{text}</span>
        </h1>
        <div className='border border-red-500 rounded-full h-[50px] w-[200px]'/>
        <div className='justify-center flex'>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded border border-black bg-[rgb(235,232,232)] font-sans font-semibold p-2 px-4 text-xl text-[rgb(36,36,36)] transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
    </div>
  )
}

export default Hero