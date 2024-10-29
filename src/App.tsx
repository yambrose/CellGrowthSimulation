import { useState } from "react";
import GridCanvas from "./components/GridCanvas";

export default function App() {
  return (
    <GridCanvas gridSize={15} cellSize={25}/>
  );
}