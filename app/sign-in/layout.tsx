import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        {children}
      </GoogleOAuthProvider>
    </>
  );
}
