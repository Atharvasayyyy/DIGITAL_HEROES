import Card from "../components/common/Card";

export default function Assessment() {
  return (
    <section style={{ padding: "40px 32px" }}>
      <Card title="Assessment Document">
        <h3>Current Problems</h3>
        <ul>
          <li>Legacy architecture limits scalability.</li>
          <li>Inconsistent code quality and missing validation.</li>
          <li>Poor error handling and security posture.</li>
        </ul>
        <h3>Risks</h3>
        <ul>
          <li>Data breach from insecure inputs.</li>
          <li>Deployment delays due to poor structure.</li>
        </ul>
        <h3>Recommendations</h3>
        <ul>
          <li>Adopt layered architecture and centralized validation.</li>
          <li>Use secure headers, JWT, and environment configuration.</li>
        </ul>
      </Card>
    </section>
  );
}
