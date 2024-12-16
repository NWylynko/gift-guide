import { WishlistControls } from "@/components/WishlistControls";
import { db, driz, schemas } from "@/db/client";
import { LazyShareButton } from "./LazyShareButton";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";
import { UserProfile } from "./UserProfile";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    view?: "grid" | "list";
  }>;
};

export default async function Home(props: PageProps) {
  const { search, minPrice, maxPrice, view } = await props.searchParams;

  const session = await auth();

  if (session === null) {
    redirect("/login");
  }

  const { authId } = session;

  if (authId === undefined) {
    redirect("/login");
  }

  const [user] = await db
    .select({
      username: schemas.user.username,
      accentColor: schemas.user.accentColor,
    })
    .from(schemas.user)
    .where(driz.eq(schemas.user.authId, authId));

  if (user === undefined) {
    redirect("/onboarding");
  }

  if (user.username === null) {
    redirect("/onboarding");
  }

  const gifts = await db
    .select()
    .from(schemas.gift)
    .where(
      driz.and(
        driz.eq(schemas.gift.username, user.username),
        search ? driz.ilike(schemas.gift.name, `%${search}%`) : undefined,
        minPrice ? driz.gte(schemas.gift.price, parseInt(minPrice, 10)) : undefined,
        maxPrice ? driz.lte(schemas.gift.price, parseInt(maxPrice, 10)) : undefined
      )
    );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <UserProfile accentColor={user.accentColor} />
        <LazyShareButton userId={user.username} />
      </div>
      <ProductForm />
      <div className="mt-8">
        <WishlistControls showViewToggle />
      </div>
      <div
        className={(view ?? "list") === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
      >
        {gifts.map((gift) => (
          <ProductCard key={gift.giftId} product={gift} view={view ?? "list"} />
        ))}
      </div>
    </main>
  );
}
