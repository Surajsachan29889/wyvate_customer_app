import { Poppins } from "next/font/google";
import ExploreHeader from "@/app/_components/ExploreHeader";

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
   <ExploreHeader />
    {children}
   </>
  );
}
