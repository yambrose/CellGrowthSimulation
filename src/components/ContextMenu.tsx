import Slider from "./Slider";
import { SimulationContext } from "../contexts/SimulationContext";
import { useContext } from "react";
import { Button } from "./Button";
import BurgerSVG from "../assets/Burger.svg";


const ContextMenu = () => {

    const context = useContext(SimulationContext);

    if (!context) return null;

    return (
        <div className="contextMenu">
            <img src={BurgerSVG} className="burgerIcon" onClick={context.openSideBar} />

            <Slider
                value={context.gridSize}
                label='Grid Size'
                min={context.gridSizeRange[0]}
                max={context.gridSizeRange[1]}
                step={1}
                onChange={context.updateGridSize}
            />
            <Slider
                value={context.cellSize}
                label='Zoom Level (Cell Size)'
                min={context.cellSizeRange[0]}
                max={context.cellSizeRange[1]}
                step={1}
                onChange={context.updateCellSize}
            />
            <span>
                <Button
                    onClick={context.handleReset}
                    classes='cButtonRed'
                    disabled={context.isPlaying}
                >
                    Reset
                </Button>
                {!context.isPlaying ?
                    <Button
                        onClick={context.togglePlaying}
                        classes='cButtonGreen'
                        disabled={context.occupiedCells.size === 0}
                    >
                        Start
                    </Button> :
                    <Button
                        onClick={context.togglePlaying}
                        classes='cButtonYellow'
                        disabled={context.occupiedCells.size === 0}
                    >
                        Pause
                    </Button>
                }
            </span>
        </div>
    );
};

export default ContextMenu;