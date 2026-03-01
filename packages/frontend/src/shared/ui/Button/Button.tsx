import styles from './Button.module.scss';

export const Button = (props: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}) => {
  const { children, className, ariaLabel, onClick } = props;
  return (
    <button className={`${styles.button} ${className}`} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
};
