interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    label: string;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step, label }) => {

    return <div className="sliderBlock">
        <label>{label}</label>
        <span>
            <input type="range" min={min} max={max} step={step} defaultValue={value} onChange={(e) => onChange(Number(e.target.value))} />
            <label>{value}</label>
        </span>
    </div>
};

export default Slider;