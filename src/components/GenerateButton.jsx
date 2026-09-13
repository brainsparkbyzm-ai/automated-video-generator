export default function GenerateButton({
  generateImage,
  loading,
}) {
  return (
    <button
      onClick={generateImage}
      disabled={loading}
     style={{
  width: "100%",
  background:
    "linear-gradient(90deg,#2563EB,#4F46E5)",
  color: "white",
  border: "none",
  padding: "18px",
  borderRadius: "14px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  transition: ".25s",
  boxShadow:
    "0 10px 30px rgba(37,99,235,.35)",
}}
    >
      {loading ? "Generating..." : "🎨 Generate Image"}
    </button>
  );
}