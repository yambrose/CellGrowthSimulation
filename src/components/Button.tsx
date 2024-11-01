

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  classes?: string;
  icon?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({onClick, children, classes, icon, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`controlButton ${classes}`}>
      {icon && <img className='icon'>{icon}</img>}
      {children}
    </button>
  );
};
