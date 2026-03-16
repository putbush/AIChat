import { SkeletonBox } from '@shared/ui/SkeletonBox';
import styles from './UserProfile.module.scss';

export const UserProfileSkeleton = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) {
    return (
      <div className={styles.profile} style={{ alignItems: 'center' }}>
        <SkeletonBox width={30} height={30} borderRadius="50%" />
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.userButton} style={{ flex: 1 }}>
          <SkeletonBox width={30} height={30} borderRadius="50%" />
          <div className={styles.info} style={{ flex: 1, width: '100%' }}>
            <SkeletonBox width="60%" height={15} borderRadius={4} />
            <SkeletonBox width="90%" height={12} borderRadius={4} />
          </div>
        </div>
        <SkeletonBox width={40} height={18} borderRadius={4} />
      </div>
    </div>
  );
};
