'use client';

import { getImageUrl } from '@shared/lib/imageUrl';
import styles from './ProfileInfo.module.scss';
import { useUser } from '@entities/user';
import Image from 'next/image';
import { ASSETS } from '@shared/constants/assets';
import { useRef } from 'react';
import { useUpdateAvatar } from '@features/profile/api';
import { Button } from '@shared/ui';
import { useLogout } from '@features/auth/api';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

const formatSubscription = (subscription: string) => subscription.toUpperCase();

export const ProfileInfo = () => {
  const { data, error } = useUser();
  const { mutate, isPending } = useUpdateAvatar();
  const logout = useLogout();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    if (isPending) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    mutate(formData, {
      onSettled: () => {
        event.target.value = '';
      },
    });
  };

  if (error || !data) {
    return (
      <section className={styles.profileInfo}>
        <div className={styles.errorState}>Error loading profile information.</div>
      </section>
    );
  }

  const { name, email, subscription, avatarUrl, updatedAt } = data;
  const avatarSrc: string = avatarUrl ? getImageUrl(avatarUrl, updatedAt) : ASSETS.AVATARS.DEFAULT_USER;
  const profileItems = [
    { label: 'Display name', value: name },
    { label: 'Email', value: email },
    { label: 'Plan', value: formatSubscription(subscription) },
    { label: 'Last updated', value: formatDate(updatedAt) },
  ];

  return (
    <section className={styles.profileInfo}>
      <div className={styles.hero}>
        <div className={styles.avatarColumn}>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={handleAvatarClick}
            disabled={isPending}
            aria-label="Change avatar"
          >
            <Image
              src={avatarSrc}
              className={styles.avatar}
              alt="User Avatar"
              width={150}
              height={150}
              unoptimized
            />
            <span className={styles.avatarHint}>
              {isPending ? 'Uploading' : 'Change'}
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className={styles.fileInput}
            onChange={handleAvatarChange}
          />
        </div>

        <div className={styles.heading}>
          <span className={styles.eyebrow}>Profile</span>
          <h1>{name}</h1>
          <p>{email}</p>
          <span className={styles.planBadge}>{formatSubscription(subscription)}</span>
        </div>

        <Button type="button" className={styles.logoutButton} variant="danger" onClick={logout}>
          Logout
        </Button>
      </div>

      <div className={styles.detailsGrid}>
        {profileItems.map((item) => (
          <div className={styles.detailItem} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

    </section>
  );
};
