import SidebarCase from "./SidebarCase";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchAllCases = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      const res = await prisma.case.findMany({
        where: {
          user_id: null
        }
      });
      return res;
    }
    else {
      const res = await prisma.case.findMany({
        where: {
          user_id: session.user.id
        }});

      return res;
    }
};

const CaseList = async ({ searchText }) => {
  const cases = await fetchAllCases();

  return (
    <>
      {cases.length > 0 ? (
        <ul className="notes-list">
          {cases.map((Case) => (
            <li key={Case.id}>
              <SidebarCase cAse={Case} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="notes-empty">
          {searchText ? `Couldn't find any cases titled "${searchText}".` : "No cases created yet!"}{" "}
        </div>
      )}
    </>
  );
};

export default CaseList;
