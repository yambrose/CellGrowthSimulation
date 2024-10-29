import { useState, createContext } from 'react';

interface SimulationContextType {
    gridSize: number;
    cellSize: number;
    occupiedCells: Set<string>;
    isPlaying: boolean;
    bacFailRate: number;
    bacFailRateRange: [number, number];
    bacLifespan: number;
    bacLifespanRange: [number, number];

    handlePlaying: () => void;
    handleReset: () => void;
    updateBacFailRate: (rate: number) => void;
    updateBacLifeSpan: (rate: number) => void;
    updateCellSize: (size: number) => void;
    updateGridSize: (size: number) => void;
}

interface SimulationProviderProps {
    children: React.ReactNode;
}

export const SimulationContext = createContext<SimulationContextType>(
    {
        gridSize: 10,
        cellSize: 10,
        occupiedCells: new Set(),
        isPlaying: false,
        bacFailRate: 0.1,
        bacFailRateRange: [0.1, 0.9],
        bacLifespan: 100,
        bacLifespanRange: [1, 100],
        handlePlaying: () => { },
        handleReset: () => { },
        updateBacFailRate: (rate: number) => { },
        updateBacLifeSpan: (rate: number) => { },
        updateCellSize: (size: number) => { },
        updateGridSize: (size: number) => { }
    }
);

const SimulationContextProvider: React.FC<SimulationProviderProps> = ({ children }) => {
    const [gridSize, setGridSize] = useState<number>(10);
    const [cellSize, setCellSize] = useState<number>(10);
    const [occupiedCells, setOccupiedCells] = useState<Set<string>>(new Set());
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [bacFailRate, setBacFailRate] = useState<number>(0.1);
    const [bacFailRateRange, setBacFailRateRange] = useState<[number, number]>([0.1, 0.9]);
    const [bacLifespan, setBacLifespan] = useState<number>(100);
    const [bacLifespanRange, setBacLifespanRange] = useState<[number, number]>([1, 100]);

    const updateGridSize = (newSize:number) => {
        if (newSize > 0) {
            setGridSize(newSize);
        }
    } 

    const updateCellSize = (newSize:number) => {
        if (newSize > 0) {
            setCellSize(newSize);
        }
    }
    
    const handlePlaying = () => {
        setIsPlaying(prev => !prev);
    };

    const handleReset = () => {
        setOccupiedCells(new Set<string>());
        setIsPlaying(false);
    };

    const updateBacFailRate = (newRate: number) => {
        if (newRate < bacFailRateRange[0] && newRate > bacFailRateRange[1]) {
            setBacFailRate(newRate);
        }
    };

    const updateBacLifeSpan = (newRate: number) => {
        if (newRate < bacLifespanRange[0] && newRate > bacLifespanRange[1]) {
            setBacLifespan(newRate);
        }
    };

    return (
        <SimulationContext.Provider value={{
            gridSize,
            cellSize,
            occupiedCells,
            isPlaying,
            bacFailRate,
            bacFailRateRange,
            bacLifespan,
            bacLifespanRange,
            handlePlaying,
            handleReset,
            updateBacFailRate,
            updateBacLifeSpan,
            updateCellSize,
            updateGridSize
        }}>
            {children}
        </SimulationContext.Provider>
    );
};

export default SimulationContextProvider;
