import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addNote } from "../../api/leadApi";

export default function NoteForm({
  leadId,
  onSuccess,
}: {
  leadId: string;
  onSuccess: () => void;
}) {
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: () => addNote(leadId, content),
    onSuccess: () => {
      setContent("");
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      mutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a note..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <button
        type="submit"
        disabled={mutation.isPending || !content.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
}
