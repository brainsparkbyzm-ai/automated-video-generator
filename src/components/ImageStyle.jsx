export default function ImageStyle({
  style,
  setStyle,
}) {
  return (
    <select
      value={style}
      onChange={(e) => setStyle(e.target.value)}
    >
      <option>Realistic</option>
      <option>Cinematic</option>
      <option>Anime</option>
      <option>Pixar</option>
      <option>Stickman</option>
      <option>Sketch</option>
      <option>Fantasy</option>
      <option>Cyberpunk</option>
    </select>
  );
}