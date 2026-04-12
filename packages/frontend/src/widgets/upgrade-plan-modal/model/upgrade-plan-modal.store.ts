import { SubscriptionType } from '@aichat/shared';
import { makeAutoObservable } from 'mobx';

type Plan = {
  cost: string;
  name: SubscriptionType;
  subTitle: string;
  features: string[];
};

class UpgradePlanModalStore {
  isOpen: boolean = false;
  plans: Plan[] = [
    {
      cost: '0',
      name: 'free',
      subTitle: 'Explore how AIChat can assist you with essential tasks.',
      features: [
        'Access to basic AI chat features',
        'Standard voice chats for quick communication',
        'Limited access to advanced tools like file uploads, data analysis, and image generation',
        'Ability to use custom AI models',
      ],
    },
    {
      cost: '19.9',
      name: 'plus',
      subTitle: 'Boost your productivity and creativity with expanded features.',
      features: [
        'Everything in Free',
        'Increased limits on messaging, file uploads, and AI-powered tools',
        'Access to enhanced voice and video inputs',
        'Early access to new features',
        'Create and use custom AI solutions for tailored experiences',
        'Limited video generation capabilities',
      ],
    },
    {
      cost: '199.9',
      name: 'pro',
      subTitle: 'Unlock the full potential of AIChat with our most powerful plan.',
      features: [
        'Everything in Plus',
        'Unlimited access to advanced AI models and premium features',
        'Higher thresholds for video and screen-sharing functionalities',
        'Access to Pro Mode, delivering superior compute power for complex tasks',
        'Extended video generation tools for creative professionals',
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  toggleModal = () => {
    this.isOpen = !this.isOpen;
  };
}

export const upgradePlanModalStore = new UpgradePlanModalStore();
