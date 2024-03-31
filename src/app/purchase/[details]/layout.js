import { Poppins } from "next/font/google";
import PurchasesHeader from "@/app/_components/PurchasesHeader";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Wyvate",
  description: "Jaha Wait Waha Wyvate",
};

export default function Layout({ children }) {
  return (
   <>
    {children}
   </>
  );
}
