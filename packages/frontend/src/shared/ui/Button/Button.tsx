import styles from './Button.module.scss';
import classNames from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'plain' | 'secondary' | 'primary' | 'danger' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconOnly?: boolean;
  gradient?: boolean;
}

const variantClassName: Record<ButtonVariant, string> = {
  plain: styles.variantPlain,
  secondary: styles.variantSecondary,
  primary: styles.variantPrimary,
  danger: styles.variantDanger,
  gradient: styles.variantGradient,
};

const sizeClassName: Record<ButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant = 'plain',
    size = 'md',
    fullWidth,
    iconOnly,
    gradient,
    type = 'button',
    ...rest
  } = props;

  const resolvedVariant = gradient ? 'gradient' : variant;
  const resolvedSize = iconOnly ? 'icon' : size;

  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        variantClassName[resolvedVariant],
        sizeClassName[resolvedSize],
        {
          [styles.fullWidth]: fullWidth,
          [styles.iconOnly]: iconOnly,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
