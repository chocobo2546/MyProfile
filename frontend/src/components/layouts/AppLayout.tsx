import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ParticleBackground } from "../ui/ParticleBackground";

export const AppLayout = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0a",
        color: "#e0e0e0",
      }}
    >
      <ParticleBackground />
      <Navbar />
      <main
        style={{
          flex: 1,
          paddingTop: 64,
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            animation: "fadeSlideIn .5s cubic-bezier(.16,1,.3,1) forwards",
            width: "100%",
            minHeight: "100%",
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};
