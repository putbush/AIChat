'use client';

import { useForm } from 'react-hook-form';
import { useRegister } from '@features/auth/api/';
import styles from './RegisterForm.module.scss';
import { Button } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field } from '@shared/ui/Field';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, type RegistrationDTO } from '@features/auth/model';

export const RegisterForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationDTO>({
    resolver: zodResolver(RegistrationSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: RegistrationDTO) => {
    const { confirmPassword: _, ...dto } = data;
    
    setError(null);
    mutate(dto, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <Field
        label="Name"
        placeholder="Enter your name"
        type="text"
        id="name"
        ariaDescribedby={error ? 'login-error' : undefined}
        error={errors.name}
        register={register('name')}
      />
      <Field
        label="Email"
        placeholder="Enter your email address"
        type="email"
        id="email"
        ariaDescribedby={error ? 'login-error' : undefined}
        error={errors.email}
        register={register('email')}
      />
      <Field
        label="Password"
        placeholder="Password"
        type="password"
        id="password"
        ariaDescribedby={error ? 'login-error' : undefined}
        error={errors.password}
        register={register('password')}
      />
      <Field
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        id="confirmPassword"
        ariaDescribedby={error ? 'login-error' : undefined}
        error={errors.confirmPassword}
        register={register('confirmPassword')}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        className={`${styles.button} ${(errors.name ?? errors.email ?? errors.password ?? errors.confirmPassword) ? styles.isInvalid : ''}`}
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};
