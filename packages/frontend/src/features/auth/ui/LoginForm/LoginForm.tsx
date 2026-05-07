'use client';

import { useForm } from 'react-hook-form';
import { useLogin } from '@features/auth/api/';
import styles from './LoginForm.module.scss';
import { Button } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field } from '@shared/ui/Field';
import { LoginCredentialsSchema, LoginDataDTO } from '@aichat/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import classNames from 'classnames';
import { LINK_PATHS } from '@shared/constants/routes';

export const LoginForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataDTO>({
    resolver: zodResolver(LoginCredentialsSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: LoginDataDTO) => {
    setError(null);
    mutate(data, {
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
      {error && <p className={styles.error}>{error}</p>}
      <Button
        className={classNames(
          styles.button,
          {
            [styles.isInvalid]: errors.email ?? errors.password,
          },
        )}
        type="submit"
        gradient
        disabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
      <span className={styles.line}></span>
      <Link href={LINK_PATHS.REGISTER} className={styles.link}>
        Don&apos;t have an account? Sign up
      </Link>
    </form>
  );
};
