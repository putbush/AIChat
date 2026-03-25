import { Button } from '@shared/ui';
import styles from './CardPlan.module.scss';

type CardPlanProps = {
  cost: string;
  planName: string;
  subTitle: string;
  features: string[];
  alreadyHave: boolean;
  isActive?: boolean;
  onClick: () => void;
};

export const CardPlan = (props: CardPlanProps) => {
  const { cost, planName, subTitle, features, alreadyHave, isActive, onClick } = props;
  return (
    <div className={`${styles.card} ${isActive ? styles.card_active : ''}`}>
      <div className={styles.header}>
        <p className={styles.cost}>${cost}</p>
        <span className={`${styles.planBadge} ${isActive ? styles.planBadge_active : ''}`}>
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

      {alreadyHave ? (
        <Button className={styles.current} disabled>
          You already have this plan
        </Button>
      ) : (
        <Button className={`${styles.upgrade} ${isActive ? styles.upgrade_active : ''}`} onClick={onClick}>
          Get {planName.charAt(0).toUpperCase() + planName.slice(1)}
        </Button>
      )}
    </div>
  );
};
