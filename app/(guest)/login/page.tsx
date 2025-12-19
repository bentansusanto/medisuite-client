import { generateMeta } from "@/lib/utils";
import { Login } from "@/modules/Authentication/Login/Login";

export async function generateMetadata() {
  return generateMeta({
    title: "Login Page - Shadcn UI Kit Free",
    description:
      "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
    canonical: "/login"
  });
}

export default function LoginPageV1() {
  return <Login />;
}
