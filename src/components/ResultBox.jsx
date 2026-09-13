export default function ResultBox({ result }) {
  const copyScript = () => {
    navigator.clipboard.writeText(result);
    alert("✅ Script Copied Successfully!");
  };

  const downloadTxt = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "BrainSpark_Documentary.txt";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        width: "95%",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={copyScript}
          style={{
            background: "#10B981",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📋 Copy Script
        </button>

        <button
          onClick={downloadTxt}
          style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📥 Download TXT
        </button>
      </div>

      <div id="result-box">
        <textarea
          value={result}
          readOnly
          placeholder="Your generated documentary will appear here..."
          style={{
            width: "100%",
            height: "600px",
            padding: "20px",
            background: "#FFFFFF",
            color: "#111827",
            border: "1px solid #D1D5DB",
            borderRadius: "12px",
            fontSize: "16px",
            lineHeight: "1.8",
            resize: "vertical",
            outline: "none",
            fontFamily: "Consolas, monospace",
          }}
        />
      </div>
    </div>
  );
}