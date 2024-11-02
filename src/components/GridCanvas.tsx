import { useState, useRef, useEffect, useContext } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';

const GridCanvas: React.FC = () => {
  const context = useContext(SimulationContext);

  if (!context) return <div>Loading...</div>

  const { gridSize, cellSize, occupiedCells } = context;
  const canvasSize = gridSize * cellSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const updateInterval = context.updateInterval * 1000; // Update every 1000 milliseconds

    const update = (timestamp: number) => {
      if (!context.isPlaying) return;
      
      if (timestamp - lastTime >= updateInterval) {
        context.updateGrid();
        lastTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    if (context.isPlaying) {
      animationFrameId = requestAnimationFrame(update);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context.isPlaying, context.updateInterval]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transform = `translate(${panOffset.x}px, ${panOffset.y}px)`;
    }
  }, [panOffset]);

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

  const drawCells = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#08192D";
    for (const key of occupiedCells.entries()) {
      const [x, y] = key[0].split(",").map(Number);
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

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

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.button === 2) {
      event.preventDefault();
      setIsPanning(true);
      setStartPan({ x: event.clientX - panOffset.x, y: event.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      setPanOffset({
        x: event.clientX - startPan.x,
        y: event.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.button === 2) {
      setIsPanning(false);
    }
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isPanning ? 'grabbing' : 'grab', position: 'absolute', top: 0, left: 0,  backgroundColor: '#B6B6B6' }}
    />
  );
}

export default GridCanvas;