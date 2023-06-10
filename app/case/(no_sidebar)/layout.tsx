import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "@/app/fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";


/* eslint-disable @next/next/no-img-element */
import CaseList from "@/components/case/CaseList";
import CaseListSkeleton from "@/components/case/CaseListSkeleton";
import EditButton from "@/components/case/EditButton";
import { NextAuthProvider } from "@/app/providers";
import BackButton from "@/components/case/BackButton";

const CaseListComponent = CaseList as unknown as () => JSX.Element;

export default async function Layout ({children}: {children: React.ReactNode;}) {
  return (
    <>
        <div className="containerr">
          <BackButton />
            <section className="content">{children}</section>
        </div>
    </>
  );
}
