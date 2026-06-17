import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All notes" : slug[0];
  return {
    title: `${tag}`,
    description: `Page of notes, now you see ${tag}`,
    openGraph: {
      title: `${tag}`,
      description: "Page of notes",
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          height: 630,
          width: 1200,
          alt: "The notes",
        },
      ],
    },
  };
};
const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();
  const query = "";
  const currentPage = 1;
  const perPage = 12;
  await queryClient.prefetchQuery({
    queryKey: ["notes", query, currentPage, perPage, tag],
    queryFn: () => fetchNotes(query, currentPage, perPage, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};
export default Notes;
