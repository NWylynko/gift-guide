"use server";

import { db, driz, schemas } from "@/db/client";
import { revalidatePath } from "next/cache";

export const markAsGifted = async (giftId: number) => {
  const [user] = await db
    .update(schemas.gift)
    .set({
      gifted: true,
    })
    .where(driz.eq(schemas.gift.giftId, giftId))
    .returning({
      username: schemas.gift.username,
    });

  if (!user) {
    throw new Error("Gift not found");
  }

  revalidatePath("/wishlist");
  revalidatePath(`/wishlist/${user.username}`);

  return "OK";
};
