"use client";
import Link from "next/link";
import "./styles.scss";
import { usePathname } from "next/navigation";

export default function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <div className="auth-page">
      {children}
      <div className="auth-page-footer">
        <small className="block mt-5">
          {`${
            pathName?.includes("register")
              ? "Already have an account? "
              : "Don't have an account? "
          }`}
          <Link
            href={`${pathName?.includes("register") ? "/login" : "/register"}`}
            className="text-blue-700 font-semibold"
          >
            {`${pathName?.includes("register") ? "Login" : "Register"}`}
          </Link>
        </small>
        <small>
          Forgot your password?{" "}
          <Link href="/forgot-password" className="text-red-800 font-semibold">
            Reset Password
          </Link>
        </small>
      </div>
    </div>
  );
}
