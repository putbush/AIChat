import styles from './SkeletonBox.module.scss';
import classNames from 'classnames';

interface SkeletonBoxProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const SkeletonBox = ({ width, height, borderRadius, className }: SkeletonBoxProps) => {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
  };
  return <div className={classNames(styles.skeletonBox, className)} style={style} />;
};
