import Slider from './Slider';
import { useContext } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';
import { Button } from './Button';
import Stats from './Stats';

import TitleSVG from '../assets/Title.svg';

const SideBar: React.FC = () => {

    const context = useContext(SimulationContext);

    if (!context) {
        return null;
    }

    return (

        <aside className={`sideBar ${!context.sideBarOpen && 'closed'}`}>
            <img src={TitleSVG} />
            <Stats />
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
                label='Cell Size'
                min={context.cellSizeRange[0]}
                max={context.cellSizeRange[1]}
                step={1}
                onChange={context.updateCellSize}
            />
            <Slider
                value={context.bacFailRate}
                label='Fail Rate'
                min={context.bacFailRateRange[0]}
                max={context.bacFailRateRange[1]}
                step={0.1}
                onChange={context.updateBacFailRate}
            />
            <Slider
                value={context.bacLifespan}
                label='Lifespan'
                min={context.bacLifespanRange[0]}
                max={context.bacLifespanRange[1]}
                step={1}
                onChange={context.updateBacLifeSpan}
            />
            <Slider
                value={context.updateInterval}
                label='Update Interval'
                min={context.updateIntervalRange[0]}
                max={context.updateIntervalRange[1]}
                step={0.25}
                onChange={context.updateUpdateInterval}
            />

            <span>
                <Button
                    onClick={context.handleReset}
                    disabled={context.isPlaying}
                >
                    Reset
                </Button>
                <Button
                    onClick={context.togglePlaying}
                    disabled={context.occupiedCells.size === 0}
                >
                    {context.isPlaying ? 'Pause' : 'Start'}
                </Button>
            </span>

            <Button
                onClick={context.closeSideBar}
                disabled={false}
            >
                close bar
            </Button>
        </aside>
    );
};

export default SideBar;