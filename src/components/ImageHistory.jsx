import { useState } from "react";
import ImageCard from "./ImageCard";

export default function ImageHistory({
  history,
  setImage,
  setPreviewImage,
  clearHistory,
  removeImage,
  toggleFavorite,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [showFavorites, setShowFavorites] = useState(false);

    const filteredHistory = history
  .filter((item) =>
    item.prompt.toLowerCase().includes(search.toLowerCase())
  )
  .filter((item) =>
    showFavorites ? item.favorite : true
  )
  .sort((a, b) =>
    sort === "newest"
      ? b.id - a.id
      : a.id - b.id
  );
  const displayedHistory =
    filter === "favorites"
      ? filteredHistory.filter((item) => item.favorite)
      : filteredHistory;

  if (!history || history.length === 0) {
    return (
      <div
        style={{
          marginTop: 40,
          background: "#0F172A",
          padding: 25,
          borderRadius: 18,
          border: "1px solid #1F2937",
        }}
      >
        <h2 style={{ color: "white", marginBottom: 20 }}>
          🖼 Image History (0)
        </h2>

        <p
          style={{
            color: "#94A3B8",
            textAlign: "center",
          }}
        >
          No generated images yet.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 40,
        background: "#0F172A",
        padding: 25,
        borderRadius: 18,
        border: "1px solid #1F2937",
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search prompts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 20,
          padding: 12,
          borderRadius: 10,
          border: "1px solid #374151",
          background: "#111827",
          color: "white",
        }}
      />

      <select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
  style={{
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    background: "#111827",
    color: "white",
    border: "1px solid #374151",
  }}
>
  <option value="newest">🆕 Newest First</option>
  <option value="oldest">📜 Oldest First</option>
</select>

    <button
  onClick={() => setShowFavorites(!showFavorites)}
  style={{
    marginBottom: 20,
    marginLeft: 10,
    padding: "10px 16px",
    border: "none",
    borderRadius: 10,
    background: showFavorites ? "#F59E0B" : "#374151",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {showFavorites
    ? "⭐ Showing Favorites"
    : "☆ Show Favorites"}
</button>

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            background:
              filter === "all" ? "#2563EB" : "#374151",
            color: "white",
          }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("favorites")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            background:
              filter === "favorites"
                ? "#F59E0B"
                : "#374151",
            color: "white",
          }}
        >
          ⭐ Favorites
        </button>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            color: "white",
            margin: 0,
          }}
        >
          🖼 Image History ({displayedHistory.length})
        </h2>

        <button
          onClick={clearHistory}
          style={{
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🗑 Clear History
        </button>
      </div>

      {/* Images */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(260px,1fr))",
          gap: 20,
        }}
      >
        {displayedHistory.map((item) => (
          <ImageCard
            key={item.id}
            item={item}
            setImage={setImage}
            setPreviewImage={setPreviewImage}
            removeImage={removeImage}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}