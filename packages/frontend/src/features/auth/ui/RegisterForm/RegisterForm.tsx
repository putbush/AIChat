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
import Link from 'next/link';
import classNames from 'classnames';
import { LINK_PATHS } from '@shared/constants/routes';

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
    const dto = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    setError(null);
    mutate(dto, {
      onSuccess: () => {
        router.push(LINK_PATHS.HOME);
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
        aria-describedby={error ? 'login-error' : undefined}
        error={errors.name}
        register={register('name')}
      />
      <Field
        label="Email"
        placeholder="Enter your email address"
        type="email"
        id="email"
        aria-describedby={error ? 'login-error' : undefined}
        error={errors.email}
        register={register('email')}
      />
      <Field
        label="Password"
        placeholder="Password"
        type="password"
        id="password"
        aria-describedby={error ? 'login-error' : undefined}
        error={errors.password}
        register={register('password')}
      />
      <Field
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        id="confirmPassword"
        aria-describedby={error ? 'login-error' : undefined}
        error={errors.confirmPassword}
        register={register('confirmPassword')}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        className={classNames(
          styles.button,
          {
            [styles.isInvalid]:
              errors.name ?? errors.email ?? errors.password ?? errors.confirmPassword,
          },
        )}
        type="submit"
        variant="gradient"
        size="lg"
        fullWidth
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'Register'}
      </Button>
      <span className={styles.line}></span>
      <Link href={LINK_PATHS.LOGIN} className={styles.link}>
        Already have an account? Log in
      </Link>
    </form>
  );
};
