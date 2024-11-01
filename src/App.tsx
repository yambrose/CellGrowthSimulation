import { useState } from "react";
import GridCanvas from "./components/GridCanvas";
import SideBar from "./components/SideBar";
import SimulationContextProvider from "./contexts/SimulationContext";

export default function App() {

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <SimulationContextProvider>
      <div className="pageContent"
        onContextMenu={handleContextMenu}
      >
        <SideBar />
        <div className="canvasContainer">
          <GridCanvas />
        </div>
      </div>

    </SimulationContextProvider>
  );
}