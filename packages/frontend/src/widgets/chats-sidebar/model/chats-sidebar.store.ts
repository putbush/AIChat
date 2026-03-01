import { makeAutoObservable } from 'mobx';

class ChatsSidebarStore {
  isOpen: boolean = true;
  selectedChatId: string | null = null;
  filter: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = () => {
    this.isOpen = !this.isOpen;
  };
}

export const sidebarStore = new ChatsSidebarStore();
