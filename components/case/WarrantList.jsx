import SidebarWarrant from "./SidebarWarrant";
// import prisma from "@/lib/prisma"

// const fetchWarrant = async (id) => {
//     const res = await prisma.warrant.findFirst({
//       where: { id: parseInt (id) },
//     });

//     return res;
// };

// const fetchWarrant = async () => {
//   try {
//     const res = await fetch('/api/warrant', {
//       method: 'GET',
//       },
//     );
//     const data = await res.json();
//     return data.data
//   }
//   catch (error) {
//     console.log(error)
//   }
// }

function renderHTML(htmlString) {
  return { __html: htmlString };
}

function WarrantList({ warrants }) {
  return (
    <ul>
      {warrants.map((warrant) => (
        <li key={warrant.id}>
          <h3>{warrant.title}</h3>
          <p dangerouslySetInnerHTML={renderHTML(warrant.data)}></p>
        </li>
      ))}
    </ul>
  );
}


const WarrantListPage = ({ warrants }) => {
  // const warrants = await fetchWarrant (id);

  return (
    <>
      {warrants.length > 0 ? (
        <ul className="notes-list">
          {warrants.map((Case) => (
            <li key={Case.id}>
              <SidebarWarrant cAse={Case} />
            </li>
          ))}
        </ul>
        // <WarrantList warrants={warrants} />
      ) : (
        <div className="notes-empty">
          {"No Warrants created yet!"}
        </div>
      )}
    </>
  );
};

export default WarrantListPage;
