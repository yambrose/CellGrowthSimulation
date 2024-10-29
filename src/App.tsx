import { useState } from "react";
import GridCanvas from "./components/GridCanvas/GridCanvas";
import SideBar from "./components/SideBar/SideBar";
import SimulationContextProvider from "./contexts/SimulationContext";

export default function App() {
  
  return (
    <SimulationContextProvider>
      <SideBar />
      <GridCanvas gridSize={50} cellSize={10} occupiedCells={new Set<string>} />
    </SimulationContextProvider>
  );
}