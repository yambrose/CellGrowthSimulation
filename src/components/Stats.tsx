import React, { useContext, useRef, useEffect, useMemo } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';
import NoDataSVG from '../assets/NoData.svg';

const Stats: React.FC = () => {
    const context = useContext(SimulationContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    if (!context) return null;

    // Memoize data calculations
    const { maxValue, minValue, valueRange } = useMemo(() => {
        const data = context.cellCountHistory;
        let min = Math.min(...data);
        let max = Math.max(...data);
        let range = max - min;

        if (range === 0) {
            if (max === 0) {
                max = 1;
            } else {
                min = 0;
            }
            range = max - min;
        }

        return { maxValue: max, minValue: min, valueRange: range };
    }, [context.cellCountHistory]);

    const drawGraph = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const data = context.cellCountHistory;
        const barWidth = width / data.length;

        // Clear and set background
        ctx.fillStyle = '#112B4A';
        ctx.fillRect(0, 0, width, height);

        // Draw grid and labels in single pass
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.lineWidth = 1;

        const scaleStep = valueRange / 4;
        for (let i = 0; i <= 4; i++) {
            const y = height - (i * height / 4);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            ctx.fillText((minValue + (scaleStep * i)).toFixed(0), 5, y - 5);
        }

        // Batch draw bars and line points
        const points: [number, number][] = [];
        ctx.fillStyle = 'rgba(64, 169, 255, 0.5)';
        
        data.forEach((value, i) => {
            const normalizedHeight = (value - minValue) / (valueRange || 1);
            const barHeight = Math.max(1, normalizedHeight * (height - 30));
            
            // Draw bar
            ctx.fillRect(
                i * barWidth + 4,
                height - barHeight - 15,
                barWidth - 8,
                barHeight
            );

            // Store line point
            points.push([
                i * barWidth + barWidth / 2,
                height - (normalizedHeight * (height - 30)) - 15
            ]);
        });

        // Draw line in single pass
        ctx.strokeStyle = '#FF6464';
        ctx.lineWidth = 2;
        ctx.beginPath();
        points.forEach(([x, y], i) => {
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set canvas dimensions once
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        drawGraph(ctx, rect.width, rect.height);
    }, [context.cellCountHistory]);

    const hasData = context.cellCountHistory.length > 0;

    return (
        <div className="stats">
            <h2>Population Stats (Last 20)</h2>
            {!hasData && (
                <div className='noData'>
                    <img src={NoDataSVG} alt="No data" />
                    <p>There's no data to show...</p>
                </div>
            )}
            <div style={{
                height: hasData ? '100%' : '0%',
                filter: hasData ? 'none' : 'blur(5px)'
            }}>
                <div className="graphContainer" style={{ position: 'relative', zIndex: 1 }}>
                    <canvas ref={canvasRef} />
                </div>
                <span>
                    <p>Max: {maxValue}</p>
                    <p>Min: {minValue}</p>
                    <p>Cell Count: {context.occupiedCells.size}</p>
                </span>
                <button onClick={context.clearHistoryData}>Clear Data</button>
            </div>
        </div>
    );
};

export default React.memo(Stats);