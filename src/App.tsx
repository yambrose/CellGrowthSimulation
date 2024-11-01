import { useState } from "react";
import GridCanvas from "./components/GridCanvas";
import SideBar from "./components/SideBar";
import SimulationContextProvider from "./contexts/SimulationContext";

export default function App() {

  return (
    <SimulationContextProvider>
      <div className="pageContent">
        <SideBar />
        <div className="canvasContainer">
          <GridCanvas />
        </div>
      </div>

    </SimulationContextProvider>
  );
}