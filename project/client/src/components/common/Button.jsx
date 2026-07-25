export default function Button({ label, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "#1d4ed8",
        color: "#ffffff",
        border: "none",
        borderRadius: "9999px",
        padding: "12px 20px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}
