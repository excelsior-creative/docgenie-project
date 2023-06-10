// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

// export async function GET(Request) {
//   return new Response("This is a new API route");
// }

import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Read Warrants
export async function GET (Request) {
  Request = await Request.json();
  console.log (Request)
  let data = await prisma.warrant.findMany();
  return NextResponse.json({ data });
}

// Update Warrant
export async function POST (Request) {
    Request = await Request.json();
    console.log (Request)
    let updatedCase = await prisma.warrant.update({
        where: { 
            id: parseInt (Request.id),
        },
        data: {
            title: Request.data.name,
            body: Request.data.description,
            data: Request.data,
            html: Request.html
        }
    });

  return NextResponse.json({});
}

// Create Warrant
export async function PUT (Request) {
  Request = await Request.json();
  console.log (Request)
  let newCase = await prisma.warrant.create({
    data: {
        caseId: parseInt (Request.caseId),
        title: Request.data.name,
        body: Request.data.description,
        data: Request.data,
        html: Request.html
    },
  });

  return NextResponse.json({});
}

// Delete Warrant
// export async function DELETE (Request, Context) {
//   // SyntaxError: Unexpected end of JSON input? 
//     Request = await Request.json();
//     console.log ("REQUEST", Context);

//     let updatedCase = await prisma.case.delete({
//         where: { id: Request.id },
//     });
    
//   return NextResponse.json({});
// }