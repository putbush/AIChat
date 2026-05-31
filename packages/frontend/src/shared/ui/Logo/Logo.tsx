import Image from 'next/image';
import { ASSETS } from '@shared/constants/assets';

export const Logo = (props: { className?: string; width: number; height: number }) => {
  const { width, height } = props;
  return (
    <Image src={ASSETS.ICONS.LOGO} alt="Logo" width={width} height={height} className={props.className} />
  );
};
