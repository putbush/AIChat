import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { children, className, type, disabled, 'aria-label': ariaLabel, 'aria-pressed': ariaPressed, onClick } = props;
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
