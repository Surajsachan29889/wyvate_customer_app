import { Poppins } from "next/font/google";
import Navmenu from "../../app/_components/Navmenu";
import HeaderSearch from "../../app/_components/HeaderSearch";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Explore",
  description: "Jaha Wait Waha Wyvate",
};

export default function Layout({ children }) {
  return (
   <>
   <HeaderSearch />
    {children}
   </>
  );
}
