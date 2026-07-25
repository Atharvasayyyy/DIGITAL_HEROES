export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the lead management dashboard. Review your pipeline, recent activity, and quick actions from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Pipeline Overview</h2>
          <p className="text-gray-700">
            Track new leads, open opportunities, and recent conversions across your sales pipeline.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-700">
            See the latest lead updates, notes, and team activity in one place.
          </p>
        </section>
      </div>
    </div>
  );
}
