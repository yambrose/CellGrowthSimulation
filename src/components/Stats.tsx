import { useContext } from 'react';
import { SimulationContext } from '../contexts/SimulationContext';

const Stats:React.FC = () => {

    const context = useContext(SimulationContext);

    if (!context) return null;

    return (
        <div className='stats'>
            <h2>Stats</h2>
            <p>Number of cells: {context.occupiedCells.size}</p>
        </div>
    )
};

export default Stats;