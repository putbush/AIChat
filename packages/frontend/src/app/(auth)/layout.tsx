import styles from './layout.module.scss';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <Image
        src="/images/laptop.png"
        alt="Image laptop"
        className={styles.image}
        width={625}
        height={860}
      />
      <div className={styles.loginContainer}>
        <Image src="logo.svg" alt="Logo" width={80} height={80} />
        <div className={styles.loginHeader}>
          <h3 className={styles.loginTitle}>Join AIChat</h3>
          <p className={styles.loginDescription}>
            Create an account or sign in to continue chatting with Aippy
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
