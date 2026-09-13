import { useState } from "react";

export default function ScriptHistory({
  history,
  setHistory,
  favorites,
  setFavorites,
  setResult,
  setTopic,
}) {

  const [search, setSearch] =
    useState("");

  const filteredHistory =
    history.filter((item) => {

      return (
        item.topic
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.type
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    });

  if (history.length === 0) {

    return null;

  }

  return (

    <div
      style={{
        marginTop: 40,
        background: "#0F172A",
        padding: 20,
        borderRadius: 15,
        border: "1px solid #1E293B",
      }}
    >

      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        📜 Script History
      </h2>

      <input
        type="text"
        placeholder="🔍 Search history..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "#111827",
          color: "white",
          border: "1px solid #374151",
          marginBottom: 20,
        }}
      />

      {

        filteredHistory.map((item) => (

          <div
            key={item.id}
            style={{
              background: "#111827",
              padding: 15,
              borderRadius: 12,
              marginBottom: 15,
              border: "1px solid #1E293B",
            }}
          >

            <h3
              style={{
                color: "white",
                margin: 0,
              }}
            >
              {item.topic}
            </h3>

            <p
              style={{
                color: "#94A3B8",
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              {item.type}
            </p>

            <small
              style={{
                color: "#64748B",
              }}
            >
              {item.date}
            </small>

            <br />
            <br />

            <div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  }}
>
                          <button
                onClick={() => {
                  setResult(item.result);
                  setTopic(item.topic);
                }}
              >
                📂 Open
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.result);
                  alert("✅ Copied");
                }}
              >
                📋 Copy
              </button>

              <button
                onClick={() => {

                  const blob = new Blob(
                    [item.result],
                    {
                      type: "text/plain",
                    }
                  );

                  const url =
                    URL.createObjectURL(blob);

                  const a =
                    document.createElement("a");

                  a.href = url;
                  a.download =
                    `${item.topic}.txt`;

                  a.click();

                  URL.revokeObjectURL(url);

                }}
              >
                📄 Download
              </button>

              <button
                onClick={() => {

                  const exists =
                    favorites.some(
                      (fav) =>
                        fav.result === item.result
                    );

                  if (exists) {

                    setFavorites((prev) =>
                      prev.filter(
                        (fav) =>
                          fav.result !== item.result
                      )
                    );

                  } else {

                    setFavorites((prev) => [

                      ...prev,

                      {
                        ...item,
                        favorite: true,
                      },

                    ]);

                  }

                }}
              >
                ⭐ Favorite
              </button>

              <button
                onClick={() => {

                  if (
                    window.confirm(
                      "Delete this script?"
                    )
                  ) {

                    setHistory((prev) =>
                      prev.filter(
                        (script) =>
                          script.id !== item.id
                      )
                    );

                  }

                }}
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))

      }

    </div>

  );

}