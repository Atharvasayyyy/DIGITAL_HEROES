export default function NoteCard({ note }: any) {
  const createdAt = new Date(note.createdAt).toLocaleString();

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm">{note.author?.name || "Unknown"}</p>
          <p className="text-xs text-gray-500">{createdAt}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700">{note.content}</p>
    </div>
  );
}