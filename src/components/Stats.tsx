import React, { useContext, useRef, useEffect } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';

const Stats: React.FC = () => {
    const context = useContext(SimulationContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawGraph = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        if (!context?.cellCountHistory?.length) return;

        ctx.clearRect(0, 0, width, height);

        const data = context.cellCountHistory;
        let minValue = Math.min(...data);
        let maxValue = Math.max(...data);
        let valueRange = maxValue - minValue;

        // Handle the case when all data points are the same
        if (valueRange === 0) {
            if (maxValue === 0) {
                // All values are zero
                maxValue = 1;
            } else {
                // All values are the same and greater than zero
                minValue = 0;
            }
            valueRange = maxValue - minValue;
        }

        const barWidth = width / data.length;

        // Draw background
        ctx.fillStyle = '#112B4A';
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines and labels
        const scaleStep = valueRange / 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 4; i++) {
            const y = height - (i * height / 4);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();

            const scaleValue = minValue + (scaleStep * i);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.font = '10px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(scaleValue.toFixed(0), 5, y - 5);
        }

        // Draw bars
        ctx.fillStyle = 'rgba(64, 169, 255, 0.5)';
        data.forEach((value, i) => {
            const normalizedHeight = (value - minValue) / (valueRange || 1);
            const barHeight = Math.max(1, normalizedHeight * (height - 30));
            ctx.fillRect(
                i * barWidth + 4,
                height - barHeight - 15,
                barWidth - 8,
                barHeight
            );
        });

        // Draw line graph
        ctx.strokeStyle = '#FF6464';
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.forEach((value, i) => {
            const normalizedHeight = (value - minValue) / (valueRange || 1);
            const x = i * barWidth + barWidth / 2;
            const y = height - (normalizedHeight * (height - 30)) - 15;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get canvas context');
            return;
        }

        // Set actual pixel dimensions
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        // Reset style dimensions
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        drawGraph(ctx, rect.width, rect.height);
    }, [context?.cellCountHistory]);

    return (
        <div className="stats">
            <h3>Population History</h3>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                    }}
                />
            </div>
            <p>Current cells: {context?.occupiedCells.size || 0}</p>
        </div>
    );
};

export default Stats;