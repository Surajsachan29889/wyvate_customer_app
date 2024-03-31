import { Poppins } from "next/font/google";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Login",
  description: "Jaha Wait Waha Wyvate",
};

export default function Layout({ children }) {
  return (
   <>
    {children}
   </>
  );
}

