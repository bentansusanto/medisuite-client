import { generateMeta } from "@/lib/utils";
import { Register } from "@/modules/Authentication/Register/Register";

export async function generateMetadata() {
  return generateMeta({
    title: "Register Page - Medisuite App",
    description:
      "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
    canonical: "/register"
  });
}

export default function LoginPageV1() {
  return <Register />;
}
