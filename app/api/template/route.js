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

// Read Templates
export async function GET (Request) {
  let data = await prisma.template.findMany();
  return NextResponse.json({ data });
}

// Update Templates
export async function POST (Request) {
  let updatedCase = await prisma.template.update({
    data: { },
    where: { id: 1 },
  });

  return NextResponse.json({ data });
}

// Create Templates
export async function PUT (Request) {
  let updatedCase = await prisma.template.update({
    data: { },
    where: { id: 1 },
  });

  return NextResponse.json({ data });
}