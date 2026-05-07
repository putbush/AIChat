import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  gradient?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, className, gradient, ...rest } = props;
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.gradient]: gradient,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
