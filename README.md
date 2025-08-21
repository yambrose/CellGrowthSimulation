# Cell Growth Simulation

## Demo
You can try out this web-app at [`Cell Growth Simulation`](http://cells.ambrosey.dev)

## Overview
Heavily inspired by Conway's Game of Life but with a twist. Cell Growth Simulation is a webapp built with TypeScript React on Vite. It simulates cellular growth patterns on a grid-based canvas. Users can manipulate various parameters to observe different growth behaviors while monitoring population statistics in real-time.

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

## Assumptions
1. **Performance Constraints**:
   - Maximum grid size of 200x200 cells.
   - Update interval minimum of 250ms.
2. **Browser Support**:
   - Modern browsers with Canvas API support.

### Optimizations
- Utilizing HTML Canvas to render the grid to prevent high amounts of DOM elements on screen
- Cell state memoizing using React's hooks (useMemo, useCallback)
- Efficient cell lifecycle tracking using `Maps`

## How to Run

```bash
# Install dependencies
npm i

# Start development server
npm run dev
```
