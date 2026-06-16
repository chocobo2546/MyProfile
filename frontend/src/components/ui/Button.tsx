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
        gap: 8,
        border: isPrimary ? "none" : "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize,
        fontWeight: 600,
        letterSpacing: "0.01em",
        color: isPrimary ? "#000" : hovered && !disabled ? "#00c853" : "#e0e0e0",
        background: isPrimary ? "#00c853" : "transparent",
        borderColor: isPrimary
          ? undefined
          : hovered && !disabled
          ? "#00c853"
          : "rgba(255,255,255,0.12)",
        boxShadow:
          isPrimary && hovered && !disabled
            ? "0 8px 24px rgba(0,200,83,0.25)"
            : "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: disabled ? 0.6 : 1,
        transform:
          hovered && !disabled ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
