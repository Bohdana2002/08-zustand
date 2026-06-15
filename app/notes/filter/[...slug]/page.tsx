import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}
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
