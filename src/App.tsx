import GridCanvas from "./components/GridCanvas";
import SideBar from "./components/SideBar";
import SimulationContextProvider from "./contexts/SimulationContext";
import Stats from "./components/Stats";
import MobileErrorPage from "./components/MobileErrorPage";

import { useEffect, useState } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the window is resized to mobile size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileErrorPage />;
  }

  return (
    <SimulationContextProvider>
      <div className="pageContent" onContextMenu={(e) => e.preventDefault()}>
        <SideBar />
        <Stats />
        <div className="canvasContainer">
          <GridCanvas />
        </div>
      </div>
    </SimulationContextProvider>
  );
}