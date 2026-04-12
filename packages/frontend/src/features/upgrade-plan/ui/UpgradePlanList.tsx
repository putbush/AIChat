'use client';

import { CardPlan } from '@entities/tariff-plan';
import styles from './UpgradePlanList.module.scss';
import { useChangeSubscription } from '../api';
import type { SubscriptionType, User } from '@aichat/shared';

type UpgradePlanListProps = {
  plans: {
    name: SubscriptionType;
    cost: string;
    subTitle: string;
    features: string[];
  }[];
  userData: User | undefined;
  toggleModal: () => void;
};

export const UpgradePlanList = (props: UpgradePlanListProps) => {
  const { plans, userData, toggleModal } = props;

  const currentPlan = userData?.subscription ?? plans[0]?.name;
  const currentPlanIndex = plans.findIndex((p) => p.name === currentPlan);

  const { mutate } = useChangeSubscription();

  const handleChangeSubscription = (subscription: SubscriptionType) => {
    mutate({ subscription }, {
      onSuccess: () => {
        toggleModal();
      },
    });
  };

  return (
    <div className={styles.plans}>
      {plans.map((plan, index) => {

        return (
          <CardPlan
            key={plan.name}
            planName={plan.name}
            cost={plan.cost}
            subTitle={plan.subTitle}
            features={plan.features}
            index = {index}
            currentSubscriptionIndex={currentPlanIndex}
            isActive={index === 1}
            onClick={() => handleChangeSubscription(plan.name)}
          />
        );
      })}
    </div>
  );
};
