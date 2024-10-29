import Slider from '../Slider/Slider';
import styles from './SideBar.module.css';
import { useState, useContext } from 'react';
import { SimulationContext } from '../../contexts/SimulationContext';

const SideBar: React.FC = () => {

    const { bacFailRate, bacLifespan, updateBacFailRate, updateBacLifeSpan, updateGridSize } = useContext(SimulationContext);

    return (
        <aside>
            <h2>SideBar</h2>
            <Slider value={10} label='TEST' min={0} max={10} step={1} onChange={updateGridSize} />
        </aside>
    );
};

export default SideBar;