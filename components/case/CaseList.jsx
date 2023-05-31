import SidebarCase from "./SidebarCase";
import prisma from "@/lib/prisma"

const fetchAllCases = async () => {
    const res = await prisma.case.findMany({});  
    return res;
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
