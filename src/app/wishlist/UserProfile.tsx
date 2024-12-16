import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type UserProfileProps = {
  accentColor: "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "orange" | "teal" | "indigo" | "cyan";
};

export async function UserProfile(props: UserProfileProps) {
  const session = await auth();

  if (session === null || session.user === undefined) {
    return <></>;
  }

  const name = session.user.name;
  const profilePicture = session.user.image;

  return (
    <div className="flex items-center space-x-4 mb-8">
      {profilePicture ? (
        <div className="relative size-10 rounded-full overflow-hidden">
          <img src={profilePicture} alt={`${name}'s profile picture`} className="object-cover" />
        </div>
      ) : null}
      {name ? (
        <h2 className={`text-2xl font-semibold text-${props.accentColor}-400`}>{name}'s Wishlist</h2>
      ) : (
        <h2 className={`text-2xl font-semibold text-${props.accentColor}-400`}>Wishlist</h2>
      )}
      <Button
        variant="outline"
        onClick={async () => {
          "use server";
          signOut();
        }}
      >
        Logout
      </Button>
      <div className="hidden text-red-400 text-blue-400 text-green-400 text-yellow-400 text-purple-400 text-pink-400 text-orange-400 text-teal-400 text-indigo-400 text-cyan-400" />
    </div>
  );
}
