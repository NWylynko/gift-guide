import { auth } from "@/auth";

export async function UserProfile() {
  const session = await auth();

  const name = session?.user?.name;
  const profilePicture = session?.user?.image;

  return (
    <div className="flex items-center space-x-4 mb-8">
      {profilePicture ? (
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <img src={profilePicture} alt={`${name}'s profile picture`} className="object-cover" />
        </div>
      ) : null}
      {name ? (
        <h2 className="text-2xl font-semibold">{name}'s Wishlist</h2>
      ) : (
        <h2 className="text-2xl font-semibold">Wishlist</h2>
      )}
    </div>
  );
}
