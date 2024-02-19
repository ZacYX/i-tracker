import { prisma } from "../../../prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const validation = schema.safeParse(body);
  if (!validation.success) {
    console.log(validation.error);
    return Response.json(validation.error.errors, { status: 400 }); 
  }

  const createIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
  }})

  console.log("Create issue sucess!");
  return Response.json(createIssue, { status: 200 })

}