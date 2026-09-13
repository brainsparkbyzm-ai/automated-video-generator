export default function ImageCount({
  imageCount,
  setImageCount,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: 8,
        }}
      >
        Images
      </label>

      <select
        value={imageCount}
        onChange={(e) =>
          setImageCount(Number(e.target.value))
        }
      >
        <option value={1}>1 Image</option>
        <option value={2}>2 Images</option>
        <option value={4}>4 Images</option>
      </select>
    </div>
  );
}