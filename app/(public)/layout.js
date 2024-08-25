import { Inter } from "next/font/google";
import "../globals.css";
import "../custom.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hi Dave",
  description: "Query your Data, Wherever they are.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Space+Grotesk:300,400,600,700"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {/* <Toaster position="top-center" /> */}
        {children}
      </body>
    </html>
  );
}
