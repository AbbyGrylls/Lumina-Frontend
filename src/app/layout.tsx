import "./globals.css";
import LayoutSprt from "./LayoutSprt";
import type { Metadata } from "next";
import BloomContextProvider from "./context/BloomContext"
import {AuthContextProvider} from "./context/AuthContext"
//import {UserProvider} from "./context/UserContext"


export const metadata: Metadata = {
  title: "Lumina",
  description: "Just Keep Blooming",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <UserProvider> */}
      <AuthContextProvider>
      < BloomContextProvider>
      <body>
        <LayoutSprt > {children}</LayoutSprt>
      </body>
      </BloomContextProvider>
      </AuthContextProvider>
      {/* </UserProvider> */}
    </html>
  );

}