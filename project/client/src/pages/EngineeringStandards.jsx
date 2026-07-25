import Card from "../components/common/Card";

export default function EngineeringStandards() {
  return (
    <section style={{ padding: "40px 32px" }}>
      <Card title="Engineering Standards">
        <h3>Coding Standards</h3>
        <ul>
          <li>Use meaningful names and one-responsibility functions.</li>
          <li>Avoid duplicate code and keep components small.</li>
        </ul>
        <h3>Git Workflow</h3>
        <ul>
          <li>Use feature branches, pull requests, and code review.</li>
        </ul>
        <h3>Testing Strategy</h3>
        <ul>
          <li>Keep code modular and test-ready; add Jest later.</li>
        </ul>
        <h3>CI/CD</h3>
        <ul>
          <li>Automate linting, formatting, and deployment pipelines.</li>
        </ul>
        <h3>Security</h3>
        <ul>
          <li>Enforce validation, secure headers, and token-based auth.</li>
        </ul>
      </Card>
    </section>
  );
}
