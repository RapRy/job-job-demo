"use client"
import UserTopHeader from "@/components/layout/UserTopHeader";
import UserAside from "@/components/layout/UserAside";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="Main overflow-x-hidden">
        <UserTopHeader />
        <div className="flex gap-3">
            <UserAside />
            {children}
        </div>
    </div>
  );
}