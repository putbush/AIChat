import Image from 'next/image';

export const Logo = (props: { className?: string; width: number; height: number }) => {
  const { width, height } = props;
  return (
    <Image src="/icons/logo.svg" alt="Logo" width={width} height={height} className={props.className} />
  );
};
