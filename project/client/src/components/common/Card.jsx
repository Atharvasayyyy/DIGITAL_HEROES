export default function Card({ title, children }) {
  return (
    <section style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", boxShadow: "0 12px 30px rgba(15,23,42,0.08)", marginBottom: "24px" }}>
      {title && <h2 style={{ marginTop: 0, marginBottom: "16px" }}>{title}</h2>}
      {children}
    </section>
  );
}
