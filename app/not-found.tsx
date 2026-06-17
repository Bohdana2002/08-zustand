import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found page",
  description: "The page you are looking for does not exist",
  openGraph: {
    title: "Not Found page",
    description: "The page you are looking for does not exist",
    url: "http://localhost:3000/not-found",
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

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};
export default NotFound;
