export default function PromptSearch({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="🔍 Search prompts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #374151",
        background: "#1F2937",
        color: "white",
        marginBottom: "20px",
        outline: "none",
      }}
    />
  );
}