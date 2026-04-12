import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  gradient?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, className, type, disabled, 'aria-label': ariaLabel, 'aria-pressed': ariaPressed, onClick, gradient } = props;
  return (
    <button
      type={type}
      className={classNames(styles.button, className, {
        [styles.gradient]: gradient,
      })}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
