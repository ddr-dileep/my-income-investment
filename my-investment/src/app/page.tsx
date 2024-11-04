"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <div>Home page</div>
    </div>
  );
}
