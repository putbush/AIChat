import styles from './SidebarFooter.module.scss';

export const SidebarFooter = () => {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/putbush/" target="_blank" rel="noopener noreferrer">How it works</a>
      <a href="https://github.com/putbush/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
    </div>
  );
};
