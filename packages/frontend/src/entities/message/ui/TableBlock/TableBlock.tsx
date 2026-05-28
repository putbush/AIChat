import type { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';
import styles from './TableBlock.module.scss';

type TableBlockProps = ComponentPropsWithoutRef<'table'>;

export const TableBlock = (props: TableBlockProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={styles.tableWrap}>
      <table className={classNames(styles.table, className)} {...rest}>
        {children}
      </table>
    </div>
  );
};