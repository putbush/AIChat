import { SkeletonBox } from '@shared/ui/SkeletonBox';
import styles from './ChatsHistory.module.scss';

export const ChatsHistorySkeleton = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <ul className={styles.list}>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className={styles.item}>
          {isOpen ? (
            <SkeletonBox borderRadius={12} className={styles.sceleton} />
          ) : (
            <SkeletonBox height={18} borderRadius="50%" className={styles.sceleton} />
          )}
        </li>
      ))}
    </ul>
  );
};
