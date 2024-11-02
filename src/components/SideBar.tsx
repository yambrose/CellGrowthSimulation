import Slider from './Slider';
import ContextMenu from './ContextMenu';
import { useContext } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';
import { Button } from './Button';
import BurgerSVG from "../assets/Burger.svg";
import PlaySVG from "../assets/Play.svg";
import PauseSVG from "../assets/Pause.svg";
import ResetSVG from "../assets/Reset.svg";
import TitleSVG from '../assets/Title.svg';

const SideBar: React.FC = () => {

    const context = useContext(SimulationContext);

    if (!context) {
        return null;
    }

    return (
        <>
            {!context.sideBarOpen && <ContextMenu />}
            <aside className={`sideBar ${!context.sideBarOpen && 'closed'}`}>
                <img src={BurgerSVG} className="burgerIcon" onClick={context.closeSideBar} />
                <img src={TitleSVG} />
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
                <Slider
                    value={context.updateInterval}
                    label='Update Interval'
                    min={context.updateIntervalRange[0]}
                    max={context.updateIntervalRange[1]}
                    step={0.25}
                    onChange={context.updateUpdateInterval}
                />
                <Slider
                    value={context.bacFailRate}
                    label='Fail Rate'
                    min={context.bacFailRateRange[0]}
                    max={context.bacFailRateRange[1]}
                    step={0.1}
                    onChange={context.updateBacFailRate}
                    disabled={context.isPlaying}
                />
                <Slider
                    value={context.bacLifespan}
                    label='Lifespan'
                    min={context.bacLifespanRange[0]}
                    max={context.bacLifespanRange[1]}
                    step={1}
                    onChange={context.updateBacLifeSpan}
                    disabled={context.isPlaying}
                />

                <span>
                    <Button
                        onClick={context.handleReset}
                        classes='cButtonRed'
                        icon={ResetSVG}
                        disabled={context.isPlaying}
                    >
                        Reset
                    </Button>
                    {!context.isPlaying ?
                        <Button
                            onClick={context.togglePlaying}
                            classes='cButtonGreen'
                            icon={PlaySVG}
                            disabled={context.occupiedCells.size === 0}
                        >
                            Start
                        </Button> :
                        <Button
                            onClick={context.togglePlaying}
                            classes='cButtonYellow'
                            icon={PauseSVG}
                        >
                            Pause
                        </Button>
                    }
                </span>
            </aside>
        </>
    );
};

export default SideBar;