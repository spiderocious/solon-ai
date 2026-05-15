export type ToastVariant = 'default' | 'warn' | 'crit';

export interface ToastItem {
  id: string;
  title: string;
  subtitle?: string;
  action?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

export type ModalVariant = 'confirm' | 'crit';

export interface ModalItem {
  id: string;
  title: string;
  body: string;
  variant?: ModalVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface DrawerState {
  toasts: ToastItem[];
  modal: ModalItem | null;
}

type Listener = () => void;

export class DrawerStore {
  private state: DrawerState = { toasts: [], modal: null };
  private listeners: Set<Listener> = new Set();

  getState(): DrawerState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private setState(next: Partial<DrawerState>) {
    this.state = { ...this.state, ...next };
    this.notify();
  }

  toast(item: Omit<ToastItem, 'id'>) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast: ToastItem = { id, durationMs: 4000, ...item };
    this.setState({ toasts: [...this.state.toasts, toast] });
    if (toast.durationMs && toast.durationMs > 0) {
      setTimeout(() => this.dismissToast(id), toast.durationMs);
    }
  }

  dismissToast(id: string) {
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
  }

  showModal(item: Omit<ModalItem, 'id'>) {
    const id = `modal-${Date.now()}`;
    this.setState({ modal: { id, ...item } });
  }

  dismissModal() {
    this.setState({ modal: null });
  }
}
