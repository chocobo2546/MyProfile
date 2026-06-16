import { useEffect, useState } from "react";

interface Metric {
  icon: string;
  label: string;
  value: number;
}

const METRICS: Metric[] = [
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Total Visitors", value: 2847 },
  { icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10", label: "Total Downloads", value: 1253 },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Today Visitors", value: 142 },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Today Downloads", value: 38 },
];

function animateValue(target: number, setter: (v: number) => void) {
  let current = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    setter(current);
  }, 30);
  return () => clearInterval(timer);
}

const MetricCard = ({ icon, label, value: target }: Metric) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const cleanup = animateValue(target, setDisplay);
    return cleanup;
  }, [target]);

  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: 12,
        padding: "1.5rem",
        border: "1px solid rgba(255,255,255,.04)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(0,200,83,.15)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,.04)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(0,200,83,.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00c853"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </div>
      <div
        style={{
          color: "#888",
          fontSize: ".8rem",
          textTransform: "uppercase",
          letterSpacing: ".5px",
          marginBottom: ".3rem",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 700 }}>
        {display.toLocaleString()}
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  return (
    <div
      className="dash-wrap"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "3rem 2rem",
      }}
    >
      <h1 style={{ fontSize: "1.6rem", marginBottom: ".3rem", fontWeight: 700 }}>
        Dashboard
      </h1>
      <p style={{ color: "#888", marginBottom: "2.5rem" }}>
        Overview
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.2rem",
        }}
      >
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dash-wrap { padding: 2rem 1rem !important; }
        }
      `}</style>
    </div>
  );
};
