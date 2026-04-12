import { Logo } from '@shared/ui';
import { ToggleSidebar } from '../ToggleSidebar';
import styles from './SidebarHeader.module.scss';
import Link from 'next/link';
import type { SidebarVariant } from '@shared/lib/sidebar/sidebarVariant';

type SidebarHeaderProps = {
  variant: SidebarVariant;
  toggleSidebar: () => void;
};

export const SidebarHeader = (props: SidebarHeaderProps) => {
  const { variant, toggleSidebar } = props;
  const isExpanded = variant === 'expanded';

  return (
    <div className={styles.header}>
      {isExpanded && (
        <Link className={styles.logo} href="/">
          <Logo width={33} height={38} />
          <h1 className={styles.title}>AI Chat</h1>
        </Link>
      )}
      <ToggleSidebar onClick={toggleSidebar} />
    </div>
  );
};
