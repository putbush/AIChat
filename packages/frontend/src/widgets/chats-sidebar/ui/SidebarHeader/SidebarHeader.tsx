import { Logo } from '@shared/ui';
import { ToggleSidebar } from '../ToggleSidebar';
import styles from './SidebarHeader.module.scss';

export const SidebarHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className={styles.header}>
      <Logo />
      <ToggleSidebar closed={false} onClick={toggleSidebar} />
    </div>
  );
};
