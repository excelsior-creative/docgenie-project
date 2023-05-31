import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Delete Case
export async function DELETE (Request, Context) {
    console.log ("Context", Context);
    
    let updatedCase = await prisma.case.delete({
        where: { id: parseInt (Context.params.id) },
    });
      
  return NextResponse.json({});
  }