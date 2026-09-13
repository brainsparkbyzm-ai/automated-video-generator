export default function SaveProjectButton({
  saveProject,
}) {
  return (
    <button
      onClick={saveProject}
      style={{
        background: "#059669",
        color: "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      💾 Save Project
    </button>
  );
}