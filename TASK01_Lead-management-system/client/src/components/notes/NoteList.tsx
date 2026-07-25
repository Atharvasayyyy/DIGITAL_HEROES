import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../api/leadApi";
import NoteCard from "./NoteCard";

export default function NoteList({ leadId }: { leadId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["notes", leadId],
    queryFn: () => getNotes(leadId),
  });

  if (isLoading) return <p>Loading notes...</p>;

  const notes = data?.notes || [];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Notes</h3>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet</p>
      ) : (
        notes.map((note: any) => <NoteCard key={note._id} note={note} />)
      )}
    </div>
  );
}
