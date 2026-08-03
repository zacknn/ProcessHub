import Button from "@/components/Button";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/operations");
}
