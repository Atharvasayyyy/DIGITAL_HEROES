export default function ActivityItem({ item }: any) {
  const timestamp = new Date(item.createdAt).toLocaleString();

  const getActionLabel = (action: string) => {
    const labels: any = {
      created: "Lead Created",
      assigned: "Assigned to",
      status_changed: "Status Changed",
      note_added: "Note Added",
    };
    return labels[action] || action;
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 border-l-4 border-l-blue-600">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm">{getActionLabel(item.action)}</p>
          <p className="text-xs text-gray-500">{item.user?.name || "System"}</p>
        </div>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
      {item.details && (
        <p className="mt-2 text-sm text-gray-700">{item.details}</p>
      )}
    </div>
  );
}