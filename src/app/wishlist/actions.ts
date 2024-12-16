"use server";

import { auth } from "@/auth";
import { db, driz, schemas } from "@/db/client";
import { revalidatePath } from "next/cache";
import { load as cheerio } from "cheerio";

import { openai } from "@ai-sdk/openai";
import { ExaClient } from "@agentic/exa";
import { generateText } from "ai";
import { createAISDKTools } from "@agentic/ai-sdk";

const lookupWebsite = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      // this is to help prevent websites from blocking us
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch website");
  }

  if (response.status !== 200) {
    throw new Error("Failed to fetch website");
  }

  const html = await response.text();

  const document = cheerio(html);

  const title =
    document("title").text() ??
    document("meta[property='og:title']").attr("content") ??
    document("meta[name='twitter:title']").attr("content") ??
    document("meta[name='title']").attr("content");

  const description =
    document("meta[name=description]").attr("content") ??
    document("meta[property='og:description']").attr("content") ??
    document("meta[name='twitter:description']").attr("content") ??
    document("meta[name='description']").attr("content");

  const image =
    document("meta[property='og:image']").attr("content") ??
    document("meta[name='twitter:image']").attr("content") ??
    document("meta[name='image']").attr("content") ??
    document("meta[name='og:image']").attr("content");

  return {
    title,
    description,
    image,
  };
};

const exa = new ExaClient();
const tools = createAISDKTools(exa);
const model = openai("gpt-4o-mini");

const searchWeb = async (prompt: string) => {
  const result = await generateText({
    model,
    tools,
    prompt,
    maxSteps: 5,
  });

  console.log(result);

  return result.text;
};

export const addNewGift = async (productUrl: string) => {
  const session = await auth();

  console.log(session);

  if (!session) {
    throw new Error("User must be authenticated to add a new product");
  }

  if (!session.authId) {
    throw new Error("User must have an authId to add a new product");
  }

  const [user] = await db
    .select({
      username: schemas.user.username,
    })
    .from(schemas.user)
    .where(driz.eq(schemas.user.authId, session.authId));

  if (!user) {
    throw new Error("User must be created before adding a new product");
  }

  const { title, description, image } = await lookupWebsite(productUrl);

  console.log({
    title,
    description,
    image,
  });

  // const web = await searchWeb(
  //   `Tell me about the product at this URL: ${productUrl}, tell me the name, a short description, price, and a url to the image.`
  // );

  // console.log({ web });

  // const web2 = await searchWeb(
  //   `Tell me about this product: ${title}, a short description, price, url to buy the product, and a url to the image.`
  // );

  // console.log({ web2 });

  await db.insert(schemas.gift).values({
    username: user.username,
    url: productUrl.slice(0, 2000),
    name: title.slice(0, 200),
    description: description?.slice(0, 2000),
    image: image?.slice(0, 2000),
    price: null,
    salePrice: null,
    createdAt: new Date(),
  });

  revalidatePath("/wishlist");
  revalidatePath(`/wishlist/${user.username}`);

  return "OK";
};

export const removeGift = async (giftId: number) => {
  const session = await auth();

  console.log(session);

  if (!session) {
    throw new Error("User must be authenticated to add a new product");
  }

  if (!session.authId) {
    throw new Error("User must have an authId to add a new product");
  }

  const [user] = await db
    .select({
      username: schemas.user.username,
    })
    .from(schemas.user)
    .where(driz.eq(schemas.user.authId, session.authId));

  if (!user) {
    throw new Error("User must be created before adding a new product");
  }

  await db
    .delete(schemas.gift)
    .where(driz.and(driz.eq(schemas.gift.username, user.username), driz.eq(schemas.gift.giftId, giftId)));

  revalidatePath("/wishlist");
  revalidatePath(`/wishlist/${user.username}`);

  return "OK";
};
