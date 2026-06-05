import { type CSSProperties, type ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;

  width?: number | string;
  height?: number | string;

  fontSize?: number;
  disabled?: boolean;

  variant?: "primary" | "secondary";

  type?: "button" | "submit" | "reset";

  style?: CSSProperties;
}

export const Button = ({
  children,
  onClick,
  width = "auto",
  height = 48,
  fontSize = 16,
  disabled = false,
  variant = "primary",
  type = "button",
  style,
}: Props) => {
  const [hovered, setHovered] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width,
        height,
        padding: "0 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        border: "none",
        borderRadius: 12,

        cursor: disabled ? "not-allowed" : "pointer",

        fontSize,
        fontWeight: 700,
        letterSpacing: "0.01em",

        color: "white",

        background: isPrimary
          ? "linear-gradient(135deg,#2563eb,#7c3aed)"
          : "rgba(255,255,255,0.10)",

        boxShadow: isPrimary
          ? "0 10px 24px rgba(37,99,235,0.25)"
          : "0 8px 18px rgba(0,0,0,0.24)",

        backdropFilter: "blur(10px)",

        transition:
          "transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",

        opacity: disabled ? 0.6 : 1,
        transform: hovered && !disabled ? "translateY(-2px)" : "translateY(0)",

        ...style,
      }}
    >
      {children}
    </button>
  );
};