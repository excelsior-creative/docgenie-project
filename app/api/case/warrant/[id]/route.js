import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// Delete Warrant
export async function DELETE (Request, Context) {
    console.log (Context);
    
    let updatedCase = await prisma.warrant.delete({
        where: { id: parseInt (Context.params.id) },
    });
      
  return NextResponse.json({});
  }