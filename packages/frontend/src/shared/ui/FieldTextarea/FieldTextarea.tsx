import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './FieldTextarea.module.scss';
import { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

interface FieldTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

const resizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';

  const maxHeight = Number.parseFloat(getComputedStyle(textarea).maxHeight);
  const nextHeight = Math.min(textarea.scrollHeight, maxHeight);

  textarea.style.height = `${nextHeight}px`;
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
};

export const FieldTextarea = (props: FieldTextareaProps) => {
  const { id, label, className, error, register, ...rest } = props;
  return (
    <div className={classNames(styles.formGroup, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea
        rows={1}
        id={id}
        className={classNames(styles.input, {
          [styles.isInvalid]: error,
        })}
        {...register}
        {...rest}
        onInput={(event) => {
          resizeTextarea(event.currentTarget);
          rest.onInput?.(event);
        }}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};
