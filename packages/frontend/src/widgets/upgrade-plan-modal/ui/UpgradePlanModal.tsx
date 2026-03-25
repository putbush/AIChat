'use client';

import { observer } from 'mobx-react';
import { createPortal } from 'react-dom';
import { upgradePlanModalStore } from '../model';
import styles from './UpgradePlanModal.module.scss';
import Image from 'next/image';
import { Button } from '@shared/ui';
import { useUser } from '@entities/user';
import { UpgradePlanList } from '@features/upgrade-plan/ui/UpgradePlanList';

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
      <Button className={styles.close} onClick={toggleModal}>
        <Image src="/cross.svg" alt="Close" width={24} height={24} />
      </Button>
    </div>,
    document.body,
  );
});
