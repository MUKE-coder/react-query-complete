import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="p-12 text-center text-balance scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Integrating React Query with Server Actions in Next.js 15
      </h1>
      <Button asChild>
        <Link href={"/contacts"}>View the Demo App</Link>
      </Button>
    </div>
  );
}
