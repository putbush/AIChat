import { Button } from '@shared/ui';
import Image from 'next/image';
import styles from './ToggleSidebar.module.scss';

export const ToggleSidebar = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <Button className={styles.button} aria-label="Toggle sidebar" onClick={onClick}>
      <Image src="/icons/toggle-sidebar.svg" alt="Toggle sidebar" width={22} height={22} />
    </Button>
  );
};
