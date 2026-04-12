import styles from './CardPlan.module.scss';
import { UpgradeButton } from '../UpgradeButton';
import classNames from 'classnames';

type CardPlanProps = {
  cost: string;
  planName: string;
  subTitle: string;
  features: string[];
  index: number;
  currentSubscriptionIndex: number;
  isActive?: boolean;
  onClick: () => void;
};

export const CardPlan = (props: CardPlanProps) => {
  const { cost, planName, subTitle, features, index, currentSubscriptionIndex, isActive, onClick } =
    props;

  return (
    <div
      className={classNames(styles.card, {
        [styles.card_active]: isActive,
      })}
    >
      <div className={styles.header}>
        <p className={styles.cost}>${cost}</p>
        <span
          className={classNames(styles.planBadge, {
            [styles.planBadge_active]: isActive,
          })}
        >
          {planName.toUpperCase()} PLAN
        </span>
      </div>
      <p className={styles.subTitle}>{subTitle}</p>

      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            {feature}
          </li>
        ))}
      </ul>

      <UpgradeButton
        index={index}
        currentSubscriptionIndex={currentSubscriptionIndex}
        isActive={isActive}
        planName={planName}
        onClick={onClick}
      />
    </div>
  );
};
