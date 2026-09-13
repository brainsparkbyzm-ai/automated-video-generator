export default function AspectRatio({
  ratio,
  setRatio,
}) {
  return (
    <select
      value={ratio}
      onChange={(e) => setRatio(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "10px",
        background: "#111827",
        color: "white",
        border: "1px solid #374151",
        minWidth: "170px",
      }}
    >
      <option value="1:1">1 : 1 Square</option>
      <option value="16:9">16 : 9 YouTube</option>
      <option value="9:16">9 : 16 Shorts</option>
    </select>
  );
}