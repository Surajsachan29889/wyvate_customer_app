import { Poppins } from "next/font/google";
import NotificationHeader from "../_components/NotificationHeader";


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
   <NotificationHeader />
    {children}
   </>
  );
}
