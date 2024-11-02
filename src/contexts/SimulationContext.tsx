import { useState, createContext } from 'react';

interface SimulationContextType {
    gridSize: number;
    gridSizeRange: [number, number];
    cellSize: number;
    cellSizeRange: [number, number];
    updateInterval: number;
    occupiedCells: Map<string, number>;
    isPlaying: boolean;
    bacFailRate: number;
    bacFailRateRange: [number, number];
    bacLifespan: number;
    bacLifespanRange: [number, number];
    updateIntervalRange: [number, number];
    sideBarOpen: boolean;
    cellCountHistory: number[];

    togglePlaying: () => void;
    handleReset: () => void;
    updateBacFailRate: (rate: number) => void;
    updateBacLifeSpan: (rate: number) => void;
    updateCellSize: (size: number) => void;
    updateGridSize: (size: number) => void;
    updateOccupiedCells: (cellId: string) => void;
    updateUpdateInterval: (interval: number) => void;
    updateGrid: () => void;
    displayStats: () => void;
    openSideBar: () => void;
    closeSideBar: () => void;
    addCellCountToHistory: (count: number) => void;
    clearHistoryData: () => void;
}

interface SimulationProviderProps {
    children: React.ReactNode;
}

export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);


const SimulationContextProvider: React.FC<SimulationProviderProps> = ({ children }) => {
    const [gridSize, setGridSize] = useState<number>(50);
    const [cellSize, setCellSize] = useState<number>(40);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [bacFailRate, setBacFailRate] = useState<number>(0.5);
    const [bacLifespan, setBacLifespan] = useState<number>(3);
    const [updateInterval, setUpdateInterval] = useState<number>(1);
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
    const [cellCountHistory, setCellCountHistory] = useState<number[]>([]);

    const gridSizeRange: [number, number] = [10, 200];
    const cellSizeRange: [number, number] = [10, 100];
    const bacFailRateRange: [number, number] = [0, 1];
    const bacLifespanRange: [number, number] = [1, 10];
    const updateIntervalRange: [number, number] = [0.25, 3];

    const [occupiedCells, setOccupiedCells] = useState<Map<string, number>>(new Map());

    const updateGridSize = (newSize: number) => {
        if (newSize >= gridSizeRange[0] && newSize <= gridSizeRange[1]) {
            setGridSize(newSize);
        }
        //remove all cells that are out of bounds
        setOccupiedCells((prev) => {
            const newOccupiedCells = new Map(prev);
            prev.forEach((_, bacteria) => {
                if (!keyInGrid(bacteria)) {
                    newOccupiedCells.delete(bacteria);
                }
            });
            return newOccupiedCells;
        });
    };

    const updateCellSize = (newSize: number) => {
        if (newSize >= cellSizeRange[0] && newSize <= cellSizeRange[1]) {
            setCellSize(newSize);
        }
    };

    const togglePlaying = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleReset = () => {
        setOccupiedCells(new Map());
        setIsPlaying(false);
    };

    const clearHistoryData = () => {
        setCellCountHistory([]);
    };

    const updateBacFailRate = (newRate: number) => {
        if (newRate >= bacFailRateRange[0] && newRate <= bacFailRateRange[1]) {
            setBacFailRate(newRate);
        }
    };

    const updateBacLifeSpan = (newRate: number) => {
        if (newRate >= bacLifespanRange[0] && newRate <= bacLifespanRange[1]) {
            setBacLifespan(newRate);
        }
    };

    const updateUpdateInterval = (newInterval: number) => {
        if (newInterval >= updateIntervalRange[0] && newInterval <= updateIntervalRange[1]) {
            setUpdateInterval(newInterval);
        }
    };

    const displayStats = () => {
        // console.log('gridSize:', gridSize);
        // console.log('cellSize:', cellSize);
        console.log('occupiedCells:', occupiedCells);
        console.log('isPlaying:', isPlaying);
        // console.log('bacFailRate:', bacFailRate);
        // console.log('bacLifespan:', bacLifespan);
        // console.log(cellCountHistory);
    }

    const keyInGrid = (key: string) => {
        const [x, y] = key.split(',').map(Number);
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
    }

    const updateOccupiedCells = (cellId: string) => {

        setOccupiedCells((prev) => {
            const newOccupiedCells = new Map(prev);

            if (prev.has(cellId)) {
                newOccupiedCells.delete(cellId);
            } else {
                newOccupiedCells.set(cellId, bacLifespan);
            }

            return newOccupiedCells
        });

    };


    const addCellCountToHistory = (count: number) => {
        setCellCountHistory(prev => [...prev.slice(-19), count].slice(-20));
    };

    const closeSideBar = () => {
        setSideBarOpen(false);
    };

    const openSideBar = () => {
        setSideBarOpen(true);
    };

    const updateGrid = () => {

        if (occupiedCells.size === 0) {
            setIsPlaying(false);
            return;
        }

        setOccupiedCells((prev) => {
            const newOccupiedCells = new Map(prev);

            prev.forEach((lifetime, bacteria) => {
                if (Math.random() > bacFailRate) {
                    const [x, y] = bacteria.split(',').map(Number);
                    const adjacentCells: string[] = [
                        `${x - 1},${y}`,
                        `${x + 1},${y}`,
                        `${x},${y - 1}`,
                        `${x},${y + 1}`
                    ];

                    for (const adj of adjacentCells) {
                        if (keyInGrid(adj) && !newOccupiedCells.has(adj)) {
                            newOccupiedCells.set(adj, bacLifespan);
                            break; // only want to create at most 1 adjacent cell per cycle
                        }
                    }
                }
                lifetime--;
                console.log(`lifetime: ${lifetime}`);

                if (lifetime <= 0) {
                    newOccupiedCells.delete(bacteria);
                } else {
                    newOccupiedCells.set(bacteria, lifetime);
                }
            });

            if (newOccupiedCells.size === 0) {
                handleReset();
            }
            addCellCountToHistory(newOccupiedCells.size);
            return newOccupiedCells;
        });
    };


    return (
        <SimulationContext.Provider
            value={{
                gridSize,
                gridSizeRange,
                cellSize,
                cellSizeRange,
                occupiedCells,
                isPlaying,
                bacFailRate,
                bacFailRateRange,
                bacLifespan,
                bacLifespanRange,
                updateInterval,
                updateIntervalRange,
                sideBarOpen,
                cellCountHistory,
                togglePlaying,
                handleReset,
                updateBacFailRate,
                updateBacLifeSpan,
                updateCellSize,
                updateGridSize,
                updateOccupiedCells,
                updateUpdateInterval,
                updateGrid,
                displayStats,
                openSideBar,
                closeSideBar,
                addCellCountToHistory,
                clearHistoryData
            }}
        >
            {children}
        </SimulationContext.Provider>
    );
};

export default SimulationContextProvider;
