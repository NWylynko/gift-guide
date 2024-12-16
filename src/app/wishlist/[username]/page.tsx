import { WishlistProductCard } from "./WishlistProductCard";
import { UserProfile } from "./UserProfile";
import { WishlistControls } from "@/components/WishlistControls";
import { db, driz, schemas } from "@/db/client";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function WishlistPage(props: PageProps) {
  const { username } = await props.params;
  const { search, minPrice, maxPrice } = await props.searchParams;

  const [user] = await db
    .select({
      accentColor: schemas.user.accentColor,
    })
    .from(schemas.user)
    .where(driz.eq(schemas.user.username, username));

  if (user === undefined) {
    notFound();
  }

  const gifts = await db
    .select()
    .from(schemas.gift)
    .where(
      driz.and(
        driz.eq(schemas.gift.username, username),
        search ? driz.ilike(schemas.gift.name, `%${search}%`) : undefined,
        minPrice ? driz.gte(schemas.gift.price, parseInt(minPrice, 10)) : undefined,
        maxPrice ? driz.lte(schemas.gift.price, parseInt(maxPrice, 10)) : undefined,
        driz.not(schemas.gift.gifted)
      )
    );

  return (
    <main className={`w-full min-h-screen px-4 py-8 bg-${"green"}-200`}>
      <UserProfile />
      <div className="mt-8">
        <WishlistControls />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {gifts.map((gift) => (
          <WishlistProductCard key={gift.giftId} product={gift} />
        ))}
      </div>
      <div className="hidden bg-red-200 bg-blue-200 bg-green-200 bg-yellow-200 bg-purple-200 bg-pink-200 bg-orange-200 bg-teal-200 bg-indigo-200 bg-cyan-200" />
    </main>
  );
}
