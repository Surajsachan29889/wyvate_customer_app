"use client";
import { usePathname } from "next/navigation";
import Navmenu from "./_components/Navmenu";
import Bottomnenu from "./_components/Bottommenu";
import Header from "./_components/Header";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();

  const allowedPaths = new Set(["/", "/explore", "/purchase"]);
  const allowedForWyvate = pathname === "/wyvate" ? "/wyvate" : false;
  const allowedForUser = pathname === "/user" ? "/user" : false;
  const shouldShowNavmenu = () => allowedPaths.has(pathname);

  console.log(shouldShowNavmenu)
  console.log(allowedForWyvate)
  return (
    <div className="md:max-w-[30rem] mx-auto">
      {shouldShowNavmenu() && <Header />}
      {shouldShowNavmenu() && <Navmenu />}
      {children}
      {(shouldShowNavmenu() || allowedForWyvate || allowedForUser) && <Bottomnenu pathname={pathname} />}

    </div>
  );
};
