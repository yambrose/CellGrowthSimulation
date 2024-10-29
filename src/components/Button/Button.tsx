import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  color: string;
  text: string;
  icon?: string;
  disabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({onClick, color, text, icon, disabled }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}
      style={{ 'color': color }}>
      {icon && <img className={styles.icon}>{icon}</img>}
      {text}
    </button>
  );
};
