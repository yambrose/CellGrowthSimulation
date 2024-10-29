import { useState, useRef, useEffect, useContext } from 'react';
import { SimulationContext } from '../../contexts/SimulationContext';

interface GridCanvasProps {
  gridSize: number;
  cellSize: number;
  occupiedCells: Set<string>;
}

const GridCanvas: React.FC<GridCanvasProps> = () => {
  const context = useContext(SimulationContext);

  const gridSize = context.gridSize;
  const cellSize = context.cellSize;
  const canvasSize = gridSize * cellSize;
  const [occupiedCells, setOccupiedCells] = useState<Set<string>>(context.occupiedCells);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Happens if canvas is on the not null
    if (canvas) {
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid(ctx);
        drawCells(ctx);
      }
    }
  }, [occupiedCells, canvasSize, cellSize]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#000";

    // Draw vertical lines
    for (let i = 0; i <= gridSize; i++) {
      const x = i * cellSize;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      const y = i * cellSize;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize, y);
      ctx.stroke();
    }
  };

  const drawCells = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000";
    occupiedCells.forEach((cell) => {
      const [x, y] = cell.split(",").map(Number);
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();

      const x = Math.floor((event.clientX - rect.left) / cellSize);
      const y = Math.floor((event.clientY - rect.top) / cellSize);

      const key = `${x},${y}`;

      //Update state of occupiedCells
      setOccupiedCells((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(key)) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
        return newSet;
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid #000' }}
      onClick={handleCanvasClick}
    />
  );
}

export default GridCanvas;