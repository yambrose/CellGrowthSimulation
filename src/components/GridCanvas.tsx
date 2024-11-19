import { useState, useRef, useEffect, useContext } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';

const GridCanvas: React.FC = () => {
  const context = useContext(SimulationContext);

  if (!context) return null;

  const { gridSize, cellSize, occupiedCells } = context;
  const canvasSize = gridSize * cellSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Effect to redraw the canvas when the grid changes
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
    context.displayStats();
  }, [occupiedCells, canvasSize, cellSize]);

  // Effect to update the grid every updateInterval seconds
  useEffect(() => {
    if (!context.isPlaying) return;
  
    const intervalId = setInterval(() => {
      context.updateGrid();
    }, context.updateInterval * 1000); // Convert seconds to milliseconds
  
    return () => clearInterval(intervalId);
  }, [context.isPlaying, context.updateInterval]);

  // Effect to handle panning
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transform = `translate(${panOffset.x}px, ${panOffset.y}px)`;
    }
  }, [panOffset]);

  // Draw the grid
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();

    // Draw vertical lines
    for (let i = 0; i <= gridSize; i++) {
      const x = i * cellSize;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize);
    }

    // Draw horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      const y = i * cellSize;
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize, y);
    }

    ctx.stroke();
  };

  //Draw live cells
  const drawCells = (ctx: CanvasRenderingContext2D) => {
    if (occupiedCells.size === 0) return;

    ctx.fillStyle = "#08192D";
    ctx.beginPath();

    // Batch all cell rectangles into a single path
    for (const key of occupiedCells.entries()) {
      const [x, y] = key[0].split(",").map(Number);
      const cellX = x * cellSize;
      const cellY = y * cellSize;

      ctx.rect(cellX, cellY, cellSize, cellSize);
    }

    ctx.fill();

    // Draw cell borders
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  };

  // Handle the spawning of cells on click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {

    if (event.button !== 0) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = Math.floor((event.clientX - rect.left) * scaleX / cellSize);
      const y = Math.floor((event.clientY - rect.top) * scaleY / cellSize);

      const key = `${x},${y}`;
      context.updateOccupiedCells(key);
    }
  };

  // Mouse events
  const mouseHandlers = {
    onClick: handleCanvasClick,
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button === 2) {
        e.preventDefault();
        setIsPanning(true);
        setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      }
    },
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isPanning) {
        setPanOffset({
          x: e.clientX - startPan.x,
          y: e.clientY - startPan.y,
        });
      }
    },
    onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button === 2) setIsPanning(false);
    },
    onMouseLeave: () => setIsPanning(false)
  };

  return (
    <canvas
      ref={canvasRef}
      {...mouseHandlers}
      style={{ cursor: isPanning ? 'grabbing' : 'grab', position: 'absolute', top: 0, left: 0, backgroundColor: '#B6B6B6' }}
    />
  );
}

export default GridCanvas;