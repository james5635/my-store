import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { ensureProductInDb } from "../../lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  try {
    const dbProductId = await ensureProductInDb(productId);
    
    const likes = await prisma.like.count({
      where: { productId: dbProductId },
    });

    const session = await getServerSession(authOptions);
    let userLiked = false;
    
    if (session?.user?.id) {
      const like = await prisma.like.findUnique({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId: dbProductId,
          },
        },
      });
      userLiked = !!like;
    }

    return NextResponse.json({ likes, userLiked });
  } catch (error) {
    console.error("Error in GET /api/likes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  try {
    const dbProductId = await ensureProductInDb(productId);

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: dbProductId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ liked: false });
    }

    await prisma.like.create({
      data: {
        userId: session.user.id,
        productId: dbProductId,
      },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error("Error in POST /api/likes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
