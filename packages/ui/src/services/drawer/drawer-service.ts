import { DrawerStore } from './drawer-store.js';
import type { ModalItem, ToastItem } from './drawer-store.js';

class DrawerServiceClass {
  private store = new DrawerStore();

  getStore(): DrawerStore {
    return this.store;
  }

  toast = (item: Omit<ToastItem, 'id'>): void => {
    this.store.toast(item);
  };

  dismissToast = (id: string): void => {
    this.store.dismissToast(id);
  };

  showModal = (item: Omit<ModalItem, 'id'>): void => {
    this.store.showModal(item);
  };

  dismissModal = (): void => {
    this.store.dismissModal();
  };

  showConfirmation = (
    title: string,
    body: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
  ): void => {
    this.store.showModal({
      title,
      body,
      variant: 'confirm',
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel,
    });
  };
}

export const DrawerService = new DrawerServiceClass();
