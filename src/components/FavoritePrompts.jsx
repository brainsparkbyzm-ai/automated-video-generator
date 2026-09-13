export default function FavoritePrompts({
  favorites,
  setPrompt,
}) {
  if (favorites.length === 0) return null;

  return (
    <div
      style={{
        marginBottom: 25,
      }}
    >
      <h3>⭐ Favorite Prompts</h3>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
        {favorites.map((item, index) => (
          <button
            key={index}
            onClick={() => setPrompt(item)}
            style={{
              background: "#F59E0B",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {item.substring(0, 35)}...
          </button>
        ))}
      </div>
    </div>
  );
}