import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Field.module.scss';
import { InputHTMLAttributes, useCallback, useState } from 'react';
import { Button } from '../Button';
import Image from 'next/image';
import classNames from 'classnames';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ariaDescribedby?: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
}

export const Field = (props: FieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const typeIsPassword = props.type === 'password';
  const inputType = typeIsPassword && showPassword ? 'text' : props.type;

  const togglePasswordVisibility = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  const { label, placeholder, className, id, ariaDescribedby, error, register } = props;
  return (
    <div className={classNames(styles.formGroup, className)}>
      <div className={styles.inputWrap}>
        <label htmlFor={id} className="visually-hidden">
          {label}
        </label>
        <input
          type={inputType}
          id={id}
          className={classNames(styles.input, {
            [styles.isInvalid]: error,
          })}
          placeholder={placeholder}
          aria-describedby={ariaDescribedby}
          {...register}
        />
        {typeIsPassword && (
          <Button
            type="button"
            className={styles.eyeButton}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            onClick={togglePasswordVisibility}
          >
            <Image
              src={showPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'}
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
