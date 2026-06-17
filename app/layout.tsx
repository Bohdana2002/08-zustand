import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: "300",
  display: "swap",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "The app for managing personal notes which helps to keep thoughts organized and accessible in one place",
  openGraph: {
    title: "NoteHub",
    description:
      "The app for managing personal notes which helps to keep thoughts organized and accessible in one place",
    url: "http://localhost:3000/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        height: 630,
        width: 1200,
        alt: "The app for notes",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
