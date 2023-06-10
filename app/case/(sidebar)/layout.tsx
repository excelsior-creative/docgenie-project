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

const CaseListComponent = CaseList as unknown as () => JSX.Element;

export default async function Layout ({children}: {children: React.ReactNode;}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Nav />
      <div className="containerr">
        <section className="flex flex-col sidebar">
          <section className="sidebar-header">
              <strong>My Cases</strong>
          </section>
          <section className="sidebar-menu" role="menubar">
            <EditButton>Create Case</EditButton>
          </section>
          <nav>
            <Suspense fallback={<CaseListSkeleton />}>
              <CaseListComponent />
            </Suspense>
          </nav>
        </section>
        <section className="content">{children}</section>
      </div>
    </>
  );
}
