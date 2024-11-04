import "./styles.scss";

export default function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="auth-page">{children}</div>;
}
