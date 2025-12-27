import { redirect } from "next/navigation";
import { routePath } from "../routes";

export default function RootPage() {
  redirect(routePath.home);
}

