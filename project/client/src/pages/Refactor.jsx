import Card from "../components/common/Card";

export default function Refactor() {
  return (
    <section style={{ padding: "40px 32px" }}>
      <Card title="Refactor Example">
        <h3>Bad Code</h3>
        <pre style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px" }}>
          {`function calculate(a, b) {
  if (a > b) {
    return a - b;
  } else {
    if (a < b) {
       return b - a;
    } else {
       return 0;
    }
  }
}`}
        </pre>
        <h3>Improved Code</h3>
        <pre style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px" }}>
          {`function calculateDifference(a, b) {
  return Math.abs(a - b);
}`}
        </pre>
        <p>The improved code is simpler, more readable, and easier to maintain.</p>
      </Card>
    </section>
  );
}
