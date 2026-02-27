import { makeAutoObservable } from 'mobx';

class ChatsSidebarStore {
  isOpen: boolean = false;
  selectedChatId: string | null = null;
  filter: string = '';

  constructor() {
    makeAutoObservable(this);
  }
}

export const sidebarStore = new ChatsSidebarStore();
