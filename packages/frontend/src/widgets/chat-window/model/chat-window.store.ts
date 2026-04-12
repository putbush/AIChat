import { makeAutoObservable } from 'mobx';

type InfoBlock = {
  title: string;
  image: string;
  features: string[];
};

class ChatWindowStore {
  isOpen: boolean = false;
  infoBlocks: InfoBlock[] = [
    {
      title: 'Customizable Responses',
      image: 'customizable-responses.svg',
      features: [
        'Customizable Responses',
        'Advanced Language Understanding',
        'Seamless Integration',
        'Dynamic Scalability',
      ],
    },
    {
      title: 'Summarize text',
      image: 'summarize-text.svg',
      features: [
        'Creates seamless AI-driven conversations',
        'Tailored, dynamic responses',
        'Features NLP and real-time interaction',
        'Enhances user engagement',
      ],
    },
    {
      title: 'Create Presentation & Slide',
      image: 'create-presentation.svg',
      features: [
        'Advanced AI Technology',
        'Customizable Responses',
        'User-Centric Features',
        'Future-Ready Design',
      ],
    },
    {
      title: 'Make a Plan',
      image: 'make-plan.svg',
      features: [
        'Make a project plan',
        'Make a design plan',
        'Make a roadmap plan',
        'Make a trip plan',
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

export const chatWindowStore = new ChatWindowStore();
