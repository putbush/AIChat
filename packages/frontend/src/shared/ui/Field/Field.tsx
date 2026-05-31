import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Field.module.scss';
import { InputHTMLAttributes, useCallback, useState } from 'react';
import { Button } from '../Button';
import Image from 'next/image';
import classNames from 'classnames';
import { ASSETS } from '@shared/constants/assets';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export const Field = (props: FieldProps) => {
  const { id, label, className, error, register, type, ...rest } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const typeIsPassword = props.type === 'password';
  const inputType = typeIsPassword && showPassword ? 'text' : type;

  const togglePasswordVisibility = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword],
  );

  return (
    <div className={classNames(styles.formGroup, className)}>
      <div className={styles.inputWrap}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          type={inputType}
          id={id}
          className={classNames(styles.input, {
            [styles.isInvalid]: error,
          })}
          {...register}
          {...rest}
        />
        {typeIsPassword && (
          <Button
            type="button"
            className={styles.eyeButton}
            iconOnly
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            onClick={togglePasswordVisibility}
          >
            <Image
              src={showPassword ? ASSETS.ICONS.EYE : ASSETS.ICONS.EYE_OFF}
              alt="Toggle Password Visibility"
              width={20}
              height={20}
            />
          </Button>
        )}
      </div>
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};
