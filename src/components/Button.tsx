

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
  disabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({onClick, children, icon, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className="controlButton">
      {icon && <img className='icon'>{icon}</img>}
      {children}
    </button>
  );
};
