import Card from "../components/common/Card";

export default function MigrationPlan() {
  return (
    <section style={{ padding: "40px 32px" }}>
      <Card title="Migration Plan">
        <h3>Week 1</h3>
        <ul>
          <li>Set up project scaffold and install dependencies.</li>
          <li>Define routes, authentication, and database connection.</li>
        </ul>
        <h3>Month 1</h3>
        <ul>
          <li>Build user workflows and API CRUD operations.</li>
          <li>Implement validation, security, and deployment configuration.</li>
        </ul>
        <h3>Quarter 1</h3>
        <ul>
          <li>Stabilize production deployment and add monitoring.</li>
          <li>Extend testing, analytics, and developer documentation.</li>
        </ul>
        <p>Do not perform a big-bang rewrite. Incremental delivery reduces risk and preserves existing value.</p>
      </Card>
    </section>
  );
}
