'use client';

import { observer } from 'mobx-react';
import { createPortal } from 'react-dom';
import { upgradePlanModalStore } from '../model';
import styles from './UpgradePlanModal.module.scss';
import Image from 'next/image';
import { Button } from '@shared/ui';
import { useUser } from '@entities/user';
import { UpgradePlanList } from '@features/upgrade-plan/ui/UpgradePlanList';
import { ASSETS } from '@shared/constants/assets';

export const UpgradePlanModal = observer(() => {
  const { isOpen, plans, toggleModal } = upgradePlanModalStore;
  const { data } = useUser();

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.title}>Upgrade your plan</div>
        <UpgradePlanList plans={plans} userData={data} toggleModal={toggleModal} />
      </div>
      <Button className={styles.close} iconOnly aria-label="Close modal" onClick={toggleModal}>
        <Image src={ASSETS.ICONS.CLOSE} alt="Close" width={24} height={24} />
      </Button>
    </div>,
    document.body,
  );
});
