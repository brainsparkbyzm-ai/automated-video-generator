export default function PromptScore({ prompt }) {
  let score = 0;

  const checks = [
    "realistic",
    "cinematic",
    "8k",
    "hdr",
    "masterpiece",
    "lighting",
    "detailed",
    "sharp",
    "professional",
    "high quality",
  ];

  checks.forEach((word) => {
    if (prompt.toLowerCase().includes(word))
      score += 10;
  });

  if (score > 100) score = 100;

  const color =
    score > 80
      ? "#22C55E"
      : score > 50
      ? "#F59E0B"
      : "#EF4444";

  return (
    <div
      style={{
        marginTop: 20,
        background: "#111827",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <h3>📊 Prompt Quality</h3>

      <div
        style={{
          width: "100%",
          height: 12,
          background: "#374151",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>

      <h2
        style={{
          color,
          marginTop: 10,
        }}
      >
        {score}/100
      </h2>
    </div>
  );
}