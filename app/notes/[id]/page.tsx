import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}
export const generateMetadata = async ({
  params,
}: NoteDetailsProps): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `http://localhost:3000/notes/${note.id}`,
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
const NoteDetailsPage = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
};
export default NoteDetailsPage;
