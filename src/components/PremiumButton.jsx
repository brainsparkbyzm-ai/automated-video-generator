import "./PremiumButton.css";


export default function PremiumButton({
  children,
  onClick,
  style = {},
  ...props
}) {
  return (
    <button
      className="premium-btn"
      onClick={onClick}
      {...props}
      style={{
        padding: "14px 22px",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: 15,
        color: "white",

        background:
         "linear-gradient(270deg,#2563EB,#7C3AED,#EC4899,#2563EB)",

        backgroundSize: "400% 400%",

        boxShadow:
          "0 10px 25px rgba(37,99,235,.35)",

        transition:
          "all .25s ease",

        position: "relative",

        overflow: "hidden",

        ...style,
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-4px) scale(1.02)";

        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(37,99,235,.5)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";

        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(37,99,235,.35)";
      }}
    >
      {children}
    </button>
  );
}