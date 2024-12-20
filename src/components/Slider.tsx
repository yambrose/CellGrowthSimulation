import { useState, useRef } from "react";

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    label: string;
    disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step, label, disabled }) => {

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const turnOnEditing = () => {
        setIsEditing(true);
    }

    const turnOffEditing = () => {
        if (!inputRef.current) return;
        const newValue = Number(inputRef.current.value);

        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
        setIsEditing(false);
    };

    return <div className="sliderBlock">
        <label className="inputLabel">{label}</label>
        <input type="range" min={min} max={max} step={step} value={value} disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))} />
        {!isEditing ?
            <label onClick={turnOnEditing} className="inputLabel"
                style={{ cursor: 'pointer' }}>{value}</label> :
            <span>
                <input ref={inputRef} type="number" defaultValue={value} />
                <button onClick={turnOffEditing}>OK</button>
            </span>
        }
    </div>
};

export default Slider;