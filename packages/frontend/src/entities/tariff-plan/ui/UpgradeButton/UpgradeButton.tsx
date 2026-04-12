import { Button } from "@shared/ui";
import styles from "./UpgradeButton.module.scss";
import classNames from 'classnames';

type ButtonUpgradeTextProps = {
  index: number;
  currentSubscriptionIndex: number;
  isActive?: boolean;
  planName: string;
  onClick: () => void;
};

export const UpgradeButton = ({
  index,
  currentSubscriptionIndex,
  isActive,
  planName,
  onClick,
}: ButtonUpgradeTextProps) => {
  if (index < currentSubscriptionIndex) {
    return;
  } else if (index === currentSubscriptionIndex) {
    return (
      <Button className={styles.current} disabled>
        You already have this plan
      </Button>
    );
  } else {
    return (
      <Button
        className={classNames(styles.upgrade, {
          [styles.upgrade_active]: isActive,
        })}
        onClick={onClick}
      >
        Get {planName.charAt(0).toUpperCase() + planName.slice(1)}
      </Button>
    );
  }
};
