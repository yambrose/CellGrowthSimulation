# Cell Growth Simulation

## Overview
Cell Growth Simulation is an interactive web application built with React, TypeScript, and Vite. It allows users to simulate and visualize the growth of cells on a grid-based canvas. Users can control various simulation parameters, such as grid size, cell size, update intervals, and cell lifespan, to observe different growth patterns and behaviors.

## Features
- **Interactive Grid Canvas**: Visualize cell growth on a customizable grid. Users can click to spawn or remove cells.
- **Real-Time Simulation Control**: Start, pause, and reset the simulation with ease.
- **Adjustable Parameters**:
  - **Grid Size**: Modify the number of cells horizontally and vertically.
  - **Cell Size (Zoom Level)**: Change the size of each cell for better visibility.
  - **Update Interval**: Control how frequently the grid updates.
  - **Failure Rate**: Adjust the probability of cell replication failure.
  - **Cell Lifespan**: Set how long a cell remains active before it dies.
- **Responsive Sidebar**: Access simulation controls and statistics through a collapsible sidebar.
- **Performance Optimization**: Efficient rendering of large grids with optimized drawing techniques.
- **Context Menu**: Right-click to access additional options and navigate the canvas.
```
cell-growth-simulation/
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── public/
├── README.md
├── src/
│   ├── App.tsx
│   ├── assets/
│   │   ├── Play.svg
│   │   ├── Pause.svg
│   │   ├── Reset.svg
│   │   ├── Burger.svg
│   │   └── Title.svg
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── ContextMenu.tsx
│   │   ├── GridCanvas.tsx
│   │   ├── SideBar.tsx
│   │   ├── Slider.tsx
│   │   └── Stats.tsx
│   ├── contexts/
│   │   └── SimulationContext.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## Project Structure
### Key Components
- `src/App.tsx`: The root component that sets up the simulation context and renders the main layout, including the sidebar and grid canvas.

#### components:
- `GridCanvas.tsx`: Handles the rendering of the grid and cells on a `<canvas>` element. Manages panning, zooming, and cell interactions.
- `SideBar.tsx`: Contains sliders and controls for adjusting simulation parameters. It also displays simulation statistics.
- `Slider.tsx`: A reusable slider component with an editable number input for precise value adjustments.
- `ContextMenu.tsx`: Provides a custom context menu for additional actions and options within the simulation.
- `Button.tsx`: A styled button component used across the application.
- `Stats.tsx`: Displays real-time statistics about the simulation, such as the number of active cells.
  
`src/contexts/SimulationContext.tsx`: Manages the global state of the simulation, including grid size, cell properties, and simulation controls. Provides functions to update and manipulate the simulation state.

`src/index.css`: Contains global styles and CSS variables used throughout the application for consistent theming and styling.

`assets`: Holds all asset files, including SVG icons used in the UI.

## Assumptions
During the development of the Cell Growth Simulation, the following assumptions were made:
- **Grid Limitations**: The grid size is assumed to be within a reasonable range (10 to 200 cells) to ensure performance and usability.
- **Cell Interaction**: Users interact with cells primarily through left-clicking to spawn/remove cells and right-clicking to pan the canvas.
- **Browser Compatibility**: The application is optimized for modern browsers that fully support HTML5 Canvas and ES6 features.
- **Resource Constraints**: It's assumed that users have sufficient system resources to handle the canvas rendering, especially for larger grid sizes.
- **User Experience**: The sidebar controls are designed to be intuitive, allowing users to adjust simulation parameters without requiring extensive instructions.

## Performance Analysis
Ensuring smooth and responsive interactions within the simulation was a key priority. The following optimizations and performance metrics were implemented and measured:

### Optimization Strategies
- **Path Batching**: All grid lines are batched into a single path before stroking, reducing the number of draw calls.
- **Viewport Culling**: Only grid lines within the visible viewport are rendered, minimizing unnecessary drawing operations.
- **Resolution-Based Grid Density**: Adjusts the density of grid lines based on the current zoom level to maintain clarity and performance.
- **Grid Caching**: Implements a caching mechanism where the grid is drawn once on a hidden canvas and then reused, avoiding repeated rendering of static grid lines.
- **Efficient State Management**: Utilizes React's `useContext` and `useState` hooks efficiently to manage and update simulation state without causing excessive re-renders.

### Performance Metrics
- **Grid Update Speed**:
  - Average Frame Rate: Maintains an average of 60 FPS during active simulations with grid sizes up to 100x100 cells.
  - Update Interval: Configurable between 250ms to 3000ms, allowing for flexible simulation speeds without compromising performance.

- **Memory Usage**:
  - Occupied Cells: Efficiently manages occupied cells using a Map data structure, ensuring quick lookups and updates. Memory usage remains stable even with a high number of active cells (e.g., 10,000 cells).
  - Canvas Rendering: Utilizes off-screen canvases for grid caching, reducing memory overhead by reusing grid images instead of redrawing every frame.

- **User Interaction**:
  - Panning and Zooming: Smooth panning and zooming interactions with minimal latency, even on larger grids.
  - Responsive Controls: Slider adjustments and button interactions respond instantly, providing real-time feedback to user inputs.

- **Load Times**:
  - Initial Load: The application initializes and renders within 1-2 seconds on standard devices, leveraging Vite's fast bundling and HMR capabilities.
  - Dynamic Adjustments: Changing simulation parameters like grid size or cell size results in immediate updates without significant delays.

### Profiling and Testing
- **Browser Profiling**: Utilized Chrome DevTools to monitor rendering performance, ensuring that CPU and memory usage remain optimal during simulations.
- **Stress Testing**: Tested the application with maximum grid sizes (200x200) to identify and mitigate potential performance bottlenecks.
- **User Feedback**: Incorporated feedback from initial users to fine-tune performance optimizations and enhance the overall user experience.

## Getting Started
### Installation
1. Clone the Repository
2. Install Dependencies
3. Run the Development Server
4. Open in Browser

Navigate to `http://localhost:5173` to view the application.

### Building for Production
The optimized production build will be available in the `dist/` directory.

### Linting

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.

Developed by Ambrose Yip © 2024
