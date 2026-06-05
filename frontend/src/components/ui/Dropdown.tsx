import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface Props {
  trigger: ReactNode;
  items: DropdownItem[];

  width?: number;
  align?: "left" | "right";
  openOnHover?: boolean;
}

export const Dropdown = ({
  trigger,
  items,
  width = 220,
  align = "right",
  openOnHover = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const triggerProps = openOnHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
    : {
        onClick: () => setOpen((prev) => !prev),
      };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={() => {
        if (openOnHover) setOpen(true);
      }}
      onMouseLeave={() => {
        if (openOnHover) setOpen(false);
      }}
    >
      <div
        {...triggerProps}
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {trigger}
      </div>

      <div
        style={{
          position: "absolute",
          top: 56,
          ...(align === "right" ? { right: 0 } : { left: 0 }),
          width,

          borderRadius: 14,
          overflow: "hidden",

          background: "rgba(17,24,39,0.96)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",

          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: open ? "auto" : "none",

          transition: "opacity 0.18s ease, transform 0.18s ease",
          zIndex: 9999,
        }}
      >
        {items.map((item, index) => (
          <button
            key={`${item.label}-${index}`}
            type="button"
            onClick={() => {
              item.onClick();
              setOpen(false);
            }}
            style={{
              width: "100%",
              padding: "14px 18px",

              border: "none",
              background: "transparent",
              color: "white",
              textAlign: "left",

              fontSize: 15,
              fontWeight: 600,

              cursor: "pointer",

              transition:
                "background 0.18s ease, padding-left 0.18s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.paddingLeft = "24px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "18px";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};