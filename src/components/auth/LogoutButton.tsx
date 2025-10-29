import { signOut } from "@/auth";
import Button from "../ui/Button";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button type="submit" variant="outline">
        Sign Out
      </Button>
    </form>
  );
}
