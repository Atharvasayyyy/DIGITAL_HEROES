export default function Error({ message }) {
  return (
    <div style={{ background: "#fee2e2", color: "#991b1b", padding: "16px", borderRadius: "12px", marginBottom: "24px" }}>
      {message}
    </div>
  );
}
