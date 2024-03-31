// import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import ReduxProvider from "./_components/ReduxProvider";
import { LayoutProvider } from "./layoutprovider";
import { PrimeReactProvider } from 'primereact/api';


const myFont = localFont({
  src: './KeepCalm-Medium.ttf',
  display: "swap",
})

export const metadata = {
  title: "Wyvate",
  description: "Jaha Wait Waha Wyvate",
};

export default function RootLayout({ children }) {
  const value = {
    ripple: true,
};
  return (
    <html lang="en">
      <body className={myFont.className}>
         <ReduxProvider>
          <LayoutProvider>
          <PrimeReactProvider value={value}>

           {children}
           </PrimeReactProvider>
          </LayoutProvider>
          </ReduxProvider>
      </body>
    </html>
  );
}
