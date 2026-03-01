import { Button } from '@shared/ui';
import Image from 'next/image';
import styles from './ToggleSidebar.module.scss';

export const ToggleSidebar = (props: { onClick: () => void; closed: boolean }) => {
  const { onClick, closed } = props;
  return (
    <Button className={`${styles.button} ${closed ? styles.closed : ''}`} ariaLabel="Toggle sidebar" onClick={onClick}>
      <Image src="/toggle-sidebar.svg" alt="Toggle sidebar" width={22} height={22} />
    </Button>
  );
};
