import GridCanvas from "./components/GridCanvas";
import SideBar from "./components/SideBar";
import SimulationContextProvider from "./contexts/SimulationContext";
import Stats from "./components/Stats";

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
        <Stats />
        <div className="canvasContainer">
          <GridCanvas />
        </div>
      </div>

    </SimulationContextProvider>
  );
}