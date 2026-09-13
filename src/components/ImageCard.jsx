export default function ImageCard({
  item,
  removeImage,
  toggleFavorite,
  setImage,
  setPreviewImage,
}) {
  return (
    <div
      style={{
        background: "#1F2937",
        borderRadius: 15,
        overflow: "hidden",
        border: "1px solid #374151",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      }}
    >
      <img
        src={item.image}
        alt="Generated"
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
        }}
      />

      <div style={{ padding: 15 }}>
        <p
          style={{
            color: "#E5E7EB",
            fontSize: 13,
            minHeight: 45,
            overflow: "hidden",
          }}
        >
          {item.prompt}
        </p>

        <p
          style={{
            color: "#9CA3AF",
            fontSize: 11,
            marginBottom: 15,
          }}
        >
          🕒 {item.date}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 10,
          }}
        >
          <button
            onClick={() => setPreviewImage(item.image)}
            style={{
              background: "#2563EB",
              color: "white",
              border: "none",
              padding: 10,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            📂 Open
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(item.prompt);
              alert("✅ Prompt copied");
            }}
            style={{
              background: "#7C3AED",
              color: "white",
              border: "none",
              padding: 10,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            📋 Copy
          </button>

          <button
            onClick={() => toggleFavorite(item.id)}
            style={{
              background: item.favorite ? "#F59E0B" : "#374151",
              color: "white",
              border: "none",
              padding: 10,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {item.favorite ? "⭐ Favorited" : "☆ Favorite"}
          </button>

          <button
            onClick={() => removeImage(item.id)}
            style={{
              background: "#DC2626",
              color: "white",
              border: "none",
              padding: 10,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            🗑 Delete
          </button>

          <a
            href={item.image}
            download={`BrainSpark-${item.id}.png`}
            style={{ gridColumn: "1 / span 2" }}
          >
            <button
              style={{
                width: "100%",
                background: "#16A34A",
                color: "white",
                border: "none",
                padding: 10,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              ⬇ Download
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}