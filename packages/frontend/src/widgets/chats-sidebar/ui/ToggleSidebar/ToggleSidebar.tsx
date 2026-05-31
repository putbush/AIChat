import { Button } from '@shared/ui';
import Image from 'next/image';
import styles from './ToggleSidebar.module.scss';
import { ASSETS } from '@shared/constants/assets';

export const ToggleSidebar = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <Button
      className={styles.button}
      variant="secondary"
      iconOnly
      aria-label="Toggle sidebar"
      onClick={onClick}
    >
      <Image src={ASSETS.ICONS.TOGGLE_SIDEBAR} alt="Toggle sidebar" width={22} height={22} />
    </Button>
  );
};
