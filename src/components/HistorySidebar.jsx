export default function HistorySidebar({
  history,
  setResult,
  setHistory,
}) {
  const deleteHistory = (id) => {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);

    localStorage.setItem(
      "brainspark-history",
      JSON.stringify(updated)
    );
  };

  return (
    <div
      style={{
        width: "300px",
        background: "#111827",
        color: "white",
        padding: "20px",
        overflowY: "auto",
        height: "100vh",
        borderRight: "1px solid #374151",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        📚 History
      </h2>

      {history.length === 0 && (
        <p style={{ color: "#9CA3AF" }}>
          No scripts yet.
        </p>
      )}

      {history.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "12px",
            cursor: "pointer",
          }}
          onClick={() => setResult(item.result)}
        >
          <strong>{item.topic}</strong>

          <br />

          <small
            style={{
              color: "#9CA3AF",
            }}
          >
            {item.date}
          </small>

          <br />

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteHistory(item.id);
            }}
            style={{
              marginTop: "10px",
              background: "#DC2626",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}