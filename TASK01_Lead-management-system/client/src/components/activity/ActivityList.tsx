import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../api/leadApi";
import ActivityItem from "./ActivityItem";

export default function ActivityList({ leadId }: { leadId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["activities", leadId],
    queryFn: () => getActivities(leadId),
  });

  if (isLoading) return <p>Loading activities...</p>;

  const activities = data?.activities || [];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Activity History</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500">No activities yet</p>
      ) : (
        activities.map((activity: any) => (
          <ActivityItem key={activity._id} item={activity} />
        ))
      )}
    </div>
  );
}
