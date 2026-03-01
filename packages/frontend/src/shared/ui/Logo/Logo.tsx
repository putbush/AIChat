import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link className={styles.logo} href="/">
      <Image src="/logo.svg" alt="Logo" width={33} height={38} />
      <h6 className={styles.title}>AI Chat</h6>
    </Link>
  );
};
