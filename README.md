# Cell Growth Simulation

## Demo
You can try out this web-app at [`Demo`](http://cells.ambrosey.dev)

## Overview
Cell Growth Simulation is an interactive web application built with React, TypeScript, and Vite. It simulates cellular growth patterns on a grid-based canvas. Users can manipulate various parameters to observe different growth behaviors while monitoring population statistics in real-time.

## Controls
- **Left Click**: Place or remove a cell on the grid.
- **Right Click + Drag**: Pan around the grid.

## Features
- **Interactive Grid Canvas**: Click to spawn/remove cells on a customizable grid.
- **Real-time Statistics**: Monitor population changes through a dynamic graph.
- **Adjustable Parameters**:
  - Grid Size: 10-200
  - Cell Size/Zoom Level: 10-100
  - Update Interval: 0.25-3 seconds
  - Cell Failure Rate: 0-1
  - Cell Lifespan: 1-10 cycles
- **Canvas Navigation**: Pan and zoom functionality.
- **Population History**: Visual graph showing cell count over time.
- **Responsive Controls**: Collapsible sidebar with parameter controls.

## Key Components
- **[`SimulationContext`](src/contexts/SimulationContext.tsx)**: Manages simulation state and logic.
- **[`GridCanvas`](src/components/GridCanvas.tsx)**: Handles cell rendering and user interactions.
- **[`Stats`](src/components/Stats.tsx)**: Population monitoring and graphing.
- **[`SideBar`](src/components/SideBar.tsx)**: Parameter adjustment interface.
- **[`ContextMenu`](src/components/ContextMenu.tsx)** Context menu for when SideBar is collapsed.

## Assumptions
1. **Performance Constraints**:
   - Maximum grid size of 200x200 cells.
   - Update interval minimum of 250ms.
2. **Browser Support**:
   - Modern browsers with Canvas API support.
   - Device Pixel Ratio awareness for HiDPI displays.
3. **User Interaction**:
   - Left click for cell placement.
   - Right click for canvas panning.

## Performance Analysis

### Grid Update Speed
- **Frame Rate**: Maintains 60 FPS for grids up to 100x100.
- **Update Interval**: Configurable 250ms-3000ms range.
- **Cell Processing**: $O(n)$ complexity where $n$ = active cells.

### Memory Usage
- **Cell Storage**: Uses Map data structure.
  - Memory: ~40 bytes per active cell.

### Optimizations
1. Canvas Rendering:
   - Batched drawing operations
   - Grid line optimization
   - Cell state caching
   - HiDPI scaling support

2. State Management:
   - Efficient cell lifecycle tracking
   - Batched state updates
   - Memoized calculations
   - Optimized data structures

### Benchmarks
- Grid size changes: <100ms
- Cell updates: <16ms per frame
- Memory footprint: <10MB for typical usage

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
